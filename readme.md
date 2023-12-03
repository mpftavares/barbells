# Barbells

Plataforma de registo de treinos e métricas pessoais: o utilizador pode subscrever a plataforma e registar os treinos efetuados e métricas pessoais na mesma.

## Requisitos funcionais

- [x] Deve ser possível o utilizador registar-se;
- [x] Deve ser possível o utilizador autenticar-se;
- [x] Deve ser possível o utilizador obter o seu perfil;
- [x] Deve ser possível o utilizador terminar sessão;
- [x] Deve ser possível o utilizador eliminar a sua conta;

- [x] Deve ser possível o utilizador criar, visualizar, editar e eliminar pesagens e medições de gordura corporal;
- [x] Deve ser possível o utilizador obter o seu histórico de pesagens e medições de gordura corporal;
- [x] Deve ser possível o utilizador eliminar o seu histórico de pesagens e medições de gordura corporal;

- [x] Deve ser possível o utilizador criar, visualizar, editar e eliminar um treino;
- [x] Deve ser possível o utilizador criar, visualizar, editar e eliminar templates de treino;
- [x] Deve ser possível o utilizador obter templates de treino predefinidas na aplicação;

- [x] Deve ser possível o utilizador obter o número total de treinos realizados;
- [x] Deve ser possível o utilizador obter os treinos registados por intervalo de datas;
- [x] Deve ser possível o utilizador obter o seu histórico de treinos;
- [x] Deve ser possível o utilizador eliminar o seu histórico de treinos;

- [x] Deve ser possível o utilizador obter o volume de cada treino;
- [x] Deve ser possível o utilizador obter o volume de treino por intervalo de datas e por grupo muscular;

- [x] Deve ser possível o utilizador criar, visualizar, editar e eliminar exercícios;
- [x] Deve ser possível o utilizador obter exercícios predefinidos na aplicação;
- [x] Deve ser possível o utilizador procurar exercícios pelo nome;
- [x] Deve ser possível o utilizador filtrar exercícios por grupo muscular;

## Regras de negócio

- [x] O utilizador não deve poder registar-se com um e-mail duplicado;
- [x] O utilizador não deve poder criar um exercício duplicado;
- [x] O utilizador não deve poder criar um template duplicado;
- [x] O utilizador não deve poder editar ou eliminar exercícios ou templates predefinidos da aplicação;
- [x] O utilizador não deve poder visualizar dados de outros utilizadores;

## Requisitos não funcionais

- [x] A password do utilizador precisa de estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos numa base de dados;
- [x] O utilizador deve ser identificado por um JWT (JSON Web Token);

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

NodeJS, Fastify, Prisma, Vistest, Supertest, Docker
