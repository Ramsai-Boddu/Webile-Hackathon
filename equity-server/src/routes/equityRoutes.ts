import express from "express";

import {buyStock, getStocks, getTransactions, sellStock} from "../controllers/equityController";

const router = express.Router();

router.get("/stocks/:investorId",getStocks);
router.get("/transactions/:investorId",getTransactions);
router.post("/buy",buyStock);
router.post("/sell",sellStock);

export default router;