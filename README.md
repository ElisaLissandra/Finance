# Sistema de Gestão Financeira

Este é um projeto full-stack de um sistema de gestão financeira pessoal, desenvolvido para permitir que os usuários controlem seus salários e despesas de forma eficiente. A aplicação conta com um backend robusto em **Laravel** que serve uma API segura e um frontend moderno e reativo em **React**.
OBS: Este projeto foi desenvolvido em 2022, para praticar os meus conhecimentos em desenvolvimento web com Laravek e React.

## ✨ Recursos Principais

-   **Autenticação de Usuários:** Sistema seguro de registro e login utilizando JWT (JSON Web Tokens).
-   **Gestão de Salários:** Funcionalidades CRUD (Criar, Ler, Atualizar, Excluir) para os salários do usuário.
-   **Gestão de Custos:** Funcionalidades CRUD para as despesas do usuário.
-   **Dashboard Financeiro:** Uma visão consolidada que apresenta o balanço entre salários e despesas, fornecendo um resumo da saúde financeira.
-   **Interface Reativa:** Frontend construído com React e Vite, proporcionando uma experiência de usuário rápida e fluida.
-   **Arquitetura Sólida:** O backend utiliza o Padrão de Repositório para separar a lógica de negócios do acesso a dados, promovendo um código mais limpo e de fácil manutenção.

## 🚀 Tecnologias Utilizadas
Laravel e Reactjs

### Backend (API)
-   **Framework:** Laravel 11
-   **Linguagem:** PHP 8.2+
-   **Autenticação:** `php-open-source-saver/jwt-auth`
-   **Banco de Dados:** Compatível com MySQL, PostgreSQL, SQLite.

### Frontend (SPA)
-   **Biblioteca:** React 18
-   **Build Tool:** Vite
-   **Roteamento:** React Router DOM
-   **Cliente HTTP:** Axios
-   **UI/Componentes:** Material-UI (MUI), PrimeIcons


## 🔧 Instalação e Configuração

Siga os passos abaixo para configurar e executar o projeto em seu ambiente local.

### Pré-requisitos
-   PHP >= 8.2
-   Composer
-   Node.js e NPM
-   Um servidor de banco de dados (ex: MySQL, MariaDB)

### 1. Clonar o Repositório
```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```

### 2. Configurar o Backend (Laravel)

Navegue até o diretório raiz do projeto.

```bash
# 1. Instalar dependências do PHP
composer install

# 2. Criar o arquivo de ambiente
cp .env.example .env

# 3. Gerar a chave da aplicação
php artisan key:generate

# 4. Gerar o segredo para o JWT
php artisan jwt:secret
```

**Em seguida, configure seu arquivo `.env`** com as credenciais do seu banco de dados:

```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=finance_db
DB_USERNAME=root
DB_PASSWORD=
```

**Continue com a configuração:**

```bash
# 5. Executar as migrações do banco de dados
php artisan migrate

# (Opcional) Popular o banco de dados com dados de teste
php artisan db:seed
```

### 3. Configurar o Frontend (React)

Abra um novo terminal e navegue até o diretório do frontend.

```bash
cd Finance-react

# 1. Instalar dependências do Node.js
npm install
```
O cliente Axios em `Finance-react/src/axiosClient.js` já está pré-configurado para se comunicar com a API do Laravel em `http://127.0.0.1:8000/api`.

---

## ▶️ Executando a Aplicação

Você precisará de dois terminais abertos para executar o backend e o frontend simultaneamente.

**Terminal 1: Iniciar o servidor do Backend (Laravel)**
```bash
# A partir do diretório raiz do projeto
php artisan serve
```
O servidor da API estará disponível em `http://127.0.0.1:8000`.

**Terminal 2: Iniciar o servidor de desenvolvimento do Frontend (React)**
```bash
# A partir do diretório Finance-react
npm run dev
```
A aplicação React estará acessível em `http://localhost:5173` (ou outra porta indicada pelo Vite).

---

## 📡 Endpoints da API

Todas as rotas de dados requerem um token JWT válido no cabeçalho `Authorization: Bearer <token>`.

| Verbo HTTP | Endpoint                 | Descrição                                         | Autenticação |
|------------|--------------------------|---------------------------------------------------|--------------|
| `POST`     | `/api/register`          | Registra um novo usuário.                         | Não          |
| `POST`     | `/api/login`             | Autentica um usuário e retorna um token JWT.      | Não          |
| `GET`      | `/api/user`              | Retorna os dados do usuário autenticado.          | **Sim**      |
| `POST`     | `/api/logout`            | Invalida o token JWT do usuário.                  | **Sim**      |
| `POST`     | `/api/refresh`           | Atualiza um token JWT expirado.                   | **Sim**      |
|            |                          |                                                   |              |
| `GET`      | `/api/salary`            | Lista todos os salários do usuário.               | **Sim**      |
| `POST`     | `/api/salary`            | Adiciona um novo salário.                         | **Sim**      |
| `GET`      | `/api/salary/{slug}`     | Exibe os detalhes de um salário específico.       | **Sim**      |
| `PUT`      | `/api/salary/{slug}`     | Atualiza um salário existente.                    | **Sim**      |
| `DELETE`   | `/api/salary/{slug}`     | Remove um salário.                                | **Sim**      |
|            |                          |                                                   |              |
| `GET`      | `/api/cost`              | Lista todos os custos do usuário.                 | **Sim**      |
| `POST`     | `/api/cost`              | Adiciona um novo custo.                           | **Sim**      |
| `GET`      | `/api/cost/{slug}`       | Exibe os detalhes de um custo específico.         | **Sim**      |
| `PUT`      | `/api/cost/{slug}`       | Atualiza um custo existente.                      | **Sim**      |
| `DELETE`   | `/api/cost/{slug}`       | Remove um custo.                                  | **Sim**      |
|            |                          |                                                   |              |
| `GET`      | `/api/finance`           | Retorna dados consolidados de finanças.           | **Sim**      |


## 🏛️ Estrutura do Projeto

O projeto é organizado em duas partes principais:

-   `./` (Raiz): Contém o backend Laravel.
    -   `app/`: Lógica principal da aplicação (Controllers, Models, Repositories).
    -   `routes/api.php`: Definição de todas as rotas da API.
    -   `database/`: Migrations e seeders do banco de dados.
-   `Finance-react/`: Contém o frontend React (SPA).
    -   `src/views/`: Componentes de página (Login, Register, Finance).
    -   `src/Components/`: Componentes reutilizáveis (NavBar, Forms, Tables).
    -   `src/Contexts/`: Gerenciamento de estado global com Context API.
    -   `src/router.jsx`: Configuração das rotas do frontend.
    -   `src/axiosClient.js`: Cliente Axios configurado para a API.
