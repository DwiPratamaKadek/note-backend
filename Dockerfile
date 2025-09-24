FROM node:18-alpine 

WORKDIR /backend

COPY package*.json /backend/

RUN npm i 

COPY . .


CMD ["npm", "run", "dev"]