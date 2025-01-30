FROM node:lts-buster
RUN git clone https://github.com/xnodesdev/GARFIELD-WHATSAPP-BOT-v10
WORKDIR /root/GARFIELD-WHATSAPP-BOT-v10
RUN npm install && npm install -g pm2 || yarn install --network-concurrency 1
COPY . .
EXPOSE 9090
CMD ["npm", "start"]