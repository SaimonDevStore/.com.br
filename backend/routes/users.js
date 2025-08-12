const express = require('express');
const router = express.Router();

// Middleware de autenticação
const authenticateToken = require('../middleware/auth');

// Rota protegida - perfil do usuário
router.get('/profile', authenticateToken, (req, res) => {
  try {
    res.json({
      success: true,
      user: {
        username: req.user.userId,
        role: req.user.role,
        email: req.user.email
      }
    });
  } catch (error) {
    res.status(500).json({
      error: 'Erro interno do servidor'
    });
  }
});

// Atualizar perfil do usuário
router.put('/profile', authenticateToken, (req, res) => {
  try {
    const { email } = req.body;
    
    // Aqui você pode adicionar lógica para atualizar o perfil
    // Por enquanto, apenas retorna sucesso
    
    res.json({
      success: true,
      message: 'Perfil atualizado com sucesso',
      user: {
        username: req.user.userId,
        role: req.user.role,
        email: email || req.user.email
      }
    });
  } catch (error) {
    res.status(500).json({
      error: 'Erro interno do servidor'
    });
  }
});

// Rota para obter informações públicas do usuário
router.get('/:username', (req, res) => {
  try {
    const { username } = req.params;
    
    // Aqui você pode buscar informações públicas do usuário
    // Por enquanto, retorna informações básicas
    
    res.json({
      success: true,
      user: {
        username: username,
        role: 'user',
        isPublic: true
      }
    });
  } catch (error) {
    res.status(500).json({
      error: 'Erro interno do servidor'
    });
  }
});

module.exports = router;
