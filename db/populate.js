/**
 * @module db/populate
 * @description Datos de prueba: tres usuarios (contraseña: nombre + "pass"), tres tablones y tres posts en «general».
 */
import { User } from "../models/user.js";
import { Board } from "../models/board.js";
import { Post } from "../models/post.js";
import bcrypt from "bcrypt";

/**
 * Crea los usuarios admin, user1 y user2 con la contraseña cifrada con bcrypt.
 * @async
 * @function populateUsers
 * @memberof module:db/populate
 */
const populateUsers = async () => {
    const users = ["admin", "user1", "user2"]
    for (const user of users) {
        const hashedPassword = await bcrypt.hash(user+"pass", 10);
        
        await User.create({
            name: user,
            password: hashedPassword
        })
    }
}

/**
 * Crea los tablones general, videojuegos y testing.
 * @async
 * @function populateBoards
 * @memberof module:db/populate
 */
const populateBoards = async () => {
    const boards = ["general", "videojuegos", "testing"]
    for (const board of boards) {
        await Board.create({
            name: board
        })
    }
}

/**
 * Crea tres posts del usuario 1 en el tablón 1.
 * @async
 * @function populatePosts
 * @memberof module:db/populate
 */
const populatePosts = async () => {
    const mensajes = ["hola mundo", "como estan?", "todo bien?"]
    for(const mensaje of mensajes) {
        await Post.create({
            title: mensaje,
            content: mensaje,
            image: null,
            userId: 1,
            boardId: 1
        })
    }
}

try{
    await populateUsers()
    await populateBoards()
    await populatePosts()
} catch(error) {
    console.error("Error al crear los datos de prueba", error)
} finally {
    console.log("Datos de prueba creados")
    // process.exit(0)
}