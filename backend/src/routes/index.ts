import { Router } from "express";
import loginRoutes from "../features/login/login.route";
import registerRoutes from "../features/register/register.route";
import verificationRoutes from "../features/verification/verification.route";

const routes = Router();

routes.use("/auth", loginRoutes);
routes.use("/auth", registerRoutes);
routes.use("/verification", verificationRoutes);
export default routes;
