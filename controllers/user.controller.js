import asyncHandler from "express-async-handler"
import bcrypt, { compare } from "bcrypt"
import jwt from "jsonwebtoken"
import { User } from "../models/user.model.js"

const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body
    if (!(username && email && password)) {
        res.status(400)
        throw new Error("All fields are required")
    }

    const UserAvailable = await User.findOne({ email })
    if (UserAvailable) {
        res.status(400)
        throw new Error("User already exists");
    }
    //hash password
    const hashedPassword = await bcrypt.hash(password, 10)
    // console.log(hashedPassword)

    const user = await User.create({
        username,
        email,
        password: hashedPassword
    })

    if (user) {
        res.status(201).json({ _id: user.id, email: user.email })
    } else {
        res.status(400)
        throw new Error("User data is not valid")
    }
    res.status(200).json("User registered successfully")
})

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    if (!(email && password)) {
        res.status(400)
        throw new Error("All fields are mandotory")
    }
    const user = await User.findOne({ email })
    // compare password with hash pass
    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            username: user.username,
            email: user.email,
            id: user.id
        },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "5m" })
        res.status(201).json({ accessToken })
    }
    else {
        res.status(401)
        throw new Error("Email and password are not valid");
    }
})

const currentUser = asyncHandler(async (req, res) => {
    res.status(201)
    res.json(req.user);

})


export {
    registerUser,
    loginUser,
    currentUser
}