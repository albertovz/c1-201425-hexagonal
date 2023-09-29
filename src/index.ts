// src/application/server.ts
import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './user/application/routes/userRoutes';
import bookRoutes from './book/application/routes/bookRoutes';
import reviewRoutes from './review/application/routes/reviewRoutes';
import loanRoutes from './loan/application/routes/loanRoutes';
require('dotenv').config();

const app = express();

app.use(bodyParser.json());

// Configura otras rutas para Libros y Reseñas

app.use('/users', userRoutes);
app.use('/books', bookRoutes);
app.use('/reviews', reviewRoutes);
app.use('/loan/api', loanRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
