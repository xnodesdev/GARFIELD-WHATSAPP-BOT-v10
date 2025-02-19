FROM node:lts-buster
WORKDIR /root/GARFIELD-WHATSAPP-BOT-v10
COPY package*.json ./
RUN npm install && npm install -g pm2 || yarn install --network-concurrency 1
COPY . .
EXPOSE 9090
CMD ["npm", "start"]
