import { Activity } from "../models/activity.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createActivity = asyncHandler(async (req, res) => {
     try {
          const { petId } = req.params;
          const { title, description, type, caloriesBurned, duration } =
               req.body;

          const activity = await Activity.create({
               pet: petId,
               title,
               duration,
               caloriesBurned,
               description,
               type,
          });

          if (!activity) {
               throw new ApiError("500", "Error creating activity");
          }

          return res
               .status(201)
               .json(
                    new ApiResponse(
                         201,
                         activity,
                         "Activity created successfully"
                    )
               );
     } catch (error) {
          throw new ApiError(500, "Error creating activity");
     }
});

const getAllActivities = asyncHandler(async (req, res) => {
     try {
          const { petId } = req.params;

          const activities = await Activity.find({ pet: petId });

          if (!activities) {
               throw new ApiError(404, "Activities not found");
          }

          return res
               .status(200)
               .json(
                    new ApiResponse(
                         200,
                         activities,
                         "Activities fetched successfully"
                    )
               );
     } catch (error) {
          throw new ApiError(500, "Error fetching activities");
     }
});

const deleteActivity = asyncHandler(async (req, res) => {
     try {
          const { activityId } = req.params;

          const activity = await Activity.findByIdAndDelete(activityId);

          if (!activity) {
               throw new ApiError(404, "Activity not found");
          }

          return res
               .status(200)
               .json(
                    new ApiResponse(
                         200,
                         activity,
                         "Activity deleted successfully"
                    )
               );
     } catch (error) {
          throw new ApiError(500, "Error deleting activity");
     }
});
export { createActivity, getAllActivities, deleteActivity };
