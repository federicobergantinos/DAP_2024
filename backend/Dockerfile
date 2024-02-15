# production environment
FROM node:16
WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .

ARG CODE
ENV CODE="superSecret"
ARG POSTGRES_DB
ENV POSTGRES_DB="5432"
ARG POSTGRES_USER
ENV POSTGRES_USER="postgres"
ARG POSTGRES_PASSWORD
ENV POSTGRES_PASSWORD="testing"
ARG POSTGRES_HOST
ENV POSTGRES_HOST="localhost"

RUN touch .env \
RUN echo "CODE=\"${CODE}\"" >> .env
RUN echo "POSTGRES_DB=\"${POSTGRES_DB}\"" >> .env
RUN echo "POSTGRES_USER=\"${POSTGRES_USER}\"" >> .env
RUN echo "POSTGRES_PASSWORD=\"${POSTGRES_PASSWORD}\"" >> .env
RUN echo "POSTGRES_HOST=\"${POSTGRES_HOST}\"" >> .env

EXPOSE 8080
CMD ["node", "index.js"]
