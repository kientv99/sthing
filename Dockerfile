FROM node:16-alpine3.11
WORKDIR /usr/src/example/app
COPY package.json /usr/src/example/app
RUN npm install

COPY index.js /usr/src/example/app/
EXPOSE 8000
CMD ["node", "index.js"]
