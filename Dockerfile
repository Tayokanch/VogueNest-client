# -------- Build stage --------
FROM node:20-alpine AS builder
WORKDIR /app

# Copy only package files first for caching
COPY package*.json ./
RUN npm install

# Copy the rest of the project and build
COPY . .
RUN npm run build

# -------- Runtime stage --------
FROM nginx:alpine

# Copy built React app into Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Optional: copy custom Nginx config if needed
COPY ./nginx/vogueshopping.conf /etc/nginx/conf.d/vogueshopping.conf

CMD ["nginx", "-g", "daemon off;"]
