const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  try {
    // Obter token do header Authorization
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (!token) {
      return res.status(401).json({
        error: 'Token de acesso não fornecido'
      });
    }

    // Verificar token
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        if (err.name === 'TokenExpiredError') {
          return res.status(401).json({
            error: 'Token expirado'
          });
        }
        return res.status(403).json({
          error: 'Token inválido'
        });
      }

      // Adicionar informações do usuário à requisição
      req.user = user;
      next();
    });

  } catch (error) {
    console.error('Erro na autenticação:', error);
    res.status(500).json({
      error: 'Erro interno do servidor'
    });
  }
};

module.exports = authenticateToken;
