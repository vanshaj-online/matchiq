import mongoose, { Schema } from "mongoose";

const userSchema: Schema = new Schema({

    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    passwordHash: {
        type: String,
        required: true
    }

},
    {
        timestamps: true
    }

)

export const User = mongoose.models.User || mongoose.model('User', userSchema)