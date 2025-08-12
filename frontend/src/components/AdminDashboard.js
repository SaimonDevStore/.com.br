import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/admin/login');
      toast.error('Você precisa estar logado para acessar o dashboard');
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
    toast.success('Logout realizado com sucesso!');
  };

  const handleGoToSite = () => {
    navigate('/site');
  };

  const handleGoToMaintenance = () => {
    navigate('/');
  };

  if (!user) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="admin-dashboard"
    >
      <div className="admin-dashboard-container">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="admin-dashboard-content"
        >
          <header className="dashboard-header">
            <h1>🎛️ Painel Administrativo</h1>
            <div className="user-info">
              <span>Bem-vindo, <strong>{user.username}</strong>!</span>
              <button onClick={handleLogout} className="logout-button">
                Sair
              </button>
            </div>
          </header>
          
          <div className="dashboard-stats">
            <div className="stat-card">
              <h3>📊 Estatísticas</h3>
              <div className="stat-item">
                <span>Usuários Online:</span>
                <strong>1</strong>
              </div>
              <div className="stat-item">
                <span>Visitas Hoje:</span>
                <strong>42</strong>
              </div>
              <div className="stat-item">
                <span>Status do Site:</span>
                <strong className="status-maintenance">Manutenção</strong>
              </div>
            </div>
          </div>
          
          <div className="dashboard-actions">
            <h3>🚀 Ações Rápidas</h3>
            <div className="action-buttons">
              <motion.button
                onClick={handleGoToSite}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="action-button primary"
              >
                🌐 Ver Site Principal
              </motion.button>
              
              <motion.button
                onClick={handleGoToMaintenance}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="action-button secondary"
              >
                🔧 Página de Manutenção
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="action-button warning"
              >
                ⚙️ Configurações
              </motion.button>
            </div>
          </div>
          
          <div className="dashboard-info">
            <h3>ℹ️ Informações do Sistema</h3>
            <div className="info-grid">
              <div className="info-item">
                <strong>Versão:</strong> 1.0.0
              </div>
              <div className="info-item">
                <strong>Ambiente:</strong> Produção
              </div>
              <div className="info-item">
                <strong>Última Atualização:</strong> Hoje
              </div>
              <div className="info-item">
                <strong>Status:</strong> Online
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AdminDashboard;
