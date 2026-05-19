import {Request,Response} from "express";
import pool from "../config/db";

export const getFunds = async (req: Request,res: Response): Promise<void> => {
    try {
        const {customerRef} = req.params;

        const customerQuery = `
            SELECT *
            FROM mf_customers
            WHERE customer_ref = $1
        `;

        const customerResult =
            await pool.query(
                customerQuery,
                [customerRef]
            );

        if (customerResult.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "Customer not found"
            });
            return;
        }
        const fundsQuery = `
            SELECT *
            FROM mf_customer_funds
            WHERE customer_ref = $1
        `;

        const fundsResult =
            await pool.query(
                fundsQuery,
                [customerRef]
            );

        res.status(200).json({
            success: true,
            customer:customerResult.rows[0],
            funds:fundsResult.rows
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch funds"
        });
    }
};

export const getSips = async (req: Request,res: Response): Promise<void> => {

    try {
        const {customerRef} = req.params;
        const customerQuery = `
            SELECT *
            FROM mf_customers
            WHERE customer_ref = $1
        `;

        const customerResult =
            await pool.query(
                customerQuery,
                [customerRef]
            );

        if (customerResult.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "Customer not found"
            });
            return;
        }
        const sipQuery = `
            SELECT *
            FROM mf_sips
            WHERE customer_ref = $1
        `;

        const sipResult =
            await pool.query(
                sipQuery,
                [customerRef]
            );
        res.status(200).json({
            success: true,
            customer:customerResult.rows[0],
            sips:sipResult.rows
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch SIPs"
        });
    }
};

export const investFund = async (req: Request,res: Response): Promise<void> => {
    try {

        const {
            customerRef,
            schemeCode,
            amount
        } = req.body;

        const schemeQuery = `
            SELECT *
            FROM mf_schemes
            WHERE scheme_code = $1
        `;

        const schemeResult = await pool.query(
            schemeQuery,
            [schemeCode]
        );

        if (schemeResult.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "Scheme not found"
            });
            return;
        }

        const scheme =
            schemeResult.rows[0];

        const units =
            Number(amount) /
            Number(scheme.nav_value);

        await pool.query(
            `
            INSERT INTO mf_customer_funds(
                customer_ref,
                scheme_code,
                units,
                invested_amount,
                current_value,
                investment_date
            )
            VALUES($1,$2,$3,$4,$5,NOW())
            `,
            [
                customerRef,
                schemeCode,
                units,
                amount,
                amount
            ]
        );

        res.status(201).json({
            success: true,
            units,
            message: "Investment successful"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Fund investment failed"
        });
    }
};

export const createSip = async (req: Request,res: Response): Promise<void> => {
    try {

        const {
            customerRef,
            schemeCode,
            sipAmount,
            startDate
        } = req.body;

        await pool.query(
            `
            INSERT INTO mf_sips(
                customer_ref,
                scheme_code,
                sip_amount,
                sip_status,
                start_date,
                next_due_date
            )
            VALUES($1,$2,$3,$4,$5,$6)
            `,
            [
                customerRef,
                schemeCode,
                sipAmount,
                "ACTIVE",
                startDate,
                startDate
            ]
        );

        res.status(201).json({
            success: true,
            message: "SIP created successfully"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "SIP creation failed"
        });
    }
};

export const stopSip = async (req: Request,res: Response): Promise<void> => {
    try {

        const { id } = req.params;

        const sipQuery = `
            SELECT *
            FROM mf_sips
            WHERE id = $1
        `;

        const sipResult = await pool.query(
            sipQuery,
            [id]
        );

        if (sipResult.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "SIP not found"
            });
            return;
        }

        await pool.query(
            `
            UPDATE mf_sips
            SET sip_status = 'STOPPED'
            WHERE id = $1
            `,
            [id]
        );

        res.status(200).json({
            success: true,
            message: "SIP stopped successfully"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Failed to stop SIP"
        });
    }
};