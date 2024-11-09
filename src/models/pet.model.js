import mongoose from "mongoose";

const petSchema = new mongoose.Schema(
     {
          name: {
               type: String,
               required: true,
          },
          age: {
               type: Number,
               required: true,
          },
          species: {
               type: String,
               required: true,
          },
          breed: {
               type: String,
               required: true,
          },
          weight: {
               type: Number,
               required: true,
          },
          owner: {
               type: mongoose.Schema.Types.ObjectId,
               ref: "User",
          },
          isVaccinated: {
               type: Boolean,
               default: false,
          },
     },
     { timestamps: true }
);

export const Pet = mongoose.model("Pet", petSchema);
