# Use Node.js LTS (Alpine for smaller image size)
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files first to leverage cache
COPY package*.json ./

# Install dependencies (production only)
RUN npm install --only=production

# Copy the rest of the application
COPY . .

# Cloud Run expects the container to listen on port 8080, or the PORT env var
ENV PORT=8080
EXPOSE 8080

# Start command
CMD ["npm", "start"]
