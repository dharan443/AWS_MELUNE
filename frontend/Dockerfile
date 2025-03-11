FROM node:20-alpine AS builder


# Set working directory
WORKDIR /app 

# Copy package.json and package-lock.json
COPY package*.json ./

# Update npm and install dependencies
RUN npm install -g rollup && npm install


# Copy all frontend files
COPY . .

# Build the React app
RUN npm run build

# Step 2: Serve with Nginx
FROM nginx:alpine

# Copy build files from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html 

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
