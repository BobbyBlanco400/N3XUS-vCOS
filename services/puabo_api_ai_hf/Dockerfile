FROM node:20-alpine

# Build-time handshake validation
ARG N3XUS_HANDSHAKE
RUN if [ "$N3XUS_HANDSHAKE" != "55-45-17" ]; then \
      echo "❌ BUILD DENIED: Invalid N3XUS Handshake" && exit 1; \
    fi

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm ci --only=production

# Copy application
COPY server.js .

# Non-root execution
RUN adduser -D -u 1001 nexus && chown -R nexus:nexus /app
USER nexus

EXPOSE 3000

# Runtime handshake validation happens in server.js
CMD ["node", "server.js"]
