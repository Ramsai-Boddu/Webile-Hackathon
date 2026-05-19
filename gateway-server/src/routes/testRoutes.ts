import express from "express";

import authMiddleware from "../middleware/authMiddleware";

const router = express.Router();

router.get("/profile",authMiddleware,
    (req, res) => {
        res.json({
            success: true,
            user: req.user
        });
    }
);

export default router;