"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserEntity = void 0;
// src/domain/entities/User.ts
const uuid_1 = require("uuid");
class UserEntity {
    constructor(username, email, password) {
        this.id = (0, uuid_1.v4)(); // Genera un nuevo UUID para cada instancia de usuario
        this.username = username;
        this.email = email;
        this.password = password;
    }
}
exports.UserEntity = UserEntity;
