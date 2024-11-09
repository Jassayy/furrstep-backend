import { Goal } from "../models/goals.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createGoal = asyncHandler(async (req, res) => {
     try {
          const { petId } = req.params;
          const {
               title,
               weightToAchieve,
               caloriesToBeBurned,
               targetDate,
               status,
          } = req.body;

          const goal = await Goal.create({
               pet: petId,
               title,
               weightToAchieve,
               caloriesToBeBurned,
               targetDate,
               status,
          });

          if (!goal) {
               throw new ApiError(401, "Unauthorized request");
          }

          return res
               .status(201)
               .json(new ApiResponse(201, goal, "Goal created successfully"));
     } catch (error) {
          console.error("Goal creation error:", error);
          throw new ApiError(500, `Error creating goal: ${error.message}`);
     }
});

const getAllGoals = asyncHandler(async (req, res) => {
     try {
          const { petId } = req.params;

          const goals = await Goal.find({ pet: petId });

          return res
               .status(200)
               .json(new ApiResponse(200, goals, "Goals fetched successfully"));
     } catch (error) {
          throw new ApiError(500, "Error fetching all goals");
     }
});

const updateStatus = asyncHandler(async (req, res) => {
     try {
          const { goalId } = req.params;
          const { status } = req.body;

          const goal = await Goal.findByIdAndUpdate(
               goalId,
               { status },
               { new: true }
          );

          if (!goal) {
               throw new ApiError(404, "Goal not found");
          }

          return res
               .status(200)
               .json(new ApiResponse(200, goal, "Status updated successfully"));
     } catch (error) {
          throw new ApiError(500, "Error updating status");
     }
});

const deleteGoal = asyncHandler(async (req, res) => {
     try {
          const { goalId } = req.params;

          const goal = await Goal.findByIdAndDelete(goalId);

          return res
               .status(200)
               .json(new ApiResponse(200, goal, "Goal deleted successfully"));
     } catch (error) {
          throw new ApiError(500, "Error deleting goal");
     }
});

export { createGoal, getAllGoals, updateStatus, deleteGoal };
