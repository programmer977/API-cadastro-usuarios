# Cadastro de Usuários

Projeto Fullstack simples desenvolvido para praticar a integração entre
Frontend, Backend e banco de dados relacional.

## Tecnologias utilizadas

- HTML5
- JavaScript
- TypeScript
- Node.js (módulo HTTP nativo)
- PostgreSQL
- Node-postgres (pg)
- Git e GitHub

## Funcionalidades

- Cadastro de usuários com nome e e-mail.
- Listagem de usuários cadastrados.
- Armazenamento dos dados no PostgreSQL.
- Comunicação entre frontend e backend utilizando Fetch API.
- Validação básica dos dados recebidos.

## Estrutura do projeto

```text
cadastro-usuarios/
├── src/
│   ├── server.ts
│   └── db.ts
├── public/
│   └── index.html
├── .env.example
├── .gitignore
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
```

## Como executar

### 1. Clone o repositório

```bash
git clone https://github.com/SEU-USUARIO/cadastro-usuarios.git
cd cadastro-usuarios
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure o banco de dados

Crie um banco de dados PostgreSQL chamado `treino_db`.

Execute o seguinte SQL:

```sql
CREATE TABLE usuarios (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE
);
```

### 4. Configure as variáveis de ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
DB_HOST=127.0.0.1
DB_PORT=5432
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_NAME=treino_db
PORT=3000
```

### 5. Execute o projeto

```bash
npm run dev
```

Acesse no navegador:

http://localhost:3000

## Endpoints da API

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| GET | `/` | Exibe a interface HTML |
| GET | `/api/usuarios` | Lista os usuários cadastrados |
| POST | `/api/usuarios` | Cadastra um novo usuário |

### Exemplo de requisição POST

```json
{
    "nome": "João",
    "email": "joao@email.com"
}
```

## Objetivo do projeto

Compreender, na prática, o funcionamento de uma aplicação Fullstack,
incluindo requisições HTTP, manipulação de dados, tipagem com TypeScript
e persistência de informações em um banco PostgreSQL.

## Autor

**João Marcelo Alves de Carvalho**

Estudante de Ciência da Computação.

GitHub: https://github.com/SEU-USUARIO