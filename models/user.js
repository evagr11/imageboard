/**
 * @module models/user
 * @description Modelo de usuario.
 */
import { Sequelize } from 'sequelize';
import { sequelize } from '../db/sequelize.js';

/**
 * Usuario (tabla `users`): `name`, único, y `password`, guardada como hash de bcrypt.
 */
export const User = sequelize.define('User', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
    },
}, {
    tableName: "users",
});