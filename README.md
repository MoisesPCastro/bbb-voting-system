GloboPlay BBB Voting

Sobre o Projeto
 "Este projeto é um sistema de votação inspirado no paredão do BBB, permitindo que usuários votem quantas vezes quiserem em seus candidatos preferidos. Para garantir escalabilidade e evitar manipulação por bots, a API utiliza Redis para caching, filas de processamento com BullMQ e validação com reCAPTCHA."envolvido utilizando Node.js, Express, Sequelize e Redis para caching e enfileiramento de votos.

Tecnologias Utilizadas
  Node.js (versão recomendada: 18.20.5)
  Express.js
  Sequelize ORM
  SQLite (banco de dados local)
  Redis (cache e fila de votos)
  BullMQ (processamento de filas)
  Artillery (teste de carga nas apis)
  Docker (para ambiente isolado)
  ESLint (padronização do código)
  Winston: Biblioteca de logging utilizada para registrar erros e eventos do sistema

Configuração do Projeto
  Clonar o Repositório
  sh
  Copiar
  Editar
  git clone https://github.com/MoisesPCastro/bbb-voting-system.git
  cd bbb-voting-system

Instalar as Dependências
  npm install

Configuração do Banco de Dados
  Criar o Banco de Dados e Aplicar as Migrações
    npm run db:init
    Isso garantirá que todas as tabelas serão criadas corretamente no SQLite.

Inicializando o Redis
  Para evitar erros, certifique-se de que o Redis está instalado e em execução.
  Instalar o Redis (Caso ainda não tenha)
    sudo apt update && sudo apt install redis -y

Iniciar o Redis
  sudo systemctl start redis
  (Opcional) Caso queira que o Redis sempre inicie com o sistema:
    sudo systemctl enable redis

Para verificar se o Redis está rodando:
  redis-cli ping
  Se a resposta for PONG, o Redis está funcionando corretamente.

Rodando o Projeto
  O servidor pode ser iniciado de duas formas: Localmente ou via Docker.

  Iniciar o Servidor
    Modo Produção
      npm start
    Modo Desenvolvimento (com nodemon)
      npm run dev
      O servidor será iniciado e rodará na porta 3333 por padrão.

Rodando com Docker (processo não finalizado)
  Construir e Subir os Containers
    docker-compose up --build -d
  Para parar os containers:
    docker-compose down

Estrutura do Projeto

📁 bbb-voting-system
├── 📂 src
│   ├── 📂 controllers        # Controladores das rotas
│   ├── 📂 models             # Modelos Sequelize
│   ├── 📂 repositories       # Repositórios para acesso a dados
│   ├── 📂 services           # Camada de serviços e regras de negócio
│   ├── 📂 utils              # Utilitários como logger e conexão com Redis
│   ├── 📜 index.js           # Ponto de entrada do servidor
│   ├── 📜 routes.js          # Definição das rotas
├── 📜 package.json           # Configuração do projeto
├── 📜 docker-compose.yml     # Configuração do Docker
├── 📜 Dockerfile             # Arquivo para criação da imagem Docker
├── 📜 .env                   # Configuração de variáveis de ambiente
└── 📜 README.md              # Documentação do projeto

API Endpoints
  Cadastrar um Candidato para a lista de votação
    POST /api/candidates
    {
      "candidate": "Fulano"
    }

  Obter lista de candidatos
  GET /api/candidates'
    response:
      {
      "totalCandidates": 2,
      "candidates": [
          {
              "id": 1,
              "candidate": "Maria"
          },
          {
              "id": 2,
              "candidate": "Moises"
          }
        ]
      }

  Gerar um token fictício reCAPTCHA (simulação do front-end)
    GET api/generate-recaptcha
    response:
      {
        "recaptchaToken": "fake-token-1739729688505"
      }

  Registrar um Voto
    POST /api/votes
      {
        "candidate": "Fulano",
        "recaptchaToken": "fake-token-1708012345678"  //token gerado na rota acima
      }

  Obter Estatísticas da Votação
    GET /api/stats

      response
      {
        "totalVotes": 10000,
        "votesByCandidate": [
          { "candidate": "Fulano", "totalVotes": 6000 },
          { "candidate": "Beltrano", "totalVotes": 4000 }
        ],
        "votesByHour": [
          { "hour": "2025-02-16 14:00:00", "totalVotes": 5000 },
          { "hour": "2025-02-16 15:00:00", "totalVotes": 1000 }
        ]
      }

Teste de Estresse com Artillery
  O projeto inclui testes de estresse para garantir que a API suporte alta concorrência de requisições, simulando 1000 requisições por segundo.
  Rodando o Teste de Estresse
    Para testar a performance da API, com o projeto rodando, no terminal utilize o seguinte comando:
      artillery run load-test.yml
      Isso simulará um alto volume de acessos às rotas críticas e verificará a estabilidade do sistema.

    Se quiser um teste focado apenas na rota de estatísticas:
      artillery run stats-test.yml

Observações
  O sistema aceita votos ilimitados, mas bloqueia bots através de medidas de segurança (reCAPTCHA).
  O Redis é usado para cache e enfileiramento, melhorando a performance.
  BullMQ é utilizado para processar votos em background, garantindo que a API continue respondendo rapidamente.

Melhorias Futuras
  Integração com PostgreSQL ou MySQL para um ambiente de produção mais robusto.
  Implementação de um sistema de autenticação de token para acesso as rotas.

Desenvolvido por Moisés Pires.