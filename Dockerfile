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

# Install ONLY the backend dependencies (Express, Google AI, Firebase)
# We skip the heavy design tools like Tailwind here to keep it fast
RUN npm install --omit=dev

# Copy the built "Face" (Frontend) from Step 1
COPY --from=builder /app/dist ./dist

# Copy the "Brain" (server.js) from your project folder
COPY server.js .

# Tell Google Cloud Run to expect Port 8080
ENV PORT=8080
EXPOSE 8080

# START COMMAND: This runs 'node server.js' (via npm start)
# This launches the Logic Core, which serves both the website and the AI.
CMD ["npm", "start"]
