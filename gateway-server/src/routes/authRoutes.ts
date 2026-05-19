import express from "express";

import {login} from "../controllers/authController";
import rateLimiter from "../middleware/rateLimiter";

const router = express.Router();

router.post("/login",rateLimiter,login);

export default router;