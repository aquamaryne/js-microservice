FROM node:20
WORKDIR /server
COPY package*.json . /server/
RUN npm install 
EXPOSE 8000
CMD node server/index.js