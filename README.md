<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0%3A2E1065%2C50%3A7C3AED%2C100%3ADDD6FE&height=200&section=header&text=Imageboard&fontSize=60&fontColor=fff&fontAlignY=38&desc=Tablones+y+publicaciones+con+Node.js+y+Express&descAlignY=62&descSize=18" width="100%"/>
</div>

<div align="center">
  <a href="https://github.com/evagr11/imageboard" target="_blank"><img src="https://img.shields.io/badge/Ver_Código-2E1065?style=for-the-badge&logo=github&logoColor=white" alt="Ver Código"></a>
</div>

<div align="center">
  <a href="https://git.io/typing-svg"><img src="https://readme-typing-svg.demolab.com/?font=JetBrains+Mono&size=18&duration=3500&pause=800&color=8B5CF6&center=true&vCenter=true&width=600&lines=Backend+con+Node.js+y+Express%3BTablones+y+publicaciones%3BRegistro+y+login+con+bcrypt%3BSesiones+guardadas+en+SQLite" alt="Typing SVG" /></a>
</div>

# 🚀 Sobre el Proyecto

**Imageboard** es una aplicación web al estilo de los foros por tablones: hay varios tablones temáticos (`/general/`, `/videojuegos/`...) y dentro de cada uno los usuarios publican mensajes. Cualquiera puede leer, pero para publicar o crear tablones hay que registrarse e iniciar sesión.

El servidor está hecho con **Express** y renderiza las páginas en el servidor con **Nunjucks**. Los datos se guardan en **SQLite** a través del ORM **Sequelize**, y las sesiones de los usuarios en otra base de datos SQLite aparte.

✨ **Características principales:**

*   🗂️ **Tablones:** Lista de tablones ordenada por nombre y página propia para cada uno con sus publicaciones, de la más nueva a la más antigua y con el nombre de su autor.
*   📝 **Publicaciones:** Formulario de título y contenido dentro de cada tablón, disponible solo con la sesión iniciada.
*   👤 **Registro e inicio de sesión:** Las contraseñas se guardan hasheadas con `bcrypt` y nunca se devuelven en ninguna respuesta. Si el nombre ya existe o el login falla, se muestra un aviso en el formulario.
*   🍪 **Sesiones persistentes:** `express-session` con `connect-sqlite3`, así que la sesión se mantiene aunque se reinicie el servidor (dura un día).
*   🔒 **Rutas protegidas:** Un middleware `isAuthenticated` protege el perfil, la creación de tablones y la de publicaciones.
*   🔗 **Relaciones con Sequelize:** Un usuario tiene muchas publicaciones y un tablón tiene muchas publicaciones (`hasMany` / `belongsTo`).
*   🌱 **Datos de prueba:** Al arrancar se crean usuarios, tablones y mensajes de ejemplo.
*   📋 **Logs de peticiones:** `morgan` registra cada petición en la consola; también hay un logger personalizado con colores usando `chalk`.

# 🧠 Contexto del Proyecto

Este proyecto se desarrolló durante el segundo curso del ciclo formativo de **Desarrollo de Aplicaciones Multiplataforma (DAM)** para practicar el desarrollo backend con **Node.js**: rutas y middlewares con Express, un ORM sobre una base de datos relacional, plantillas en el servidor y los conceptos de **validación, autenticación, autorización y sesión**.

En el repositorio también están mis apuntes de clase:

- 📒 [`apuntes.md`](apuntes.md): conceptos de autenticación, flujo de login y buenas prácticas de seguridad.
- 🔗 [`referencias.md`](referencias.md): enlaces a la documentación de Express y Sequelize.

# 🛠️ Stack Tecnológico

<div align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express">
  <img src="https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white" alt="Sequelize">
  <img src="https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white" alt="SQLite">
  <img src="https://img.shields.io/badge/Nunjucks-1C4913?style=for-the-badge&logo=nunjucks&logoColor=white" alt="Nunjucks">
  <img src="https://img.shields.io/badge/Status-En_desarrollo-8B5CF6?style=for-the-badge" alt="Status En desarrollo">
</div>

<br>

<div align="center">

| Componente | Tecnología |
| :--------- | :--------- |
| **Entorno** | `Node.js` con módulos ESM (`import` / `export`) |
| **Servidor** | `Express 5` con routers separados por recurso |
| **Base de datos** | `SQLite` con el ORM `Sequelize` |
| **Plantillas** | `Nunjucks` con `autoescape` activado contra XSS |
| **Seguridad** | `bcrypt` para las contraseñas y `express-session` + `connect-sqlite3` para las sesiones |
| **Logs** | `morgan` y `chalk` |
| **Desarrollo** | `nodemon` para reiniciar el servidor al guardar |

