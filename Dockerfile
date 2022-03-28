FROM node:14

# アプリケーションディレクトリを作成する
WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --only=production
COPY ./src .

EXPOSE 3000
CMD [ "npm", "start" ]