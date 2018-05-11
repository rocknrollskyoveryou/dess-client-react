# Stage 1 - the build process
FROM node:9 as build-deps
WORKDIR /usr/src/client
COPY package.json yarn.lock ./
RUN yarn
COPY . ./
RUN yarn build

# Stage 2 - the production environment
FROM nginx
COPY --from=build-deps /usr/src/client/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]