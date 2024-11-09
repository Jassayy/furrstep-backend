import { Router } from "express";
import { createGoal, getAllGoals ,updateStatus , deleteGoal} from "../controllers/goal.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/create-goal/:petId").post(authenticate, createGoal); //! http://localhost:3000/api/v1/goals/create-goal/:petId
router.route("/all-goals/:petId").get(authenticate, getAllGoals); //! http://localhost:3000/api/v1/goals/all-goals/:petId
router.route("/update-status/:goalId").patch(authenticate, updateStatus); //! http://localhost:3000/api/v1/goals/update-status/:goalId
router.route("/delete-goal/:goalId").delete(authenticate, deleteGoal); //! http://localhost:3000/api/v1/goals/delete-goal/:goalId

export default router;
