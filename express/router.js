import { Router } from "express";
import auth from "./middlewares/auth.js";

import * as userHandlers from "./request-handler.js";

const router = Router()

router.route("/register").post(userHandlers.register);
router.route("/login").post(userHandlers.login);
router.route("/profile").get(auth, userHandlers.profile);

router.route("/add-note").post(auth, userHandlers.addNote);

export default router;