</div>

# 📂 Estructura del Proyecto

```bash
imageboard/
├── index.js                # Configura Express, sesiones y Nunjucks; arranca la BD y el servidor
├── db/
│   ├── sequelize.js        # Conexión a db/database.sqlite
│   ├── associations.js     # Relaciones User-Post y Board-Post
│   ├── populate.js         # Datos de prueba
│   └── init.js             # Script para recrear las tablas a mano
├── models/
│   ├── user.js             # Usuario (nombre único y contraseña hasheada)
│   ├── board.js            # Tablón
│   ├── post.js             # Publicación (título, contenido, autor y tablón)
│   └── auth.js             # Comprueba las credenciales con bcrypt
├── router/
│   ├── boards.js           # /boards y /boards/:id/posts
│   ├── users.js            # /users (registro y lista sin contraseñas)
│   ├── auth.js             # /login y /logout
│   └── pages.js            # /register, /login y /profile
├── middleware/
│   ├── auth.js             # isAuthenticated
│   └── log.js              # Loggers con morgan y chalk
├── views/                  # Plantillas Nunjucks (base, boards, board, login, register...)
├── public/
│   └── styles.css          # Estilos
├── apuntes.md
└── referencias.md
```

### 🌐 Rutas

<div align="center">

| Método | Ruta | Descripción | Sesión |
| :----: | :--- | :---------- | :----: |
| `GET` | `/` | Redirige a `/boards` | ❌ |
| `GET` | `/boards` | Lista de tablones | ❌ |
| `POST` | `/boards` | Crea un tablón | ✅ |
| `GET` | `/boards/:id` | Publicaciones de un tablón | ❌ |
| `POST` | `/boards/:id/posts` | Publica en un tablón | ✅ |
| `GET` | `/register` · `/login` | Formularios | ❌ |
| `POST` | `/users` | Registra un usuario (formulario o JSON) | ❌ |
| `GET` | `/users` | Lista de usuarios en JSON, sin contraseñas | ❌ |
| `POST` | `/login` · `/logout` | Inicia o cierra la sesión | — |
| `GET` | `/profile` | Perfil del usuario | ✅ |

</div>

# 🚀 Cómo Utilizar el Proyecto

Necesitas **Node.js 18** o superior.

1.  **Clona el repositorio:**
    ```bash
    git clone https://github.com/evagr11/imageboard.git
    cd imageboard
    ```
2.  **Instala las dependencias:**
    ```bash
    npm install
    ```
3.  **Arranca el servidor:**
    ```bash
    npm start      # o npm run dev para reiniciar al guardar cambios
    ```
4.  **Abre** [http://localhost:3000](http://localhost:3000) en el navegador.

Puedes entrar con cualquiera de los usuarios de prueba:

<div align="center">

| Usuario | Contraseña |
| :-----: | :--------: |
| `admin` | `adminpass` |
| `user1` | `user1pass` |
| `user2` | `user2pass` |

</div>

> [!NOTE]
> La base de datos se borra y se vuelve a crear con los datos de prueba cada vez que arranca el servidor (`sequelize.sync({ force: true })`), así que lo que publiques se pierde al reiniciar.

> [!TIP]
> El secreto de las sesiones se lee de la variable de entorno `SESSION_SECRET`. Para algo más que pruebas en local, arráncalo así: `SESSION_SECRET="una-frase-larga-y-aleatoria" npm start`

# 🎯 Mejoras futuras

- 🖼️ Subir imágenes a las publicaciones con `multer` (el modelo `Post` ya tiene el campo `image`).
- 💬 Respuestas y comentarios dentro de cada publicación.
- 💾 Dejar de recrear la base de datos en cada arranque y usar migraciones.
- 🛡️ Tokens CSRF en los formularios y límite de intentos de login.
- 🗑️ Que cada usuario pueda borrar sus propias publicaciones.

<br>

<div align="center">
  <p>Creado por <strong>Eva Gallardo</strong></p>
  <a href="https://github.com/evagr11" target="_blank">
    <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub">
  </a>
  <a href="https://www.linkedin.com/in/eva-gallardo-romero-830362349/" target="_blank">
    <img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn">
  </a>
</div>

<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0%3A2E1065%2C50%3A7C3AED%2C100%3ADDD6FE&height=120&section=footer" width="100%"/>
</div>
