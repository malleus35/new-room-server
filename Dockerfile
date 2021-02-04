FROM node:lts-alpine
RUN mkdir server
WORKDIR /server
COPY ./package.json /server
COPY ./dist/authServer.js /server
RUN yarn install
EXPOSE 8080
CMD ["node", "authServer.js"]