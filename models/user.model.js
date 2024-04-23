import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        require: [true, "Please add the user name"]
    },
    email: {
        type: String,
        require: [true, "Please add the user email address"],
        unique: [true, "Email address is already taken"]
    },
    password: {
        type: String,
        require: [true, "Please add the user password"]
    }
}, { timestamps: true })

export const User = mongoose.model("User", userSchema)