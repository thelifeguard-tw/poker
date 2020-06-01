FROM node:14.2.0-alpine3.11
WORKDIR /code
COPY packages/server/package.json /code
RUN yarn
COPY packages/server /code

EXPOSE 5000

CMD yarn start
