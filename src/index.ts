// src/application/server.ts
import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './user/infrastructure/routes/userRoutes';
import bookRoutes from './book/infrastructure/routes/bookRoutes';
import reviewRoutes from './review/infrastructure/routes/reviewRoutes';
import loanRoutes from './loan/infrastructure/routes/loanRoutes';
require('dotenv').config();

const app = express();

app.use(bodyParser.json());

// Configura otras rutas para Libros y Reseñas

app.use('/users/api', userRoutes);
app.use('/books/api', bookRoutes);
app.use('/reviews/api', reviewRoutes);
app.use('/loans/api', loanRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
