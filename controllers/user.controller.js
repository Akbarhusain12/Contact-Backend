import asyncHandler from "express-async-handler"

const registerUser = asyncHandler(async (req, res) => {
    res.status(200).json("Register the user")
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