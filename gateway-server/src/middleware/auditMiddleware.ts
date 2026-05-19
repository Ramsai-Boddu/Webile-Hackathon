import { Request, Response, NextFunction } from "express";
import pool from "../config/db";

const auditMiddleware = (
    serviceName: string
) => {

    return (
        req: Request,
        res: Response,
        next: NextFunction
    ): void => {

        const startTime = Date.now();

        res.on("finish", async () => {

            try {

                const responseTime =
                    Date.now() - startTime;

                await pool.query(
                    `
                    INSERT INTO audit_logs(
                        investor_pan,
                        service_name,
                        action,
                        endpoint,
                        request_method,
                        ip_address,
                        status_code,
                        response_time_ms,
                        success
                    )
                    VALUES(
                        $1,$2,$3,$4,$5,
                        $6,$7,$8,$9
                    )
                    `,
                    [
                        req.user?.investorId || null,

                        serviceName,

                        `${req.method} ${req.originalUrl}`,

                        req.originalUrl,

                        req.method,

                        req.ip,

                        res.statusCode,

                        responseTime,

                        res.statusCode < 400
                    ]
                );

            } catch (error) {

                console.log(
                    "Audit Log Error",
                    error
                );
            }
        });

        next();
    };
};

export default auditMiddleware;