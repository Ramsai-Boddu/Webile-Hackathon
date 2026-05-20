import express from "express";
import authMiddleware from "../middleware/authMiddleware";
import roleMiddleware from "../middleware/roleMiddleware";
import { addProperty, deleteProperty, getProperties, getPropertyHistory, updatePropertyValuation } from "../controllers/realEstateController";
const router = express.Router();

router.post(
    "/property",
    authMiddleware,
    addProperty
);

router.get(
    "/property/:investorId",
    authMiddleware,
    getProperties
);

router.post(
    "/property/:propertyId/valuation",
    authMiddleware,
    roleMiddleware(["ADMIN"]),
    updatePropertyValuation
);

router.get(
    "/property/history/:propertyId",
    authMiddleware,
    getPropertyHistory
);

router.delete(
    "/property/:propertyId",
    authMiddleware,
    roleMiddleware(["ADMIN"]),
    deleteProperty
);

export default router;