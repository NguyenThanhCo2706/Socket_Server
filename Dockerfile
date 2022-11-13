FROM node:15-alpine

WORKDIR /home/app

COPY . .

RUN npm install

CMD ["npm", "start"]