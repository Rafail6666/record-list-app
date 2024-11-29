# Используем официальный образ Node.js
FROM node:16

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь проект
COPY . .

# Строим приложение
RUN npm run build

# Указываем порт, на котором приложение будет работать
EXPOSE 3000

# Запускаем приложение
CMD ["npm", "start"]
