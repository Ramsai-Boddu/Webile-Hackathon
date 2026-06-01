import { Request, Response } from "express";
import redisClient from "./redis";
import pool from "./db";

export const getUser = async (req: Request,res: Response): Promise<void> => {
    try {
        const userId = String(req.params.id);
        const cachedUser = await redisClient.get(userId);
        if (cachedUser) {
            console.log("Data from Redis Cache");
            res.status(200).json(JSON.parse(cachedUser));
            return;
        }
        console.log("Cache MISS");
        const userResult = await pool.query(
            `
            SELECT *
            FROM users
            WHERE id = $1
            `,
            [userId]
        );
        if (userResult.rows.length === 0) {
            res.status(404).json({
                message: "User not found"
            });
            return;
        }

        const user = userResult.rows[0];
        await redisClient.set(
            userId,
            JSON.stringify(user),
            {
                EX: 60
            }
        );
        console.log("Data from PostgreSQL");
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:
                "Internal Server Error"
        });
    }
};