# Guia de Deploy no Render - Repositório Único (Monorepo)

Este guia mostra como fazer deploy do seu projeto backend/frontend no Render usando um **repositório único** no GitHub.

## 📋 Pré-requisitos

- Conta no [GitHub](https://github.com)
- Conta no [Render](https://render.com)
- Git instalado no seu computador

## 🚀 Passo a Passo

### 1. Criar Repositório Único no GitHub

1. Acesse [GitHub.com](https://github.com) e faça login
2. Clique em **"New repository"** (botão verde)
3. Configure o repositório:
   - **Repository name**: `meu-projeto-completo` (ou o nome que preferir)
   - **Description**: `Projeto completo com backend e frontend`
   - **Visibility**: Escolha entre Public ou Private
   - **NÃO** marque "Add a README file" (já temos um)
   - Clique em **"Create repository"**

### 2. Fazer Upload dos Arquivos para o GitHub

No seu terminal, execute os comandos:

```bash
# Inicializar Git no projeto (se ainda não foi feito)
git init

# Adicionar o repositório remoto do GitHub
git remote add origin https://github.com/SEU_USUARIO/meu-projeto-completo.git

# Adicionar todos os arquivos
git add .

# Fazer o primeiro commit
git commit -m "Configuração inicial do projeto completo"

# Enviar para o GitHub
git push -u origin main
```

**Substitua `SEU_USUARIO` pelo seu nome de usuário do GitHub.**

### 3. Configurar Backend no Render

**Opção A: Deploy Manual (Recomendado para iniciantes)**

1. Acesse [Render.com](https://render.com) e faça login
2. Clique em **"New +"** → **"Web Service"**
3. Conecte com GitHub e selecione seu repositório `meu-projeto-completo`
4. Configure o serviço:
   - **Name**: `meu-backend` (ou o nome que preferir)
   - **Environment**: `Node`
   - **Build Command**: `cd backend && npm install`
   - **Start Command**: `cd backend && npm start`
   - **Root Directory**: Deixe vazio (vai usar a raiz do repositório)

**Opção B: Deploy Automático com render.yaml**

1. Acesse [Render.com](https://render.com) e faça login
2. Clique em **"New +"** → **"Blueprint"**
3. Conecte com GitHub e selecione seu repositório `meu-projeto-completo`
4. O Render detectará automaticamente o arquivo `render.yaml` na raiz
5. Clique em **"Apply"** para criar ambos os serviços automaticamente

5. **Configurar Variáveis de Ambiente**:
   - Clique em **"Environment"** na aba lateral
   - Adicione as seguintes variáveis:
     ```
     NODE_ENV=production
     PORT=10000
     JWT_SECRET=sua_chave_secreta_muito_segura_aqui
     JWT_EXPIRES_IN=24h
     BCRYPT_ROUNDS=12
     RATE_LIMIT_WINDOW_MS=900000
     RATE_LIMIT_MAX_REQUESTS=100
     CORS_ORIGIN=https://seu-frontend.onrender.com
     LOG_LEVEL=info
     ```

6. Clique em **"Create Web Service"**

### 4. Configurar Frontend no Render

**Se você escolheu a Opção A (Deploy Manual):**

1. Ainda no Render, clique em **"New +"** → **"Static Site"**
2. Conecte com GitHub e selecione o **mesmo repositório** `meu-projeto-completo`
3. Configure o serviço:
   - **Name**: `meu-frontend` (ou o nome que preferir)
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Publish Directory**: `frontend/build`
   - **Root Directory**: Deixe vazio

**Se você escolheu a Opção B (Deploy Automático):**
- O frontend já foi criado automaticamente junto com o backend!

4. **Configurar Variáveis de Ambiente**:
   - Clique em **"Environment"** na aba lateral
   - Adicione:
     ```
     REACT_APP_API_URL=https://meu-backend.onrender.com
     ```

5. Clique em **"Create Static Site"**

### 5. Atualizar URLs

Após criar os dois serviços, você precisa atualizar as URLs:

1. **No Backend**: Vá para as configurações do backend e atualize:
   ```
   CORS_ORIGIN=https://meu-frontend.onrender.com
   ```

2. **No Frontend**: Vá para as configurações do frontend e atualize:
   ```
   REACT_APP_API_URL=https://meu-backend.onrender.com
   ```

### 6. Testar o Deploy

1. **Backend**: Acesse `https://meu-backend.onrender.com/api/health`
   - Deve retornar: `{"status":"ok","timestamp":"..."}`

2. **Frontend**: Acesse `https://meu-frontend.onrender.com`
   - Deve mostrar a página de manutenção

3. **Admin Login**: Acesse `https://meu-frontend.onrender.com/admin/login`
   - Use as credenciais: `Saimon` / `admin123`

## 🔄 Atualizações Futuras

Para atualizar o projeto:

```bash
# Fazer suas alterações nos arquivos
# Depois:

git add .
git commit -m "Descrição das alterações"
git push origin main
```

O Render vai detectar automaticamente as mudanças e fazer o redeploy.

## 🛠️ Estrutura do Repositório

Seu repositório único terá esta estrutura:

```
meu-projeto-completo/
├── backend/
│   ├── src/
│   ├── routes/
│   ├── middleware/
│   ├── package.json
│   └── ...
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
├── README.md
├── DEPLOY_INSTRUCTIONS.md
└── render.yaml
```

## ✅ Vantagens do Repositório Único

- **🎯 Simplicidade**: Um só repositório para gerenciar
- **🔄 Sincronização**: Mudanças no backend e frontend ficam sincronizadas
- **🚀 Deploy Fácil**: Pode usar Blueprint para deploy automático
- **📝 Versionamento**: Histórico unificado de mudanças
- **🔧 Manutenção**: Mais fácil de manter e atualizar
- **👥 Colaboração**: Equipe trabalha em um só lugar

## ⚠️ Importante

- **Segurança**: Nunca commite arquivos `.env` no GitHub
- **URLs**: Sempre use HTTPS nas URLs de produção
- **Variáveis**: Mantenha as variáveis de ambiente seguras no Render
- **Logs**: Monitore os logs no Render para detectar problemas

## 🆘 Solução de Problemas

### Backend não inicia
- Verifique se o `package.json` está na pasta `backend/`
- Confirme se o comando de build está correto
- Verifique os logs no Render

### Frontend não carrega
- Confirme se o `REACT_APP_API_URL` está correto
- Verifique se o build foi gerado corretamente
- Teste localmente primeiro

### Erro de CORS
- Verifique se o `CORS_ORIGIN` no backend está apontando para a URL correta do frontend
- Certifique-se de que está usando HTTPS

### Problemas de Autenticação
- Verifique se o `JWT_SECRET` está configurado
- Confirme se as credenciais de admin estão corretas

## 📞 Suporte

Se encontrar problemas:
1. Verifique os logs no Render
2. Teste localmente primeiro
3. Confirme se todas as variáveis de ambiente estão configuradas
4. Verifique se as URLs estão corretas

---

**🎉 Parabéns!** Seu projeto está agora deployado com segurança no Render usando um repositório único!
