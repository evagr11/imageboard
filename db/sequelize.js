/**
 * @module db/sequelize
 * @description Conexión de Sequelize a la base de datos SQLite `db/database.sqlite`.
 */
import { Sequelize } from "sequelize";

//Con export hacemos que la variable sequelize sea exportable
/**
 * Instancia de Sequelize que usan todos los modelos.
 * @type {Sequelize}
 */
export const sequelize = new Sequelize({
    dialect: "sqlite", // Que tipo de base de datos estamos usando
    storage: "db/database.sqlite", // Donde se va a guardar la base de datos
    logging: false, // Desactiva los logs de SQL
})

