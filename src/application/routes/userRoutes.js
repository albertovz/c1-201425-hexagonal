"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/application/routes/userRoutes.ts
const express_1 = __importDefault(require("express"));
const UserUseCase_1 = require("../usecases/UserUseCase");
const UserRepository_1 = require("../../infrastructure/repositories/UserRepository");
const router = express_1.default.Router();
const userRepository = new UserRepository_1.UserRepository();
const userUseCase = new UserUseCase_1.UserUseCase(userRepository);
router.post('/create', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body;
        const createdUser = yield userUseCase.createUser(user);
        res.status(201).json(createdUser);
    }
    catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}));
// Define otras rutas y controladores para usuarios
exports.default = router;
