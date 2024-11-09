import mongoose from "mongoose";

const goalSchema = new mongoose.Schema(
     {
          pet: {
               type: mongoose.Schema.Types.ObjectId,
               ref: "Pet",
               required: true,
          },
          title: {
               type: String,
               required: true,
          },
          weightToAchieve: {
               type: Number,
               required: true,
          },
          caloriesToBeBurned: {
               type: Number,
               required: true,
          },
          status: {
               type: String,
               enum: ["active", "completed", "failed"],
               default: "active",
          },
          targetDate: {
               type: String,
               required: true,
          },
     },
     { timestamps: true }
);

export const Goal = mongoose.model("Goal", goalSchema);
