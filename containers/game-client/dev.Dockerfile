FROM node:14.2.0-alpine3.11
WORKDIR /code
COPY packages/client/package.json /code
RUN yarn
COPY packages/client /code

EXPOSE 3000

CMD yarn start
