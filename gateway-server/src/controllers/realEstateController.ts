import { Request, Response } from "express";
import pool from "../config/db";

export const addProperty = async (
    req: Request,
    res: Response
): Promise<void> => {

    try {

        const {
            investorId,
            propertyName,
            propertyType,
            address,
            marketValue,
            purchasePrice,
            purchaseDate,
            rentalIncome
        } = req.body;

        const investorResult =
            await pool.query(
                `
                SELECT *
                FROM unified_investors
                WHERE investor_id = $1
                `,
                [investorId]
            );

        if (
            investorResult.rows.length === 0
        ) {

            res.status(404).json({
                success: false,
                message:
                    "Investor not found"
            });

            return;
        }

        const investor =
            investorResult.rows[0];

        const propertyResult =
            await pool.query(
                `
                INSERT INTO properties(
                    investor_pan,
                    property_name,
                    property_type,
                    address,
                    market_value,
                    purchase_price,
                    purchase_date,
                    rental_income
                )
                VALUES($1,$2,$3,$4,$5,$6,$7,$8)
                RETURNING *
                `,
                [
                    investor.pan_number,
                    propertyName,
                    propertyType,
                    address,
                    marketValue,
                    purchasePrice,
                    purchaseDate,
                    rentalIncome
                ]
            );

        const property =
            propertyResult.rows[0];

        await pool.query(
            `
            INSERT INTO property_valuations(
                property_id,
                valuation_amount,
                valuation_date
            )
            VALUES($1,$2,CURRENT_DATE)
            `,
            [
                property.id,
                marketValue
            ]
        );

        res.status(201).json({
            success: true,
            property,
            message:
                "Property added successfully"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message:
                "Failed to add property"
        });
    }
};

export const getProperties = async (
    req: Request,
    res: Response
): Promise<void> => {

    try {

        const { investorId } =
            req.params;

        const investorResult =
            await pool.query(
                `
                SELECT *
                FROM unified_investors
                WHERE investor_id = $1
                `,
                [investorId]
            );

        if (
            investorResult.rows.length === 0
        ) {

            res.status(404).json({
                success: false,
                message:
                    "Investor not found"
            });

            return;
        }

        const investor =
            investorResult.rows[0];

        const propertyResult =
            await pool.query(
                `
                SELECT *
                FROM properties
                WHERE investor_pan = $1
                ORDER BY created_at DESC
                `,
                [investor.pan_number]
            );

        res.status(200).json({
            success: true,
            totalProperties:
                propertyResult.rows.length,
            properties:
                propertyResult.rows
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message:
                "Failed to fetch properties"
        });
    }
};

export const updatePropertyValuation = async (
    req: Request,
    res: Response
): Promise<void> => {

    try {

        const { propertyId } =
            req.params;

        const { valuationAmount } =
            req.body;

        const propertyResult =
            await pool.query(
                `
                SELECT *
                FROM properties
                WHERE id = $1
                `,
                [propertyId]
            );

        if (
            propertyResult.rows.length === 0
        ) {

            res.status(404).json({
                success: false,
                message:
                    "Property not found"
            });

            return;
        }

        await pool.query(
            `
            INSERT INTO property_valuations(
                property_id,
                valuation_amount,
                valuation_date
            )
            VALUES($1,$2,CURRENT_DATE)
            `,
            [
                propertyId,
                valuationAmount
            ]
        );

        await pool.query(
            `
            UPDATE properties
            SET market_value = $1
            WHERE id = $2
            `,
            [
                valuationAmount,
                propertyId
            ]
        );

        res.status(200).json({
            success: true,
            message:
                "Property valuation updated"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message:
                "Failed to update valuation"
        });
    }
};

export const getPropertyHistory = async (
    req: Request,
    res: Response
): Promise<void> => {

    try {

        const { propertyId } =
            req.params;

        const historyResult =
            await pool.query(
                `
                SELECT *
                FROM property_valuations
                WHERE property_id = $1
                ORDER BY valuation_date DESC
                `,
                [propertyId]
            );

        res.status(200).json({
            success: true,
            history:
                historyResult.rows
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message:
                "Failed to fetch history"
        });
    }
};

export const deleteProperty = async (
    req: Request,
    res: Response
): Promise<void> => {

    try {

        const { propertyId } =
            req.params;

        await pool.query(
            `
            DELETE
            FROM property_valuations
            WHERE property_id = $1
            `,
            [propertyId]
        );

        await pool.query(
            `
            DELETE
            FROM properties
            WHERE id = $1
            `,
            [propertyId]
        );

        res.status(200).json({
            success: true,
            message:
                "Property deleted successfully"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message:
                "Failed to delete property"
        });
    }
};