import { Router } from "express";
import { AUTH_ROUTES } from "../../constants/routes";
import validate from "../../middleware/validate.middleware";
import { registerSchema } from "./register.validation";
import RegisterController from "./register.controller";

const registerRoutes = Router();

registerRoutes.post(
  AUTH_ROUTES.REGISTER,
  validate(registerSchema),
  RegisterController.register
);
export default registerRoutes;
