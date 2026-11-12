/**
 * @module router/auth
 * @description Rutas de inicio y cierre de sesión.
 */
import express from 'express';
import { authenticateUser } from '../models/auth.js';

const router = express.Router();

/**
 * Comprueba usuario y contraseña; si son correctos guarda el usuario en la sesión y lleva al perfil, y si no, vuelve al login con un error.
 *
 * @name POST /login
 * @function
 * @memberof module:router/auth
 */
router.post('/login', async (req, res) => {
    try {
        const { name, password } = req.body;
        const user = await authenticateUser(name, password);
        if (!user) {
            return res.redirect('/login?error=1');
        }
        req.session.userId = user.id;
        req.session.username = user.name;
        res.redirect("/profile");
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred during login." });
    }
});

/**
 * Cierra la sesión y vuelve al login.
 *
 * @name POST /logout
 * @function
 * @memberof module:router/auth
 */
router.post('/logout', (req, res) => {
    req.session.destroy((error) => {
        if (error) {
            return res.status(500).send(error);
        }
        res.redirect('/login');
    });
});

export default router;
