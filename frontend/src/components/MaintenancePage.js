import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const MaintenancePage = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [showLogin, setShowLogin] = useState(false);
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  // Data de inauguração: 15/08/2025 às 19:00 (horário de Brasília)
  const launchDate = new Date('2025-08-15T19:00:00-03:00');

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = launchDate - now;

      if (difference <= 0) {
        // Site foi inaugurado
        clearInterval(timer);
        navigate('/site');
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, [launchDate, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (credentials.username === 'Saimon' && credentials.password === 'admin123') {
      toast.success('Login realizado com sucesso!');
      navigate('/admin/dashboard');
    } else {
      toast.error('Credenciais inválidas!');
    }
  };

  return (
    <div className="maintenance-page">
      <div className="maintenance-container">
        <div className="maintenance-content fade-in">
          <div className="maintenance-icon pulse">
            <i className="fas fa-tools"></i>
          </div>
          
          <h1 className="maintenance-title gradient-text">
            SITE EM MANUTENÇÃO
          </h1>
          
          <p className="maintenance-subtitle">
            Abertura oficial em:
          </p>
          
          <div className="countdown-container">
            <div className="countdown-item">
              <div className="countdown-number">{timeLeft.days.toString().padStart(2, '0')}</div>
              <div className="countdown-label">Dias</div>
            </div>
            <div className="countdown-separator">:</div>
            <div className="countdown-item">
              <div className="countdown-number">{timeLeft.hours.toString().padStart(2, '0')}</div>
              <div className="countdown-label">Horas</div>
            </div>
            <div className="countdown-separator">:</div>
            <div className="countdown-item">
              <div className="countdown-number">{timeLeft.minutes.toString().padStart(2, '0')}</div>
              <div className="countdown-label">Minutos</div>
            </div>
            <div className="countdown-separator">:</div>
            <div className="countdown-item">
              <div className="countdown-number">{timeLeft.seconds.toString().padStart(2, '0')}</div>
              <div className="countdown-label">Segundos</div>
            </div>
          </div>
          
          <div className="maintenance-info">
            <p>Estamos preparando algo incrível para você!</p>
            <p>Em breve, nossa plataforma estará disponível com todas as funcionalidades.</p>
          </div>
          
          <div className="admin-login-section">
            <p className="admin-text">Acesso Administrativo</p>
            <button 
              className="btn btn-secondary"
              onClick={() => setShowLogin(true)}
            >
              <i className="fas fa-user-shield"></i>
              Login Admin
            </button>
          </div>
        </div>
      </div>

      {/* Modal de Login */}
      {showLogin && (
        <div className="modal-overlay" onClick={() => setShowLogin(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3><i className="fas fa-user-shield"></i> Acesso Administrativo</h3>
              <button 
                className="modal-close"
                onClick={() => setShowLogin(false)}
              >
                &times;
              </button>
            </div>
            
            <form onSubmit={handleLogin} className="login-form">
              <input
                type="text"
                placeholder="Usuário Admin"
                value={credentials.username}
                onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                required
                className="input"
              />
              <input
                type="password"
                placeholder="Senha"
                value={credentials.password}
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                required
                className="input"
              />
              <button type="submit" className="btn btn-primary">
                Acessar
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default MaintenancePage;
