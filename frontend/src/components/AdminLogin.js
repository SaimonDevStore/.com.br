import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Para demonstração, vamos usar as credenciais hardcoded
      if (credentials.username === 'Saimon' && credentials.password === 'admin123') {
        await login(credentials.username, credentials.password);
        toast.success('Login realizado com sucesso!');
        navigate('/admin/dashboard');
      } else {
        toast.error('Credenciais inválidas!');
      }
    } catch (error) {
      toast.error('Erro ao fazer login: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="admin-login"
    >
      <div className="admin-login-container">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="admin-login-content"
        >
          <h1>🔐 Login Administrativo</h1>
          <p>Faça login para acessar o painel administrativo</p>
          
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="username">Usuário</label>
              <input
                type="text"
                id="username"
                name="username"
                value={credentials.username}
                onChange={handleChange}
                required
                placeholder="Digite seu usuário"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Senha</label>
              <input
                type="password"
                id="password"
                name="password"
                value={credentials.password}
                onChange={handleChange}
                required
                placeholder="Digite sua senha"
              />
            </div>
            
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="login-button"
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </motion.button>
          </form>
          
          <div className="login-info">
            <p><strong>Credenciais de teste:</strong></p>
            <p>Usuário: <code>Saimon</code></p>
            <p>Senha: <code>admin123</code></p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AdminLogin;
