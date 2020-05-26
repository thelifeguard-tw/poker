# Stage 1: Build dependencies
FROM node:14.2.0-alpine3.11 as build-deps
WORKDIR /code
COPY packages/client/package.json /code
RUN yarn
COPY packages/client /code

#Stage 2: Build production artifact
FROM node:14.2.0-alpine3.11 as build-artifact
COPY --from=build-deps /code /src
WORKDIR /src
RUN yarn list
RUN ls -la
RUN yarn build

#Stage 3: Run prod application
FROM nginx:1.18.0-alpine
COPY --from=build-artifact /src/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
