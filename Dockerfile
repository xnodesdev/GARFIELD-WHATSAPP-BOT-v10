# Use the official Node.js 20.18.1 image from Docker Hub
FROM node:20.18.1

# Create and set the working directory
WORKDIR /app

# Copy package.json and package-lock.json files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Command to run the bot
CMD ["node", "index.js"]
