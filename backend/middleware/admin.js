const requireAdmin = (req, res, next) => {
  try {
    // Verificar se o usuário está autenticado
    if (!req.user) {
      return res.status(401).json({
        error: 'Usuário não autenticado'
      });
    }

    // Verificar se o usuário tem role de admin
    const allowedRoles = ['admin', 'owner', 'moderator'];
    
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        error: 'Acesso negado. Apenas administradores podem acessar este recurso.'
      });
    }

    next();

  } catch (error) {
    console.error('Erro na autorização:', error);
    res.status(500).json({
      error: 'Erro interno do servidor'
    });
  }
};

module.exports = requireAdmin;
