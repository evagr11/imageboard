/**
 * @module models/auth
 * @description Comprobación de usuario y contraseña.
 */
import { User } from '../models/user.js';
import bcrypt from 'bcrypt';

/**
 * Compara una contraseña con su hash.
 * @async
 * @param {string} password contraseña escrita.
 * @param {string} hashedPassword hash guardado.
 * @returns {Promise<boolean>} `true` si coinciden.
 */
const checkPassword = async (password, hashedPassword) => {
    return await bcrypt.compare(password, hashedPassword);
}

/**
 * Busca el usuario por nombre y comprueba su contraseña.
 * @async
 * @param {string} name nombre de usuario.
 * @param {string} password contraseña.
 * @returns {Promise<?Object>} el usuario, o `null` si no existe o la contraseña no coincide.
 */
export const authenticateUser = async (name, password) => {
    const user = await User.findOne({
        where: {
            name: name
        }
    });
    if (!user) {
        return null;
    }
    const isPasswordValid = await checkPassword(password, user.password);
    if (!isPasswordValid) {
        return null;
    }
    return user;
}