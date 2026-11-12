/**
 * @module models/board
 * @description Modelo de tablón.
 */
import { Sequelize } from 'sequelize';
import {sequelize } from '../db/sequelize.js';

/**
 * Tablón (tabla `boards`): `id` y `name`, único.
 */
export const Board = sequelize.define('Board', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
}, {
    tableName: 'boards',
})