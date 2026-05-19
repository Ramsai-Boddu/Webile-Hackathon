import express from "express";
import {createSip, getFunds,getSips, investFund, stopSip} from "../controllers/mfController";

const router = express.Router();

router.get("/funds/:customerRef",getFunds);
router.get("/sips/:customerRef",getSips);
router.post("/invest",investFund);
router.post("/sip",createSip);
router.patch("/sip/:id/stop",stopSip);

export default router;