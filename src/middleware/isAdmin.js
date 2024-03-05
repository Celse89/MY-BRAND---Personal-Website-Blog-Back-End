export const isAdmin = (req, res, next) => {
    if (req.user &&  req.user.isAdmin) {
        next();
    } else {
        res.status(403).json({
            message: "You are not allowed to delete this account"
        })
    }
}