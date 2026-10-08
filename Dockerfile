FROM node:22 AS frontend

WORKDIR /app/website

COPY website/package*.json ./
RUN npm ci

COPY website/ .
RUN npm run build


FROM node:22

WORKDIR /app

COPY lab-package/target/package*.json ./
RUN npm ci --omit=dev

COPY lab-package/target/server.js ./
COPY lab-package/target/public ./public
COPY lab-package/target/private ./private
COPY lab-package/target/config ./config

COPY --from=frontend /app/website/dist ./dist

COPY README.md .
COPY Guidance.md .

EXPOSE 3000

CMD ["node", "server.js"]