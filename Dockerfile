# Use the official Node.js v12 image as the base image
FROM node:12.22.9

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install --verbose

# Copy the rest of the application code to the working directory
COPY . .

# Build the application using webpack
RUN npm run build

# Use a simple web server to serve the static files
RUN npm install -g http-server

# Expose the port that the server will run on
EXPOSE 8080

# Command to run the web server
CMD ["http-server", "dist"]
