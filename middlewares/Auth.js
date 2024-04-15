const checkSession = async (req, res, next) => {
    if (!req.session.isAuthenticated) {
        await req.session.destroy(() => {
            res.clearCookie('connect.sid')
            return res.status(401).json({message: "You have no authorize to see users."})
        })

    } else next()
}

module.exports = {checkSession}