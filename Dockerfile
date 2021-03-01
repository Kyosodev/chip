FROM node:15.2.1

# Create app directory
WORKDIR /chip

# Install app dependencies
COPY package*.json ./
RUN npm install

# Bundle app source
COPY . .

CMD [ "node", "index.js" ]