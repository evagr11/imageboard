/**
 * @module middleware/auth
 * @description Middleware de autenticación.
 */
/**
 * Deja pasar solo si hay un usuario en la sesión; si no, responde 401 con la página «unauthorized».
 * @function isAuthenticated
 * @param {Object} req petición.
 * @param {Object} res respuesta.
 * @param {Function} next siguiente middleware.
 */
export const isAuthenticated = (req, res, next) => {
    if (req.session.userId) {
        return next();
    }
    res.status(401).render("unauthorized.njk", { title: "Unauthorized" });
}