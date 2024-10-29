const AuthController = {
    login: (req, res) => {
        res.send('Post /auth/login')
    },
    register: (req, res) => {
        res.send('Post /auth')
    }
}

export default AuthController;