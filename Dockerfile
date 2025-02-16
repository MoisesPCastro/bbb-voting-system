FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install --include=dev
COPY . .
EXPOSE 3333
CMD ["npm", "start"]
