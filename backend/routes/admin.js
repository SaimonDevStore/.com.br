const express = require('express');
const router = express.Router();

// Middleware de autenticação e autorização
const authenticateToken = require('../middleware/auth');
const requireAdmin = require('../middleware/admin');

// Aplicar middleware de autenticação em todas as rotas
router.use(authenticateToken);
router.use(requireAdmin);

// Dashboard administrativo
router.get('/dashboard', (req, res) => {
  try {
    res.json({
      success: true,
      message: 'Dashboard administrativo',
      data: {
        totalUsers: 1,
        totalProjects: 0,
        systemStatus: 'online',
        lastLogin: new Date().toISOString()
      }
    });
  } catch (error) {
    res.status(500).json({
      error: 'Erro interno do servidor'
    });
  }
});

// Gerenciar usuários
router.get('/users', (req, res) => {
  try {
    res.json({
      success: true,
      users: [
        {
          username: 'Saimon',
          role: 'owner',
          email: 'admin@saimondevstore.com',
          createdAt: new Date().toISOString()
        }
      ]
    });
  } catch (error) {
    res.status(500).json({
      error: 'Erro interno do servidor'
    });
  }
});

// Configurações do sistema
router.get('/settings', (req, res) => {
  try {
    res.json({
      success: true,
      settings: {
        maintenanceMode: false,
        allowRegistrations: false,
        maxFileSize: '5MB',
        allowedFileTypes: ['jpg', 'png', 'gif', 'pdf'],
        emailNotifications: true
      }
    });
  } catch (error) {
    res.status(500).json({
      error: 'Erro interno do servidor'
    });
  }
});

// Atualizar configurações
router.put('/settings', (req, res) => {
  try {
    const { maintenanceMode, allowRegistrations, emailNotifications } = req.body;
    
    // Aqui você pode salvar as configurações no banco de dados
    
    res.json({
      success: true,
      message: 'Configurações atualizadas com sucesso',
      settings: {
        maintenanceMode: maintenanceMode || false,
        allowRegistrations: allowRegistrations || false,
        emailNotifications: emailNotifications || true
      }
    });
  } catch (error) {
    res.status(500).json({
      error: 'Erro interno do servidor'
    });
  }
});

// Logs do sistema
router.get('/logs', (req, res) => {
  try {
    res.json({
      success: true,
      logs: [
        {
          timestamp: new Date().toISOString(),
          level: 'info',
          message: 'Sistema iniciado',
          user: 'Saimon'
        }
      ]
    });
  } catch (error) {
    res.status(500).json({
      error: 'Erro interno do servidor'
    });
  }
});

// Backup do sistema
router.post('/backup', (req, res) => {
  try {
    // Aqui você pode implementar lógica de backup
    
    res.json({
      success: true,
      message: 'Backup iniciado com sucesso',
      backupId: 'backup_' + Date.now()
    });
  } catch (error) {
    res.status(500).json({
      error: 'Erro interno do servidor'
    });
  }
});

module.exports = router;
