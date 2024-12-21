# Stage 1: Build the application
FROM node:23-alpine3.21 AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the Next.js app
RUN npm run build && \
		npm prune --production

# Stage 2: Create the final image
FROM node:23-alpine3.21

# Create a non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Set the working directory inside the container
WORKDIR /app

# Copy only the necessary files from the builder stage
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# Change ownership to the non-root user
RUN chown -R appuser:appgroup /app

# Switch to the non-root user
USER appuser

# Expose port 3000 to the outside world
EXPOSE 3000

# Set environment variable to specify the port
ENV PORT 3000

# Start the Next.js app
CMD ["node", "server.js"]