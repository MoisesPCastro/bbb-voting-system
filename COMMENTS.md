# Comentários e Decisões do Projeto

## Por que escolhi usar Redis?
**Motivo:** Como o sistema precisa suportar um alto volume de votos (**1000 votos/segundo**), utilizamos Redis para:

- **Fila de Votos:** Utilizamos BullMQ para enfileirar os votos, garantindo que a API continue responsiva e o processamento ocorra em segundo plano.
- **Cache de Estatísticas:** Armazenamos os resultados das estatísticas temporariamente no Redis para reduzir a carga no banco de dados.

## Validação de Bots com reCAPTCHA v3
**Motivo:** Como os usuários podem votar quantas vezes quiserem, mas precisamos evitar bots, adicionamos a validação com **reCAPTCHA v3** antes de registrar um voto.

- Se o token do reCAPTCHA for inválido, o voto é recusado.
- Para testes locais, implementamos um **fake token (`fake-token-`)** para simular validações sem precisar integrar o front-end.

## Testes de Carga e Estresse com Artillery
**Motivo:** O sistema precisa lidar com grande volume de acessos simultâneos.

- Utilizei **Artillery** para simular **1000 requisições/segundo** na API de votação e estatísticas.

## Winston (Logging de Erros)

- O projeto utiliza a biblioteca **Winston** para capturar e armazenar logs de erros.
- Implementado em todos os **controllers** para registrar exceções automaticamente.
- Os logs são armazenados no arquivo **logs/error.log**.
- Quando o arquivo atinge **5MB**, apenas os **3 arquivos mais recentes** são mantidos, garantindo um histórico sem sobrecarregar o armazenamento.

## Sequelize e Gerenciamento de Transações

- O banco de dados é manipulado usando o **Sequelize ORM**, garantindo segurança e consistência nos dados.
- Cada operação de voto é executada dentro de uma **transaction**.
- **Commit** é realizado para confirmar alterações quando tudo ocorre corretamente.
- **Rollback** é acionado automaticamente caso haja erro, evitando dados corrompidos ou inconsistentes.

## Fluxo da Rota de Votação (`/api/votes`)

Para garantir alta escalabilidade, os votos são processados de forma assíncrona usando Redis e BullMQ:

1. O cliente envia um voto via **POST /api/votes**.
2. O voto é adicionado a uma fila no **Redis (BullMQ)**.
3. Um **worker** processa a fila e salva o voto no banco.
4. Esse fluxo permite suportar milhares de requisições por segundo, evitando sobrecarga no banco de dados.

## Fluxo da Rota de Estatísticas (`/api/stats`)

Para otimizar a performance, as estatísticas de votos são armazenadas no cache do **Redis**:

- **Cache com TTL de 10 segundos:**
  - Durante esse período, os dados são servidos do **Redis** sem consultar o banco.
  - Após **10 segundos**, uma nova consulta ao banco é feita e os dados são atualizados no cache.
- **Cache é invalidado automaticamente quando um novo voto é registrado**, garantindo estatísticas sempre atualizadas.
- Esse mecanismo **reduz drasticamente** o número de queries no banco e melhora a velocidade de resposta da API.

## Melhorias Futuras

- Migrar o banco de dados para **PostgreSQL** para maior escalabilidade.
- Implementar **autenticação JWT** para rotas administrativas.
- Rodar o projeto também pelo **Docker**.
- Testes de integração e teste unitários com Jest.
