FROM node:20

WORKDIR /app

# Copy package.json and package-lock.json first for dependency caching
COPY package*.json ./
RUN npm config set strict-ssl false
ENV PUPPETEER_SKIP_DOWNLOAD=true
RUN npm install --omit=dev

# Copy all source files
COPY . .

# Reset entrypoint to avoid issues with missing scripts
ENTRYPOINT []

# Run the server directly (JavaScript)
CMD ["node", "server.js"]
