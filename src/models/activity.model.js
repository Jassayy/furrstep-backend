import mongoose from "mongoose";

const activitySchema = new mongoose.Schema(
     {
          title: {
               type: String,
               required: true,
          },
          description: {
               type: String,
               required: true,
          },
          type: {
               type: String,
               required: true,
          },
          caloriesBurned: {
               type: Number,
               required: true,
          },
          duration: {
               type: Number,
               required: true,
          },
          pet: {
               type: mongoose.Schema.Types.ObjectId,
               ref: "Pet",
               required: true,
          },
     },
     { timestamps: true }
);

export const Activity = mongoose.model("Activity", activitySchema);
