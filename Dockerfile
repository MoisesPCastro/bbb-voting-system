FROM node:22.13.1
WORKDIR /app
COPY package*.json ./
RUN npm install --include=dev
COPY . .
EXPOSE 3333
CMD ["npm", "start"]
