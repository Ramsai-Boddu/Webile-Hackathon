import {Request,Response,NextFunction} from "express";

const roleMiddleware = (allowedRoles: string[]) => {
    return (req: Request,res: Response,next: NextFunction): void => {
        try {
            const userRole =req.user?.role;
            if (!userRole) {
                res.status(401).json({
                    success: false,
                    message: "User role missing"
                });
                return;
            }
            if (!allowedRoles.includes(userRole)) {
                res.status(403).json({
                    success: false,
                    message: "Access denied"
                });
                return;
            }
            next();
        } catch (error) {
            res.status(500).json({
                success: false,
                message: "Role validation failed"
            });
        }
    };
};

export default roleMiddleware;