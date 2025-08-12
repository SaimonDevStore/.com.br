const express = require('express');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Middleware de validação
const validateLogin = [
  body('username').trim().isLength({ min: 3 }).withMessage('Usuário deve ter pelo menos 3 caracteres'),
  body('password').isLength({ min: 6 }).withMessage('Senha deve ter pelo menos 6 caracteres')
];

const validateRegister = [
  body('username').trim().isLength({ min: 3 }).withMessage('Usuário deve ter pelo menos 3 caracteres'),
  body('email').isEmail().normalizeEmail().withMessage('Email inválido'),
  body('password').isLength({ min: 6 }).withMessage('Senha deve ter pelo menos 6 caracteres'),
  body('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Senhas não coincidem');
    }
    return true;
  })
];

// Usuários admin hardcoded (em produção, use banco de dados)
const ADMIN_USERS = [
  {
    username: 'Saimon',
    password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/8KqKqKq', // admin123
    role: 'owner',
    email: 'admin@saimondevstore.com'
  }
];

// Login
router.post('/login', validateLogin, async (req, res) => {
  try {
    // Verificar erros de validação
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: 'Dados inválidos',
        details: errors.array()
      });
    }

    const { username, password } = req.body;

    // Buscar usuário
    const user = ADMIN_USERS.find(u => u.username === username);
    if (!user) {
      return res.status(401).json({
        error: 'Credenciais inválidas'
      });
    }

    // Verificar senha
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({
        error: 'Credenciais inválidas'
      });
    }

    // Gerar token JWT
    const token = jwt.sign(
      {
        userId: user.username,
        role: user.role,
        email: user.email
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN || '7d'
      }
    );

    // Retornar resposta
    res.json({
      success: true,
      message: 'Login realizado com sucesso',
      token,
      user: {
        username: user.username,
        role: user.role,
        email: user.email
      }
    });

  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({
      error: 'Erro interno do servidor'
    });
  }
});

// Verificar token
router.get('/verify', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({
        error: 'Token não fornecido'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    res.json({
      valid: true,
      user: decoded
    });

  } catch (error) {
    res.status(401).json({
      error: 'Token inválido'
    });
  }
});

// Logout (client-side apenas, pois JWT é stateless)
router.post('/logout', (req, res) => {
  res.json({
    success: true,
    message: 'Logout realizado com sucesso'
  });
});

// Refresh token
router.post('/refresh', async (req, res) => {
  try {
    const { token } = req.body;
    
    if (!token) {
      return res.status(400).json({
        error: 'Token não fornecido'
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Gerar novo token
    const newToken = jwt.sign(
      {
        userId: decoded.userId,
        role: decoded.role,
        email: decoded.email
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN || '7d'
      }
    );

    res.json({
      success: true,
      token: newToken
    });

  } catch (error) {
    res.status(401).json({
      error: 'Token inválido'
    });
  }
});

module.exports = router;
