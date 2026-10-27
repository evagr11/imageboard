import express from 'express';
import { Board } from '../models/board.js';
import { Post } from '../models/post.js';
import { User } from '../models/user.js';
import { isAuthenticated } from '../middleware/auth.js';

const router = express.Router();

// List all boards
router.get('/', async (req, res) => {
    const boards = await Board.findAll({ order: [['name', 'ASC']] });
    res.render('boards', { title: 'Boards', boards });
});

// View a specific board
router.get('/:id', async (req, res) => {
    const board = await Board.findByPk(req.params.id);
    if (!board) {
        return res.status(404).send('Board not found');
    }
    const posts = await Post.findAll({
        where: { boardId: board.id },
        include: { model: User, as: 'user', attributes: ['name'] },
        order: [['createdAt', 'DESC']],
    });
    res.render('board', { title: board.name, board, posts });
});

// Create a new board
router.post('/', isAuthenticated, async (req, res) => {
    const name = (req.body.name || '').trim();
    if (name) {
        // findOrCreate evita que un nombre repetido tire el servidor
        await Board.findOrCreate({ where: { name } });
    }
    res.redirect('/boards');
});

// Create a new post in a specific board
router.post('/:id/posts', isAuthenticated, async (req, res) => {
    const { title, content } = req.body;
    const boardId = req.params.id;

    const board = await Board.findByPk(boardId);
    if (!board) {
        return res.status(404).send('Board not found');
    }

    await Post.create({
        title,
        content,
        boardId,
        userId: req.session.userId, // Associate the post with the logged-in user
    });

    res.redirect(`/boards/${boardId}`);
});

export default router;