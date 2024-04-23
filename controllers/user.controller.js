import asyncHandler from "express-async-handler"
import bcrypt from "bcrypt"
import { User } from "../models/user.model.js"

const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body
    if (!(username && email && password)) {
        res.status(400)
        throw new Error("All fields are required")
    }

    const UserAvailable = await User.findOne({email})
    if (UserAvailable) {
        res.status(400)
        throw new Error("User already exists");
    }
    //hash password
    const hashedPassword = await bcrypt.hash(password,10)
    // console.log(hashedPassword)

    const user = await User.create({
        username,
        email,
        password:hashedPassword
    })


    res.status(200).json("User registered successfully")
})

const loginUser = asyncHandler(async (req, res) => {
    res.status(200).json("login user")
})

const currentUser = asyncHandler(async (req, res) => {
    res.status(200).json("Current user information")
})


export {
    registerUser,
    loginUser,
    currentUser
}