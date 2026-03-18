# Build and development stage
FROM node:22-slim

WORKDIR /app

# Copy package files
COPY package.json yarn.lock* ./

# Install dependencies with yarn
RUN yarn install

# Copy application code
COPY . .

# Expose development server port
EXPOSE 4200

# Run Angular development server
CMD ["yarn", "start", "--", "--host", "0.0.0.0"]
