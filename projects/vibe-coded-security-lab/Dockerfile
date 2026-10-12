# Multi-stage production build for Vibe Coded — Security Lab

# -----------------------------------------------------------------------------
# Stage 1: Build static distribution
# -----------------------------------------------------------------------------
FROM node:22-alpine AS builder

WORKDIR /app

# Install dependencies using deterministic package-lock
COPY package.json package-lock.json ./
RUN npm ci

# Copy project source and configuration
COPY . .

# Build production assets
RUN npm run build

# -----------------------------------------------------------------------------
# Stage 2: Lightweight production web server (Nginx Alpine)
# -----------------------------------------------------------------------------
FROM nginx:1.27-alpine-slim AS runner

# Remove default Nginx configuration
RUN rm -rf /etc/nginx/conf.d/default.conf /usr/share/nginx/html/*

# Copy custom Nginx SPA configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy compiled static assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose HTTP port
EXPOSE 80

# Health check to ensure Nginx responds
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1:80/ || exit 1

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
