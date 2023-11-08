import { Router } from "express";
import * as UserHandlers from "./request-handlers.js";
const router = Router();

router.route("/register").post(UserHandlers.register)
router.route("/login").post(UserHandlers.login)
export default router;