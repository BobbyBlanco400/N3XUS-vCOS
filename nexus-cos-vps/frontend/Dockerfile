FROM node:20

WORKDIR /app

# Copy package files first for dependency caching
COPY package*.json ./
RUN npm install

# Copy tsconfig.json for TypeScript validation
COPY tsconfig.json .
COPY tsconfig.app.json .
COPY tsconfig.node.json .

# Copy all source files
COPY . .

# Install TypeScript and type definitions for build validation
RUN npm install -D typescript @types/node

# Build the frontend
RUN npm run build

# Use nginx to serve the built files
FROM nginx:alpine

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=0 /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
