# Managease

## Como Executar o Projeto

Siga as instruções abaixo para executar o projeto em sua máquina local:

### Pré-requisitos

- Node.js instalado
- npm (Node Package Manager) ou Yarn

### Passos para Execução

1. Clone o repositório para sua máquina local: 

```sh
git clone https://github.com/seu-usuario/managease.git
```

2. Navegue até o diretório do projeto:

```sh
cd managease
```

3. Navegue no frontend, instale as dependências e execute:

```sh
cd frontend
```

```sh
npm install
# ou
yarn install
```

```sh
npm run serve
```
4. Abra outro terminal, agora para o backend:

```sh
cd backend
```

```sh
npm install
# ou
yarn install
```

```sh
npm run dev
```

6. Acesse o Atlas MongoDB e crie uma collection:

    Caso fique em dúvida de como criar collections no atlas acesse: 
    https://www.mongodb.com/docs/atlas/atlas-ui/collections/

    Clique em Connect depois Drivers e escolha o drive Node.js:
    Deve aparecer como: 
    </br>
    
    ``
    mongodb+srv://<username>:<password>@cluster0.zq01pyh.mongodb.net/<collection>?retryWrites=true&w=majority&appName=Cluster0
    ``

    Acesse o manual: https://www.mongodb.com/docs/manual/reference/connection-string/

7. Crie um arquivo .env na raiz do projeto backend. Exemplo:

```env
DB_CONNECTION_STRING=mongodb+srv://<username>:<password>@cluster0.zq01pyh.mongodb.net/<collection>?retryWrites=true&w=majority&appName=Cluster0
```

8. Acesse o projeto em seu navegador:

```
http://localhost:8080/#/
```

9. E você já pode acessar a aplicação!