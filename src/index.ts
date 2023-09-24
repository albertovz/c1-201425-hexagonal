// src/application/server.ts
import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './user/application/routes/userRoutes';

const app = express();

app.use(bodyParser.json());

// Configura otras rutas para Libros y Reseñas

app.use('/users', userRoutes);
// Agrega rutas para Libros y Reseñas aquí

const PORT = process.env.PORT || 3000;

console.log("esto es una  prueba");
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});