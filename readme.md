# Barbells

Plataforma de registo de treinos. O utilizador pode subscrever a plataforma e
poderá registar os treinos efetuados na mesma.

## Requisitos funcionais

- [] Deve ser possível o utilizador registar-se;
- [] Deve ser possível o utilizador autenticar-se;
- [] Deve ser possível o utilizador obter o seu perfil;
- [] Deve ser possível o utilizador terminar sessão;
- [] Deve ser possível o utilizador eliminar a sua conta;

- [] Deve ser possível o utilizador criar, visualizar, editar e eliminar
  pesagens e medições de gordura corporal;
- [] Deve ser possível o utilizador obter o seu histórico de pesagens e medições
  de gordura corporal;
- [] Deve ser possível o utilizador eliminar o seu histórico de pesagens e
  medições de gordura corporal;

- [] Deve ser possível o utilizador criar, visualizar, editar e eliminar um
  treino;
- [] Deve ser possível o utilizador criar, visualizar, editar e eliminar
  templates de treino;
- [] Deve ser possível o utilizador obter templates de treino predefinidas na
  aplicação;

- [] Deve ser possível o utilizador obter o número total de treinos realizados;
- [] Deve ser possível o utilizador obter o seu histórico de treinos;
- [] Deve ser possível o utilizador filtrar o seu histórico de treinos por data;
- [] Deve ser possível o utilizador eliminar o seu histórico de treinos;

- [] Deve ser possível o utilizador obter o volume de cada treino;
- [] Deve ser possível o utilizador obter o volume de treino semanal total e por
  grupo muscular e obter um histórico dos mesmos;
- [] Deve ser possível o utilizador obter a sobrecarga semanal total e por grupo
  muscular e obter um histórico das mesmas;

- [] Deve ser possível o utilizador criar, visualizar, editar e eliminar
  exercícios;
- [] Deve ser possível o utilizador obter exercícios predefinidos na aplicação;
- [] Deve ser possível o utilizador procurar exercícios pelo nome;
- [] Deve ser possível o utilizador filtrar exercícios por grupo muscular;

## Regras de negócio

- [] O utilizador não deve poder registar-se com um e-mail duplicado;
- [] O utilizador não deve poder criar um exercício duplicado;
- [] O utilizador não deve poder editar ou eliminar exercícios ou templates
  predefinidos da aplicação;
- [] O utilizador não deve poder visualizar dados de outros utilizadores;

## Requisitos não funcionais

- [] A password do utilizador precisa de estar criptografada;
- [] Os dados da aplicação precisam estar persistidos numa base de dados;
- [] O utilizador deve ser identificado por um JWT (JSON Web Token);

## .env

`NODE_ENV`

`PORT`

`JWT_SECRET`

`DATABASE_URL`

## CLI

- npm i

- docker compose up -d

- npx prisma migrate dev

- npm run start:dev

## Stack

Node, Fastify, Prisma, Vistest, Supertest, Docker
