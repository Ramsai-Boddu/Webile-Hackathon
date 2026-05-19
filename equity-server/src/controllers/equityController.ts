import {Request,Response} from "express";
import pool from "../config/db";

export const getStocks = async (req: Request,res: Response): Promise<void> => {
    try {
        const {investorId} = req.params;
        const investorQuery = `
            SELECT *
            FROM equity_users
            WHERE investor_id = $1
        `;
        const investorResult =
            await pool.query(
                investorQuery,
                [investorId]
            );
        if (investorResult.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "Investor not found"
            });
            return;
        }
        const holdingsQuery = `
            SELECT *
            FROM equity_holdings
            WHERE investor_id = $1
        `;
        const holdingsResult =
            await pool.query(
                holdingsQuery,
                [investorId]
            );
        res.status(200).json({
            success: true,
            investor:investorResult.rows[0],
            holdings:holdingsResult.rows
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch holdings"
        });
    }
};

export const getTransactions = async (req: Request,res: Response): Promise<void> => {

    try {
        const {investorId} = req.params;
        const investorQuery = `
            SELECT *
            FROM equity_users
            WHERE investor_id = $1
        `;

        const investorResult =
            await pool.query(
                investorQuery,
                [investorId]
            );

        if (investorResult.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "Investor not found"
            });
            return;
        }
        const transactionQuery = `
            SELECT *
            FROM equity_transactions
            WHERE investor_id = $1

            ORDER BY executed_at DESC
        `;

        const transactionResult =
            await pool.query(
                transactionQuery,
                [investorId]
            );
        res.status(200).json({
            success: true,
            investor:investorResult.rows[0],
            transactions:transactionResult.rows
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch transactions"
        });
    }
};

export const buyStock = async (req: Request,res: Response): Promise<void> => {
    try {

        const {
            investorId,
            stockSymbol,
            quantity,
            price,
            exchange
        } = req.body;

        const investorQuery = `
            SELECT *
            FROM equity_users
            WHERE investor_id = $1
        `;

        const investorResult = await pool.query(
            investorQuery,
            [investorId]
        );

        if (investorResult.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "Investor not found"
            });
            return;
        }

        const existingHoldingQuery = `
            SELECT *
            FROM equity_holdings
            WHERE investor_id = $1
            AND stock_symbol = $2
        `;

        const existingHoldingResult = await pool.query(
            existingHoldingQuery,
            [investorId, stockSymbol]
        );

        if (existingHoldingResult.rows.length > 0) {

            const holding =
                existingHoldingResult.rows[0];

            const newQuantity =
                Number(holding.quantity) +
                Number(quantity);

            await pool.query(
                `
                UPDATE equity_holdings
                SET quantity = $1,
                    current_market_price = $2,
                    updated_at = NOW()
                WHERE id = $3
                `,
                [
                    newQuantity,
                    price,
                    holding.id
                ]
            );

        } else {

            await pool.query(
                `
                INSERT INTO equity_holdings(
                    investor_id,
                    stock_symbol,
                    quantity,
                    avg_buy_price,
                    current_market_price,
                    exchange
                )
                VALUES($1,$2,$3,$4,$5,$6)
                `,
                [
                    investorId,
                    stockSymbol,
                    quantity,
                    price,
                    price,
                    exchange
                ]
            );
        }

        await pool.query(
            `
            INSERT INTO equity_transactions(
                investor_id,
                stock_symbol,
                transaction_type,
                quantity,
                price,
                realized_gain,
                executed_at
            )
            VALUES($1,$2,$3,$4,$5,$6,NOW())
            `,
            [
                investorId,
                stockSymbol,
                "BUY",
                quantity,
                price,
                0
            ]
        );

        res.status(201).json({
            success: true,
            message: "Stock purchased successfully"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Stock purchase failed"
        });
    }
};

export const sellStock = async (req: Request,res: Response): Promise<void> => {
    try {

        const {
            investorId,
            stockSymbol,
            quantity,
            sellPrice
        } = req.body;

        const holdingQuery = `
            SELECT *
            FROM equity_holdings
            WHERE investor_id = $1
            AND stock_symbol = $2
        `;

        const holdingResult = await pool.query(
            holdingQuery,
            [investorId, stockSymbol]
        );

        if (holdingResult.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "Holding not found"
            });
            return;
        }

        const holding =
            holdingResult.rows[0];

        if (
            Number(quantity) >
            Number(holding.quantity)
        ) {
            res.status(400).json({
                success: false,
                message: "Insufficient quantity"
            });
            return;
        }

        const remainingQuantity =
            Number(holding.quantity) -
            Number(quantity);

        const realizedGain =
            (
                Number(sellPrice) -
                Number(holding.avg_buy_price)
            ) * Number(quantity);

        if (remainingQuantity === 0) {

            await pool.query(
                `
                DELETE FROM equity_holdings
                WHERE id = $1
                `,
                [holding.id]
            );

        } else {

            await pool.query(
                `
                UPDATE equity_holdings
                SET quantity = $1,
                    current_market_price = $2,
                    updated_at = NOW()
                WHERE id = $3
                `,
                [
                    remainingQuantity,
                    sellPrice,
                    holding.id
                ]
            );
        }

        await pool.query(
            `
            INSERT INTO equity_transactions(
                investor_id,
                stock_symbol,
                transaction_type,
                quantity,
                price,
                realized_gain,
                executed_at
            )
            VALUES($1,$2,$3,$4,$5,$6,NOW())
            `,
            [
                investorId,
                stockSymbol,
                "SELL",
                quantity,
                sellPrice,
                realizedGain
            ]
        );

        res.status(200).json({
            success: true,
            realizedGain,
            message: "Stock sold successfully"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Stock sell failed"
        });
    }
};