/**
 * @module router/pages
 * @description Páginas de registro, login y perfil.
 */
import express from 'express';
import { isAuthenticated } from '../middleware/auth.js';

const router = express.Router();

/**
 * Formulario de registro.
 *
 * @name GET /register
 * @function
 * @memberof module:router/pages
 */
router.get('/register', async (req, res) => {
    res.render('register', {
        title: "Register",
        desc: "Create a new user"
    });
});

/**
 * Formulario de login, con avisos de error o de registro correcto.
 *
 * @name GET /login
 * @function
 * @memberof module:router/pages
 */
router.get('/login', async (req, res) => {
    res.render('login', {
        title: "Login",
        desc: "Login to your account",
        error: req.query.error ? "Usuario o contraseña incorrectos." : null,
        registered: !!req.query.registered
    });
});

/**
 * Perfil del usuario (hay que haber iniciado sesión).
 *
 * @name GET /profile
 * @function
 * @memberof module:router/pages
 */
router.get('/profile', isAuthenticated, (req, res) => {
    res.render('profile', {
        title: "Profile",
        desc: "Your profile page",
        user: req.session.username
    });
});

export default router;