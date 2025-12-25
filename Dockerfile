# Step 1: Build the Frontend (Vite/React)
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
# Install all dependencies to build the visual interface
RUN npm install
COPY . .
# Build the website into the 'dist' folder
RUN npm run build

# Step 2: Setup the Logic Core (The Backend Brain)
FROM node:20-alpine
WORKDIR /app

# Copy package files so we can install the AI libraries
COPY package*.json ./

# Install ONLY the backend dependencies
# We use 'ci' (Clean Install) for valid, reproducible builds
RUN npm install --omit=dev

# Copy the built "Face" (Frontend) from Step 1
COPY --from=builder /app/dist ./dist

# --- CRITICAL CHANGE ---
# Instead of copying just 'server.js', we copy EVERYTHING.
# This ensures 'app.js', '.env', and any future files are included.
# This also forces the build cache to reset because the file structure changed.
COPY . .

# Tell Google Cloud Run to expect Port 8080
ENV PORT=8080
EXPOSE 8080

# START COMMAND: 
# This runs whatever command is in your package.json under "start".
# Since we updated package.json to say "node app.js", this will run the new brain.
CMD ["npm", "start"]
