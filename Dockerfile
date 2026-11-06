FROM node:24-alpine AS base
WORKDIR /app

FROM base AS builder
# NEXT_PUBLIC_* values are inlined at build time, so they can't be set at runtime
ARG NEXT_PUBLIC_STOP_AND_SEARCH_API=https://data.police.uk/api
ARG NEXT_PUBLIC_SELECTED_POLICE_FORCE=leicestershire
ENV NEXT_PUBLIC_STOP_AND_SEARCH_API=$NEXT_PUBLIC_STOP_AND_SEARCH_API \
    NEXT_PUBLIC_SELECTED_POLICE_FORCE=$NEXT_PUBLIC_SELECTED_POLICE_FORCE \
    NEXT_TELEMETRY_DISABLED=1
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build && npm prune --omit=dev && rm -rf .next/cache

FROM base AS runner
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000
COPY --from=builder --chown=node:node /app/package.json ./
COPY --from=builder --chown=node:node /app/next.config.ts ./
COPY --from=builder --chown=node:node /app/public ./public
COPY --from=builder --chown=node:node /app/node_modules ./node_modules
COPY --from=builder --chown=node:node /app/.next ./.next
USER node
EXPOSE 3000
CMD ["node_modules/.bin/next", "start"]
