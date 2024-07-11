# TravelPlanner API

Backend do TravelPlanner, uma aplicação de gerenciamento de viagens.

## Ferramentas

- NodeJs
- Fastify
- Prisma
- Zod
- Typescript
- Dayjs
- Nodemailer

## Aprendizados importantes

- Criação de uma REST API utilizando Node e Fastify
- Conexão com envio de emails utilizando Nodemailer
- Conexão com banco de dados utilizando Prisma
- Validações utilizando Zod

## Como usar

### Pré-requisitos

- Node.js
- npm

### Instalação

1. Clone o repositório:

```bash
git clone https://github.com/Potatoyz908/TravelPlanner.git
cd TravelPlanner
```

2. Instale as dependências:

```bash
npm install
```

3. Inicie a aplicação:

```bash
npm run dev 
```

A API estará disponível em http://localhost:3333.

#### Comandos

```bash
# Abre uma aba para manipular o banco de dados em http://localhost:5555
npx prisma studio
```

```bash
# Preenche o banco com dados fictícios
npx prisma db seed
```

```bash
# Apaga o banco atual e refaz o seed
npx prisma migrate reset
```
