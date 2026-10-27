export const isAuthenticated = (req, res, next) => {
    if (req.session.userId) {
        return next();
    }
    res.status(401).render("unauthorized.njk", { title: "Unauthorized" });
}