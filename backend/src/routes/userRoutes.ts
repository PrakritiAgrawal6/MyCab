import { Router } from "express";
import { authenticateJWT } from "../middlewares/userjwtMware";
import { UserController } from "../controllers/userController";

const userRoutes = Router();

// Public routes
userRoutes.post("/login", UserController.loginUser);
userRoutes.post("/register", UserController.saveUser);
userRoutes.get('/', UserController.getUser)

// Protected routes - JWT required
userRoutes.get("/", authenticateJWT, UserController.getUser);
userRoutes.put("/:id", authenticateJWT, UserController.updateUser);
export default userRoutes;