FROM node:14.15.1
WORKDIR /usr/src/api-tdd
COPY ./package.json .
RUN npm install --only=prod
COPY ./dist ./dist
EXPOSE 5000
CMD npm start