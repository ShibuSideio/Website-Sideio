# STAGE 1: Build the Visual Interface
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# STAGE 2: Build the Production Server
FROM node:20-alpine
WORKDIR /app

# 1. Install Dependencies
COPY package*.json ./
# --omit=dev keeps the image small and prevents "vite" crashes
RUN npm install --omit=dev

# 2. Copy Source Code (app.js, etc)
COPY . .

# 3. Copy Built Assets (The Website)
# We do this LAST to ensure nothing overwrites the 'dist' folder
COPY --from=builder /app/dist ./dist

# 4. Expose Port
ENV PORT=8080
EXPOSE 8080

# 5. Start Command
CMD ["npm", "start"]
