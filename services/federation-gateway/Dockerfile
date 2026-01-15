FROM node:20-alpine
ARG N3XUS_HANDSHAKE
RUN if [ "$N3XUS_HANDSHAKE" != "55-45-17" ]; then echo "❌ BUILD DENIED" && exit 1; fi
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY server.js .
RUN adduser -D -u 1001 nexus && chown -R nexus:nexus /app
USER nexus
EXPOSE 3000
CMD ["node", "server.js"]
