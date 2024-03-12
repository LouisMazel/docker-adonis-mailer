ARG NODE_IMAGE=node:21-alpine

FROM $NODE_IMAGE AS base

RUN apk add --no-cache python3 g++ make
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# RUN apk --no-cache add dumb-init
# RUN mkdir -p /app && chown node:node /app

WORKDIR /app

FROM base AS installer
COPY --chown=node:node ./package.json ./
COPY --chown=node:node ./pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile --ignore-scripts
COPY --chown=node:node . .

FROM installer AS builder
RUN node ace build --production

FROM installer AS production

ENV NODE_ENV=production
ENV DRIVE_DISK=local
ENV PORT=$PORT
ENV HOST=0.0.0.0
ENV APP_KEY=0TiFrBfnMMnCLiU659a8_zCxxC9AHbZg
ENV APP_NAME=docker-adonis-mailer

VOLUME ["/app/resources/views/templates"]

COPY --chown=node:node ./package*.json ./
RUN pnpm install --production --ignore-scripts
COPY --chown=node:node --from=builder /app/build .
EXPOSE $PORT
CMD [ "dumb-init", "node", "server.js" ]