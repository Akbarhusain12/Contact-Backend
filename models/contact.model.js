import mongoose, { Schema } from "mongoose";

const contactSchema = new Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref:"User"
    },
    name: {
        type: String,
        require: [true, "Please add the contact name"]
    },
    email: {
        type: String,
        require: [true, "Please add the contact email address"]
    },
    phone: {
        type: String,
        require: [true, "Please add the contact phone number"]
    }
}, {
    timestamps: true
});

export const Contact = mongoose.model("Contact", contactSchema)