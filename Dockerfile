# Usa una imagen base de Node.js
FROM node:14

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /dist

# Copia el archivo package.json y package-lock.json a /app
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia todo el código fuente a /app
COPY . .

# Expone un puerto en el contenedor (el puerto en el que se ejecuta tu aplicación)
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm start", "index.js"]
