ARG NODE_IMAGE=node:18-alpine3.15

FROM $NODE_IMAGE AS base
RUN apk --no-cache add dumb-init
RUN mkdir -p /app && chown node:node /app

WORKDIR /app

RUN npm install -g pnpm
USER node
RUN mkdir tmp

FROM base AS dependencies
COPY --chown=node:node ./package*.json ./
RUN pnpm install --ignore-scripts
COPY --chown=node:node . .

FROM dependencies AS build
RUN node ace build --production

FROM base AS production

ENV NODE_ENV=production
ENV PORT=$PORT
ENV HOST=0.0.0.0

VOLUME ["/app/resources/views/emails"]

COPY --chown=node:node ./package*.json ./
RUN pnpm install --production --ignore-scripts
COPY --chown=node:node --from=build /app/build .
EXPOSE $PORT
CMD [ "dumb-init", "node", "server.js" ]