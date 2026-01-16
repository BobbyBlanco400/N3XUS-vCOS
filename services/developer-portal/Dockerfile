FROM node:20-alpine

# Layer 1: Build-time validation
ARG N3XUS_HANDSHAKE
RUN if [ "$N3XUS_HANDSHAKE" != "55-45-17" ]; then \
    echo "❌ N3XUS HANDSHAKE VIOLATION: Build denied" && exit 1; fi

WORKDIR /app

# Install dependencies
COPY package.json .
RUN npm install --production

# Create non-root user
RUN adduser -D -u 1001 nexus
USER nexus

COPY server.js .

# Layer 2: Runtime validation happens in server.js
ENV N3XUS_HANDSHAKE=""

EXPOSE 3000
CMD ["node", "server.js"]
