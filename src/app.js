"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import sequelize from 'sequelize/types/sequelize';
// import sequelize from './database/mysql';
// import { userRouter } from './user/infraestructure/userRouter';
// import { bookRouter } from './book/infraestructure/bookRouter';
// import { reviewRouter } from './reviews/infraestructure/reviewRouter';
// import { loanRouter } from './loan/infraestructure/loanRouter';
// import { authRouter } from './authentication/infraestructure/authRouter';
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
// sequelize.sync();
app.use(express_1.default.json());
// app.use('/api/v1/users', userRouter);
// app.use('/api/v1/books', bookRouter);
// app.use('/api/v1/reviews',reviewRouter);
// app.use('/api/v1/loans',loanRouter);
// app.use('/api/v1/auth', authRouter);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
