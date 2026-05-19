import { Request, Response } from "express";

import bcrypt from "bcrypt";

import pool from "../config/db";

import generateToken from "../utils/generateToken";

export const login = async (req: Request,res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;
        const userQuery = `
            SELECT *
            FROM equity_users
            WHERE email = $1
        `;
        const userResult = await pool.query(
            userQuery,
            [email]
        );

        if (userResult.rows.length === 0) {

            res.status(404).json({
                success: false,
                message: "User not found"
            });

            return;
        }
        const user = userResult.rows[0];
        const isPasswordValid = password === user.password_hash;
        if (!isPasswordValid) {

            res.status(401).json({
                success: false,
                message: "Invalid password"
            });

            return;
        }
        const roleQuery = `
            SELECT r.role_name

            FROM user_roles ur

            JOIN roles r
            ON ur.role_id = r.id

            WHERE ur.investor_pan = $1
        `;
        const roleResult = await pool.query(
            roleQuery,
            [user.pan_number]
        );
        const role =
            roleResult.rows[0]?.role_name || "INVESTOR";

        const token = generateToken(
            user.investor_id,
            role
        );
        res.status(200).json({
            success: true,
            token,
            user: {
                investorId: user.investor_id,
                fullName: user.full_name,
                email: user.email,
                role
            }
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Login failed"
        });
    }
};