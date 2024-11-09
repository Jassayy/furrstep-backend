import { Router } from "express";
import { createActivity , getAllActivities , deleteActivity} from "../controllers/activity.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/create-activity/:petId").post(authenticate, createActivity); //!http://localhost:3000/api/v1/activities/create-activity/:petId

router.route("/get-all-activities/:petId").get(authenticate, getAllActivities); //!http://localhost:3000/api/v1/activities/get-all-activities/:petId

router.route("/delete-activity/:activityId").delete(authenticate, deleteActivity); //!http://localhost:3000/api/v1/activities/delete-activity/:activityId




export default router;
