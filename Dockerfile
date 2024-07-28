FROM node:20-alpine as builder

WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
RUN npm run build
RUN cp version.json .next/static/version.json
EXPOSE 3000
CMD [ "npm","run","start" ]
