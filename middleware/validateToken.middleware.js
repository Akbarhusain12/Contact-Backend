import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    const authHeader = req.headers.authorization
    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1]
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                res.status(401)
                throw new Error("User is not authorized")
            }
            // console.log(decoded)
            req.user = {
                username: decoded.username,
                email: decoded.email,
                id: decoded.id,
            };
            next();
        })
        if (!token) {
            res.status(401)
            throw new Error("token is missing")
        }
    }
    else {
        res.status(401);
        throw new Error("Authorization header is missing or invalid");
    }
})

export default validateToken