import mongoose from "mongoose";

const ChatSchema = new mongoose.Schema(
    {
        text: {
          type: String,
          required: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Chat", ChatSchema);