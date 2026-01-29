# 🚿 Lava Jato API

API RESTful desenvolvida para o gerenciamento de um sistema de Lava Jato. Este projeto foi construído com foco em demonstrar **conhecimentos sólidos em SQL nativo** e estruturação de back-end com Node.js, sem a abstração de ORMs, para total controle das queries e performance.

## 🚀 Tecnologias e Ferramentas

* **Linguagem:** Node.js (JavaScript ES6+)
* **Framework:** Express
* **Banco de Dados:** PostgreSQL (Hospedado na Neon Tech)
* **Driver de Banco:** `postgres` (Postgres.js) - *Utilizado para execução de Queries SQL Puras.*
* **Arquitetura:** Organização por Rotas e Módulos.

## ⚙️ Funcionalidades

O sistema gerencia o fluxo completo de uma ordem de serviço:

* **CRUDs Completos:** Clientes, Funcionários, Veículos, Cargos e Serviços.
* **Gestão de Ordens de Serviço (OS):** Vinculação de funcionários e veículos a um serviço.
* **Relacionamentos Manuais:** Lógica de junção de tabelas (ex: buscar veículos de um cliente) implementada via código.
* **Financeiro:** Controle de pagamentos, parcelas e status financeiro.

## 🛠️ Como rodar o projeto

1.  Clone o repositório:
    ```bash
    git clone [https://github.com/camilarochatec/lavajato-api.git](https://github.com/camilarochatec/lavajato-api.git)
    ```

2.  Instale as dependências:
    ```bash
    npm install
    ```

3.  Configure o banco de dados:
    Crie um arquivo `.env` na raiz e adicione sua string de conexão:
    ```env
    DATABASE_URL="postgres://usuario:senha@host/banco"
    ```

4.  Inicie o servidor:
    ```bash
    node index.js
    ```
    *O servidor rodará em `http://localhost:3000`*

## 🔗 Exemplos de Rotas

| Rota | Método | Descrição |
| :--- | :--- | :--- |
| `/clientes` | GET | Retorna clientes com seus respectivos veículos aninhados. |
| `/os` | POST | Cria uma nova Ordem de Serviço. |
| `/funcionarios` | GET | Lista funcionários com seus cargos (Join manual). |
