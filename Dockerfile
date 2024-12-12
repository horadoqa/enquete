# Etapa 1: Definir a imagem base (Node.js)
FROM node:16

# Etapa 2: Definir o diretório de trabalho no contêiner
WORKDIR /usr/src/app

# Etapa 3: Copiar o arquivo package.json e package-lock.json
COPY package*.json ./

# Etapa 4: Instalar as dependências
RUN npm install

# Etapa 5: Copiar os arquivos do projeto para o contêiner
COPY . .

# Etapa 6: Expor a porta do servidor (a mesma porta que você usa no Express)
EXPOSE 3000

# Etapa 7: Definir o comando para rodar o aplicativo
CMD ["npm", "start"]

# docker build -t horadoqa/enquete-frameworks:v1.0.0 .

# docker images

# docker push horadoqa/enquete-frameworks:v1.0.0

# docker run -p 3000:3000 horadoqa/enquete-frameworks:v1.0.0

