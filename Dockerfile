# Build stage
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy the built assets from the builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy the nginx configuration template
# The official nginx image automatically processes templates in this directory
# and outputs them to /etc/nginx/conf.d/
COPY nginx.conf.template /etc/nginx/templates/default.conf.template

# Copy the entrypoint script
COPY entrypoint.sh /docker-entrypoint.d/99-inject-env.sh
RUN chmod +x /docker-entrypoint.d/99-inject-env.sh

# Cloud Run provides the PORT environment variable
ENV PORT=8080

# Expose the port
EXPOSE 8080

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
