import React from 'react';
import { motion } from 'framer-motion';

const MainSite = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="main-site"
    >
      <div className="main-site-container">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="main-site-content"
        >
          <h1>🚀 Site Principal</h1>
          <p>Bem-vindo ao site principal! Esta é a página que será exibida quando o site estiver ativo.</p>
          
          <div className="features">
            <div className="feature">
              <h3>✨ Funcionalidades</h3>
              <ul>
                <li>Interface moderna e responsiva</li>
                <li>Animações suaves com Framer Motion</li>
                <li>Design limpo e profissional</li>
                <li>Otimizado para performance</li>
              </ul>
            </div>
            
            <div className="feature">
              <h3>🔧 Tecnologias</h3>
              <ul>
                <li>React.js</li>
                <li>Tailwind CSS</li>
                <li>Framer Motion</li>
                <li>React Router</li>
              </ul>
            </div>
          </div>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="cta-button"
          >
            Começar Agora
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MainSite;
