import express from 'express';
import nunjucks from 'nunjucks';
import session from 'express-session';
import SQLitestore from 'connect-sqlite3';
import userRouter from './router/users.js';
import pagesRouter from './router/pages.js';
import authRoutes from './router/auth.js';
import boardsRouter from './router/boards.js';
import { loggerBasic } from './middleware/log.js';
import { sequelize } from './db/sequelize.js';

const app = express();

const port = process.env.PORT || 3000;
const SQLiteStoreSession = SQLitestore(session);

const sessionStore = new SQLiteStoreSession({
  db: 'sessions.sqlite',
  dir: './db',
  table: 'sessions',
});

const sessionConfig = {
  store: sessionStore,
  // En producción define SESSION_SECRET como variable de entorno
  secret: process.env.SESSION_SECRET || "cambia-este-secreto",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  }
};

app.use(loggerBasic);
app.use(session(sessionConfig));

const env = nunjucks.configure('views', {
  autoescape: true,
  express: app
});

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Deja el usuario de la sesión disponible en todas las plantillas
app.use((req, res, next) => {
  res.locals.currentUser = req.session.username;
  next();
});

app.set('view engine', 'njk');

app.use("/users", userRouter);
app.use("/boards", boardsRouter);
app.use("/", pagesRouter);
app.use("/", authRoutes);

app.get('/', (req, res) => {
  res.redirect('/boards');
});


const initializeApp = async () => {
  try {
    console.log("Setting up associations...");
    await import('./db/associations.js');
    console.log("Associations set up.");

    console.log("Initializing database...");
    await sequelize.sync({ force: true });
    console.log("Database initialized.");

    console.log("Populating database...");
    await import('./db/populate.js');
    console.log("Database populated.");

    app.listen(port, () => {
      console.log(`Server listening at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Error during initialization:", error);
  }
};

initializeApp();
