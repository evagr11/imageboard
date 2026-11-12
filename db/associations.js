/**
 * @module db/associations
 * @description Relaciones entre modelos: un usuario y un tablón tienen muchos posts, y cada post pertenece a un usuario y a un tablón.
 */
import { User } from '../models/user.js';
import { Board } from '../models/board.js';
import { Post } from '../models/post.js';

User.hasMany(Post, { foreignKey: 'userId', as: 'posts' });
Post.belongsTo(User, { foreignKey: 'userId', as: 'user' });

Board.hasMany(Post, { foreignKey: 'boardId', as: 'posts' });
Post.belongsTo(Board, { foreignKey: 'boardId', as: 'board' });