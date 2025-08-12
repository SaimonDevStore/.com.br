# 🚀 Projeto Completo - Backend + Frontend

Este é um projeto completo com **backend Node.js** e **frontend React** configurado para deploy seguro no Render usando um **repositório único** (monorepo).

## 📁 Estrutura do Projeto

```
projeto-completo/
├── backend/                 # API Node.js + Express
│   ├── src/
│   │   └── server.js       # Servidor principal
│   ├── routes/             # Rotas da API
│   │   ├── auth.js         # Autenticação
│   │   ├── users.js        # Usuários
│   │   └── admin.js        # Admin
│   ├── middleware/         # Middlewares
│   │   ├── auth.js         # Autenticação JWT
│   │   └── admin.js        # Autorização admin
│   ├── package.json        # Dependências backend
│   └── .env.example        # Variáveis de ambiente
├── frontend/               # React App
│   ├── src/
│   │   ├── components/     # Componentes React
│   │   ├── context/        # Context API
│   │   └── App.js          # App principal
│   ├── public/             # Arquivos públicos
│   ├── package.json        # Dependências frontend
│   └── .env.example        # Variáveis de ambiente
├── README.md               # Este arquivo
└── DEPLOY_INSTRUCTIONS.md  # Guia de deploy
```

## 🔒 Segurança Implementada

### Backend
- **JWT Authentication** - Tokens seguros para login
- **Password Hashing** - Senhas criptografadas com bcrypt
- **Rate Limiting** - Proteção contra ataques DDoS
- **CORS** - Controle de acesso cross-origin
- **Helmet.js** - Headers de segurança HTTP
- **Input Validation** - Validação de dados de entrada
- **Environment Variables** - Configurações seguras

### Frontend
- **Protected Routes** - Rotas protegidas por autenticação
- **Token Management** - Gerenciamento seguro de tokens
- **Form Validation** - Validação de formulários
- **Error Handling** - Tratamento de erros robusto

## 🛠️ Tecnologias Utilizadas

### Backend
- **Node.js** + **Express.js**
- **JWT** para autenticação
- **bcryptjs** para hash de senhas
- **express-validator** para validação
- **helmet** para segurança
- **cors** para CORS
- **express-rate-limit** para rate limiting
- **morgan** para logging
- **compression** para performance

### Frontend
- **React.js** + **React Router DOM**
- **React Query** para gerenciamento de estado
- **React Hook Form** para formulários
- **React Hot Toast** para notificações
- **Framer Motion** para animações
- **Axios** para requisições HTTP

## 🚀 Como Usar

### 1. Clone o Repositório
```bash
git clone https://github.com/SEU_USUARIO/meu-projeto-completo.git
cd meu-projeto-completo
```

### 2. Configurar Backend
```bash
cd backend
npm install
cp .env.example .env
# Edite o arquivo .env com suas configurações
npm run dev
```

### 3. Configurar Frontend
```bash
cd frontend
npm install
cp .env.example .env
# Edite o arquivo .env com suas configurações
npm start
```

## 📋 Variáveis de Ambiente

### Backend (.env)
```env
NODE_ENV=development
PORT=5000
JWT_SECRET=sua_chave_secreta_aqui
JWT_EXPIRES_IN=24h
BCRYPT_ROUNDS=12
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
CORS_ORIGIN=http://localhost:3000
LOG_LEVEL=info
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000
REACT_APP_ENVIRONMENT=development
```

## 🔐 Credenciais de Teste

Para testar o sistema de admin:
- **Usuário**: `Saimon`
- **Senha**: `admin123`

## 🌐 Deploy no Render

Este projeto está configurado para deploy automático no Render usando um **repositório único**:

1. **Backend**: Web Service Node.js
2. **Frontend**: Static Site React

Veja o guia completo em: [DEPLOY_INSTRUCTIONS.md](./DEPLOY_INSTRUCTIONS.md)

## 📊 Endpoints da API

### Autenticação
- `POST /api/auth/login` - Login de usuário
- `POST /api/auth/logout` - Logout
- `GET /api/auth/verify` - Verificar token

### Usuários
- `GET /api/users/profile` - Perfil do usuário (protegido)
- `PUT /api/users/profile` - Atualizar perfil (protegido)
- `GET /api/users/:username` - Perfil público

### Admin
- `GET /api/admin/dashboard` - Dashboard admin (protegido)
- `GET /api/admin/users` - Listar usuários (protegido)
- `PUT /api/admin/settings` - Configurações (protegido)
- `GET /api/admin/logs` - Logs do sistema (protegido)

### Health Check
- `GET /api/health` - Status da API

## 🔄 Scripts Disponíveis

### Backend
```bash
npm run dev      # Desenvolvimento com nodemon
npm start        # Produção
npm test         # Testes
```

### Frontend
```bash
npm start        # Desenvolvimento
npm run build    # Build para produção
npm test         # Testes
npm run eject    # Ejetar configurações (irreversível)
```

## 🛡️ Segurança

- ✅ **JWT Tokens** - Autenticação segura
- ✅ **Password Hashing** - Senhas criptografadas
- ✅ **Rate Limiting** - Proteção contra spam
- ✅ **CORS** - Controle de acesso
- ✅ **Input Validation** - Validação de dados
- ✅ **Environment Variables** - Configurações seguras
- ✅ **HTTPS** - Conexões criptografadas
- ✅ **Security Headers** - Headers de proteção

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📞 Suporte

Se você encontrar algum problema ou tiver dúvidas:

1. Verifique a documentação
2. Consulte os logs
3. Teste localmente primeiro
4. Abra uma issue no GitHub

---

**Desenvolvido com ❤️ para deploy seguro no Render**
