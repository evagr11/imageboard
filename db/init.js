/**
 * @module db/init
 * @description Script que borra y vuelve a crear todas las tablas.
 */
import { sequelize } from "./sequelize.js";
import { User } from "../models/user.js";
import { Board } from "../models/board.js";
import { Post } from "../models/post.js";

/**
 * Sincroniza los modelos con la base de datos, borrando las tablas que había.
 * @async
 * @function initDB
 * @memberof module:db/init
 */
const initDB = async () => {
    try {
        await sequelize.sync({ force: true });
    } catch (error) {
        console.error("Error initializing the database:", error);
    }
};

initDB();