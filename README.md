Para rodar um projeto Node.js com Prisma, você pode seguir estas etapas:

### Requisitos

- **Node.js**: Certifique-se de que você tenha o Node.js instalado em sua máquina. Você pode baixá-lo em [nodejs.org](https://nodejs.org/).
- **NPM ou Yarn**: O gerenciador de pacotes NPM vem incluído com o Node.js, mas você pode optar por usar o Yarn.

### Passos para Rodar o Projeto

1. **Clone o Repositório**

   Primeiro, você precisará clonar o repositório do projeto. Execute o seguinte comando:

   ```bash
   git clone https://github.com/franciscodantas/ProgWeb2-BackEnd.git
   ```


2. **Instale as Dependências**

   ```bash
   npm install
   ```

3. **Configuração do Prisma**

   Certifique-se de que você tenha um arquivo `.env` configurado com as credenciais do banco de dados. Um exemplo de configuração pode ser:

   ```env
   DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/DBNAME"
   ```

4. **Migrate o Banco de Dados**

   Após a configuração, você precisa aplicar as migrações do Prisma. Execute o seguinte comando:

   ```bash
   npx prisma migrate dev --name init
   ```

   Isso criará as tabelas necessárias no banco de dados com base no seu esquema Prisma.

5. **Rodar a Aplicação**

   Agora, você pode iniciar a aplicação. Execute:

   ```bash
   npm run dev
   ```

   Isso iniciará o servidor em modo de desenvolvimento. Você poderá acessar a aplicação em `http://localhost:3000`.

6. **Arquivo de exemplo para requisições**

    Importe o arquivo ```User Management.postman_collection.json``` para o seu postman

