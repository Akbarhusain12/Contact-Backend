import express from 'express'
import {
    registerUser,
    loginUser,
    currentUser
} from '../controllers/user.controller.js'
import validateToken from '../middleware/validateToken.middleware.js'
const router = express.Router()

router.post("/register", registerUser)
router.post("/login", loginUser)
router.get("/current", validateToken, currentUser)

export default router