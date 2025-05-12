import { Sequelize } from 'sequelize';
import { sequelize } from '../db/sequelize.js';

export const Post = sequelize.define('Post', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    content: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    image: {
        type: Sequelize.STRING,
        allowNull: true,
    },
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'users', 
            key: 'id', 
        }
    },
    boardId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'boards', 
            key: 'id', 
        }
    },
}, {
    tableName: "posts",
});