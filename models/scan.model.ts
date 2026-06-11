import mongoose, { Schema } from "mongoose";

const scanSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    resumeText: {
        type: String,
        required: true,
    },

    jdText: {
        type: String,
        required: true,
    },
    matchScore: {
        type: Number,
        required: false
    },
    status: {
        type: String,
        enum: ["pending", "completed", "failed"],
        default: "pending",
        required: true
    },
    scanId: {
        type: String,
        required: true,
    },
    analysis: {
        type: Schema.Types.Mixed
    }

},
    {
        timestamps: true
    }
)

export const Scan = mongoose.models.Scan || mongoose.model("Scan", scanSchema);