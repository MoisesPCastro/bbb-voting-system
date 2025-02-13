GloboPlay BBB Voting

📌 Sobre o Projeto

Este projeto é um sistema de votação inspirado no paredão do BBB, permitindo que usuários votem quantas vezes quiserem em um dos candidatos. O sistema foi desenvolvido utilizando Node.js, Express, Sequelize e SQLite.

🚀 Tecnologias Utilizadas

Node.js (versão recomendada: 18.20.5)

Express.js

Sequelize ORM

SQLite

ESLint para padronização do código

⚙️ Configuração do Projeto

1️⃣ Clonar o repositório

  git clone SEU_REPOSITORIO.git
  cd SEU_REPOSITORIO

2️⃣ Instalar as dependências

npm install

3️⃣ Criar o Banco de Dados e Aplicar as Migrações

npm run db:init

Isso garantirá que todas as tabelas serão criadas corretamente no SQLite.

4️⃣ Iniciar o Servidor

npm start

O servidor será iniciado e rodará na porta 3000 por padrão.

📄 Estrutura do Projeto

/
├── config/                # Configurações do banco de dados (Sequelize)
├── esm-migrations/        # Arquivos de migração do banco
├── models/                # Modelos do banco de dados
├── routes/                # Rotas da aplicação
├── controllers/           # Controladores da API
├── seeders/               # (Opcional) Dados iniciais do banco
├── .sequelizerc.cjs       # Configuração do Sequelize CLI
├── package.json           # Dependências e scripts
├── index.js               # Arquivo principal do servidor
└── README.md              # Documentação do projeto

📌 Rotas Disponíveis

Método

Rota

Descrição

POST

/api/votes

Registra um novo voto

GET

/api/stats

Obtém estatísticas da votação

📝 Observações

O sistema aceita votos ilimitados, mas bloqueia bots através de medidas de segurança.

O banco de dados SQLite é usado para persistência local.

✨ Melhorias Futuras

Implementação de um sistema de cache para otimização de consultas.

Integração com um banco de dados escalável (ex: PostgreSQL ou MySQL).

Adição de autenticação para limitar votos por usuário.

Desenvolvido por Moisés Pires

