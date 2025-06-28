import { Router } from "express";
import { AUTH_ROUTES } from "../../constants/routes";
import validate from "../../middleware/validate.middleware";
import { registerSchema } from "./register.validation";

const registerRoutes = Router();

registerRoutes.post(AUTH_ROUTES.REGISTER, validate(registerSchema));
export default registerRoutes;
