# Build no contexto da RAIZ do monorepo:
#   docker build -f apps/info-service/Dockerfile -t nerivan-info-service .

# ─── Build: precisa do workspace inteiro pra resolver @portfolio/shared-types ──
FROM node:20-alpine AS build
WORKDIR /repo

COPY package.json package-lock.json ./
COPY apps/api-gateway/package.json apps/api-gateway/package.json
COPY apps/info-service/package.json apps/info-service/package.json
COPY apps/blog-service/package.json apps/blog-service/package.json
COPY apps/web/package.json apps/web/package.json
COPY packages/shared-types/package.json packages/shared-types/package.json
RUN npm ci

COPY packages/shared-types packages/shared-types
COPY apps/info-service apps/info-service
RUN npm run build --workspace=apps/info-service

# ─── Runtime: só o necessário pra rodar o JS já compilado ──────────────────
FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production

COPY apps/info-service/package.json ./
RUN npm pkg delete dependencies.@portfolio/shared-types && \
    npm install --omit=dev --ignore-scripts && npm cache clean --force

COPY --from=build /repo/apps/info-service/dist ./dist

USER node
EXPOSE 4001
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s \
  CMD node -e "require('http').get('http://localhost:'+(process.env.PORT||4001)+'/health', r => process.exit(r.statusCode === 200 ? 0 : 1)).on('error', () => process.exit(1))"

CMD ["node", "dist/index.js"]
