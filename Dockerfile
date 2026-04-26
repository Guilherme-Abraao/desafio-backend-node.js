FROM node:22-alpine

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm install

COPY . .

RUN DATABASE_URL="postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public" npx prisma generate

RUN npm run build

EXPOSE 3333

CMD ["npm", "run", "start"]