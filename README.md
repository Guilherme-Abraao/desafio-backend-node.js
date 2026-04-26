# 🦾 Desafio Backend Node.js

Esta é a implementação da API de curtidas solicitada no desafio técnico. O foco foi entregar uma solução simples e funcional, que respeita as regras de **concorrência e consistência de dados** de forma escalável.

## 🛠️ Como o sistema funciona

Para atender aos requisitos obrigatórios de cache e processamento assíncrono, a API foi estruturada da seguinte forma:

- **Processamento de Likes (Assíncrono):** Quando um like é recebido, ele entra em uma fila (**BullMQ/Redis**) para não travar o banco de dados. O sistema responde imediatamente que recebeu a curtida, e o registro real acontece em segundo plano.
- **Ranking Rápido:** O Top 3 posts mais curtidos é lido diretamente do **Redis ( Sorted Set)**. Isso evita que o banco PostgreSQL precise fazer cálculos de soma e ordenação toda vez que alguém pedir o ranking, permitindo leituras com performance $O(\log(N))$.
- **Consistência:** Usei transações (um Worker que utiliza **Prisma Transactions**) no banco para garantir que, se um like for criado, o contador do post também seja atualizado. Um não acontece sem o outro.

## 🛠️ Tecnologias Utilizadas

- **Runtime:** Node.js v22 (LTS)
- **Linguagem:** TypeScript
- **Framework:** Express 5 (Nativo para erros assíncronos)
- **ORM:** Prisma
- **Banco de Dados:** PostgreSQL (Persistência) & Redis (Fila e Cache)
- **Processamento:** BullMQ
- **Validação:** Zod
- **Documentação:** Swagger (OpenAPI 3.0)

## 📦 Como Executar

O projeto está totalmente "dockerizado", facilitando o setup em qualquer ambiente.

1. **Clonar o repositório:**

   ```bash
   git clone https://github.com/Guilherme-Abraao/desafio-backend-node.js.git
   cd desafio-backend-node.js

   ```

2. **Subir os containers:**

   ```bash
   docker-compose up -d
   ```

3. **Executar as Migrations do Banco:**

   ```bash
   npx prisma migrate dev
   ```

4. **Acessar a API:**
   A aplicação estará disponível em `http://localhost:3333`.

## 📖 Documentação (Swagger)

A documentação interativa com todos os endpoints, schemas de entrada e exemplos de resposta pode ser acessada em:

👉 **[http://localhost:3333/docs](http://localhost:3333/docs)**

---

## 🏗️ Estrutura do Projeto

- `/src/infra`: Configurações de infraestrutura (Banco, Redis, Filas).
- `/src/modules`: Lógica de negócio organizada por módulos, nesse desafio o módulo único post.
- `/src/docs`: Definições da documentação Swagger.
- `/src/shared`: Middlewares globais e utilitários (ex: Error Handler).

## 🛡️ Observabilidade & Qualidade

- **Logs Claros:** O terminal exibe o ciclo de vida de cada like processado pelo Worker.
- **Tratamento de Erros:** Middleware global para captura de exceções e erros de validação (Zod).
- **Padronização:** Configurado com Prettier para garantir consistência visual em todo o código.
