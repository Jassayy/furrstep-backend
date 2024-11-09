import { Router } from "express";
import {
     signUp,
     logout,
     login,
     checkAuth,
     getUser,
} from "../controllers/user.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/signup").post(signUp); //! http://localhost:3000/api/v1/users/signup
router.route("/logout").post(logout); //! http://localhost:3000/api/v1/users/logout
router.route("/login").post(login); //! http://localhost:3000/api/v1/users/login
router.route("/check-auth").get(authenticate, checkAuth); //! http://localhost:3000/api/v1/users/check-auth
router.route("/user").get(authenticate, getUser); //! http://localhost:3000/api/v1/users/user

export default router;
