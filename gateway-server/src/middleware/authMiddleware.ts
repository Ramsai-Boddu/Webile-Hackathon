import {
    Request,
    Response,
    NextFunction
} from "express";

import jwt from "jsonwebtoken";

interface JwtPayload {

    investorId: string;

    role: string;
}

declare global {

    namespace Express {

        interface Request {

            user?: JwtPayload;
        }
    }
}

const authMiddleware = (

    req: Request,

    res: Response,

    next: NextFunction

): void => {

    try {

        const authHeader =
            req.headers.authorization;

        if (!authHeader) {

            res.status(401).json({
                success: false,
                message: "Authorization header missing"
            });

            return;
        }

        const token =
            authHeader.split(" ")[1];
        if (!token) {
            res.status(401).json({
                success: false,
                message: "Token missing"
            });
            return;
        }
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET as string
        ) as JwtPayload;
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({
            success: false,
            message: "Invalid token"
        });
    }
};

export default authMiddleware;