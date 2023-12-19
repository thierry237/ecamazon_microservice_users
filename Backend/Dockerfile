
FROM node:20.9.0-alpine

WORKDIR /app


RUN npm install -g nodemon@latest

COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Define the command to run your application
CMD ["nodemon", "server.js"]
