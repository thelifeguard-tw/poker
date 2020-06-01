# Stage 1: Build dependencies
FROM node:14.2.0-alpine3.11 as build-artifact
WORKDIR /code
COPY packages/server/package.json /code
RUN yarn
COPY packages/server /code

RUN yarn build

#Stage 3: Run prod application
FROM node:14.2.0-alpine3.11
WORKDIR /app
COPY --from=build-artifact /code/build /app
COPY --from=build-artifact /code/node_modules /app/node_modules
COPY --from=build-artifact /code/package.json /app
EXPOSE 5000
CMD ["node", "src/Server.js"]
