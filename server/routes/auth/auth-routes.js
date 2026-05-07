let express = require('express')
const { registerUser, loginUser, logout, authMiddleWare } = require('../../controllers/auth/auth-controller')

let router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.post('/logout', logout)
router.get('/check-auth', authMiddleWare, (req, res)=>{
    let user = req.user
    res.status(200).json({
        success: true,
        user: user,
        message: 'user is Authenticated'
    })
})

module.exports = router