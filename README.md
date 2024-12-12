# Enquete

Qual seu framework preferido?

Projeto utilizando Node.js com Express e MongoDB como banco de dados.

Utilizando backend para processar a votação e salvar os resultados.

## Inicializando o projeto Node.js:

```bash
npm init -y
```

## Dependências necessárias:

express: Framework web para criar o servidor.
mongoose: ORM para MongoDB.
body-parser: Middleware para processar o corpo das requisições.
cors: Middleware para permitir que o frontend acesse o backend.

## Instalando dependências
```bash
npm install express mongoose body-parser cors dotenv
```

O arquivo `server.js` responsável pelo BackEnd

onde:

/enquete: Endpoint para enviar o voto. Ele recebe o framework escolhido e incrementa a contagem de votos.
/resultados: Endpoint para obter os resultados da enquete. Ele retorna todos os votos de cada framework.

## Iniciar o Servidor

Agora, você pode iniciar o servidor:

```bash
node server.js
```

Acessar via Browser

http://127.0.0.1:5501/index.html