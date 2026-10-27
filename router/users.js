import { User } from '../models/user.js';
import express from 'express';
import bcrypt from 'bcrypt';

const router = express.Router();

// Lista de usuarios sin exponer el hash de la contraseña
router.get('/', async (req, res) => {
    try {
        const users = await User.findAll({ attributes: ['id', 'name', 'createdAt'] });
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ error: "No se pudieron obtener los usuarios." });
    }
});

// Registro: desde el formulario redirige al login, desde la API devuelve JSON
router.post('/', async (req, res) => {
    const { name, password } = req.body;
    const desdeFormulario = req.is('application/x-www-form-urlencoded');

    if (!name || !password) {
        return desdeFormulario
            ? res.status(400).render('register', { title: "Register", error: "Rellena usuario y contraseña." })
            : res.status(400).json({ error: "Faltan name o password." });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, password: hashedPassword });

        if (desdeFormulario) {
            return res.redirect('/login?registered=1');
        }
        res.status(201).json({ id: user.id, name: user.name });
    }
    catch (error) {
        const mensaje = error.name === 'SequelizeUniqueConstraintError'
            ? "Ese nombre de usuario ya existe."
            : "No se pudo crear el usuario.";
        return desdeFormulario
            ? res.status(400).render('register', { title: "Register", error: mensaje })
            : res.status(400).json({ error: mensaje });
    }
});

export default router;
