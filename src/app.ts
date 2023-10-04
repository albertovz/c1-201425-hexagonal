import express from 'express';
// import sequelize from 'sequelize/types/sequelize';
// import sequelize from './database/mysql';
// import { userRouter } from './user/infraestructure/userRouter';
// import { bookRouter } from './book/infraestructure/bookRouter';
// import { reviewRouter } from './reviews/infraestructure/reviewRouter';
// import { loanRouter } from './loan/infraestructure/loanRouter';
// import { authRouter } from './authentication/infraestructure/authRouter';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
// sequelize.sync();


app.use(express.json());
// app.use('/api/v1/users', userRouter);
// app.use('/api/v1/books', bookRouter);
// app.use('/api/v1/reviews',reviewRouter);
// app.use('/api/v1/loans',loanRouter);
// app.use('/api/v1/auth', authRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
