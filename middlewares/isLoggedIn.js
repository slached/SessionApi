const loggedIn = async (req, res, next) => {
    if (req.session.isAuthenticated) return res.status(400).json({message: "You have already signed in"})
    else next()
}

const loggedOut = async (req, res, next) => {
    if (!req.session.isAuthenticated) return res.status(400).json({message: "You need to 'log in' first to 'log out'"})
    else next()
}
module.exports = {loggedIn, loggedOut}