# Step 1: Build the Site
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
# Install all dependencies (including Tailwind and Vite)
RUN npm install
COPY . .
# Build the website into the 'dist' folder
RUN npm run build

# Step 2: Serve the Site
FROM node:20-alpine
WORKDIR /app
# Install the server tool globally so it's ready instantly
RUN npm install -g serve
# Copy the built website from Step 1
COPY --from=builder /app/dist ./dist
# Tell Google to expect Port 8080
ENV PORT=8080
# Start the server immediately
CMD ["serve", "-s", "dist", "-l", "8080"]
