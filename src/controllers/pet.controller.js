import { Pet } from "../models/pet.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const createPet = asyncHandler(async (req, res) => {
     try {
          const { name, age, species, breed, weight, isVaccinated } = req.body;
          const owner = req.user?._id;

          if (!owner) {
               throw new ApiError(401, "Unauthorized request");
          }

          const pet = await Pet.create({
               name,
               age,
               species,
               breed,
               weight,
               isVaccinated,
               owner: owner,
          });

          if (!pet) {
               throw new ApiError(500, "Error creating pet");
          }

          return res
               .status(201)
               .json(new ApiResponse(201, pet, "Pet created successfully"));
     } catch (error) {
          throw new ApiError(500, "Failed to create pet");
     }
});

const getAllPets = asyncHandler(async (req, res) => {
     try {
          const owner = req.user?._id;
          if (!owner) {
               throw new ApiError(401, "Unauthorized request");
          }
          const pets = await Pet.find({ owner });
          return res
               .status(200)
               .json(new ApiResponse(200, pets, "Pets fetched successfully"));
     } catch (error) {
          throw new ApiError(500, "Error fetching pets");
     }
});

const getPet = asyncHandler(async (req, res) => {
     try {
          const { petId } = req.params;
          const pet = await Pet.findById(petId);
          return res
               .status(200)
               .json(new ApiResponse(200, pet, "Pet fetched successfully"));
     } catch (error) {
          throw new ApiError(500, "Error fetching pet");
     }
});

const deletePet = asyncHandler(async (req, res) => {
     try {
          const { petId } = req.params;
          const pet = await Pet.findByIdAndDelete(petId);
          return res
               .status(200)
               .json(new ApiResponse(200, pet, "Pet deleted successfully"));
     } catch (error) {
          throw new ApiError(500, "Error deleting pet");
     }
});

const updatePet = asyncHandler(async (req, res) => {
     try {
          const { petId } = req.params;
          const { name, age, species, breed, weight, isVaccinated } = req.body;
          const pet = await Pet.findByIdAndUpdate(petId, {
               name,
               age,
               species,
               breed,
               weight,
               isVaccinated,
          });

          if (!pet) {
               throw new ApiError(404, "Pet not found");
          }

          return res
               .status(200)
               .json(new ApiResponse(200, pet, "Pet updated successfully"));
     } catch (error) {
          throw new ApiError(500, "Error updating pet");
     }
});

export { createPet, getAllPets, getPet, deletePet, updatePet };
