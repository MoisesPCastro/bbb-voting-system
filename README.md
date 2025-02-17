# GloboPlay BBB Voting

## Sobre o Projeto

Este projeto é um sistema de votação inspirado no paredão do BBB, permitindo que usuários votem quantas vezes quiserem em seus candidatos preferidos. Para garantir escalabilidade e evitar manipulação por bots, a API utiliza Redis para caching, filas de processamento com BullMQ e validação com reCAPTCHA. Desenvolvido utilizando Node.js, Express, Sequelize e Redis para caching e enfileiramento de votos.

## Tecnologias Utilizadas

- **Node.js** (versão recomendada: 18.20.5)
- **Express.js**
- **Sequelize ORM**
- **SQLite** (banco de dados local)
- **Redis** (cache e fila de votos)
- **BullMQ** (processamento de filas)
- **Artillery** (teste de carga nas APIs)
- **Docker** (para ambiente isolado)
- **ESLint** (padronização do código)
- **Winston** (biblioteca de logging utilizada para registrar erros e eventos do sistema)

## Configuração do Projeto

### Clonar o Repositório

```sh
git clone https://github.com/MoisesPCastro/bbb-voting-system.git
cd bbb-voting-system
```

### Instalar as Dependências

```sh
npm install
```

### Configuração do Banco de Dados

Criar o banco de dados e aplicar as migrações:

```sh
npm run db:init
```

Isso garantirá que todas as tabelas sejam criadas corretamente no SQLite.

### Inicializando o Redis

Para evitar erros, certifique-se de que o Redis está instalado e em execução.

#### Instalar o Redis (Caso ainda não tenha)

```sh
sudo apt update && sudo apt install redis -y
```

#### Iniciar o Redis

```sh
sudo systemctl start redis
```

(Opcional) Caso queira que o Redis sempre inicie com o sistema:

```sh
sudo systemctl enable redis
```

#### Para verificar se o Redis está rodando:

```sh
redis-cli ping
```

Se a resposta for **PONG**, o Redis está funcionando corretamente.

## Rodando o Projeto

O servidor pode ser iniciado de duas formas: **localmente** ou via **Docker**.

### Iniciar o Servidor

#### Modo Produção

```sh
npm start
```

#### Modo Desenvolvimento (com nodemon)

```sh
npm run dev
```

O servidor será iniciado e rodará na porta **3333** por padrão.

### Rodando com Docker (processo não finalizado)

#### Construir e Subir os Containers

```sh
docker-compose up --build -d
```

#### Para parar os containers:

```sh
docker-compose down
```

## Estrutura do Projeto

```
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
```

## API Endpoints

### Cadastrar um Candidato para a Lista de Votação

```http
POST /api/candidates
```

#### Exemplo de Request Body:

```json
{
  "candidate": "Fulano"
}
```

### Obter Lista de Candidatos

```http
GET /api/candidates
```

#### Exemplo de Response:

```json
{
  "totalCandidates": 2,
  "candidates": [
    { "id": 1, "candidate": "Maria" },
    { "id": 2, "candidate": "Moises" }
  ]
}
```

### Gerar um Token Fictício reCAPTCHA (simulação do front-end)

```http
GET /api/generate-recaptcha
```

#### Exemplo de Response:

```json
{
  "recaptchaToken": "fake-token-1739729688505"
}
```

### Registrar um Voto

```http
POST /api/votes
```

#### Exemplo de Request Body:

```json
{
  "candidate": "Fulano",
  "recaptchaToken": "fake-token-1708012345678"
}
```

### Obter Estatísticas da Votação

```http
GET /api/stats
```

#### Exemplo de Response:

```json
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
```

## Teste de Estresse com Artillery

O projeto inclui testes de estresse para garantir que a API suporte alta concorrência de requisições, simulando **1000 requisições por segundo**.

### Rodando o Teste de Estresse

```sh
artillery run load-test.yml
```

Isso simulará um alto volume de acessos às rotas críticas e verificará a estabilidade do sistema.

### Teste focado na rota de estatísticas

```sh
artillery run stats-test.yml
```

## Observações

- O sistema aceita votos ilimitados, mas bloqueia bots através de medidas de segurança (reCAPTCHA).
- O Redis é usado para cache e enfileiramento, melhorando a performance.
- BullMQ é utilizado para processar votos em background, garantindo que a API continue respondendo rapidamente.

## Melhorias Futuras

- Integração com PostgreSQL ou MySQL para um ambiente de produção mais robusto.
- Implementação de um sistema de autenticação de token para acesso às rotas.
- Testes de integração e teste unitários com Jest.

## Desenvolvido por

Moisés Pires .