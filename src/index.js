import { app } from "./app.js";
import connectDB from "./Database/db.js";
import dotenv from "dotenv";

dotenv.config({ path: "./env" });

// TODO : Connect to database

connectDB()
     .then(() => {
          app.listen(process.env.PORT || 4000, () => {
               console.log(`Server is running on port ${process.env.PORT}`);
          });
     })
     .catch((error) => {
          console.log("Error connecting to database : ", error);
     });
