import jwt from "jsonwebtoken";

const generateToken = (
    investorId: string,
    role: string
): string => {
    return jwt.sign(
        {
            investorId,
            role
        },
        process.env.JWT_SECRET as string,
        {
            expiresIn: "1d"
        }
    );
};

export const generateRefreshToken = (
    investorId: string,
    role: string
): string => {

    return jwt.sign(
        {
            investorId,
            role
        },
        process.env.SECRET_REFRESH as string,
        {
            expiresIn: "7d"
        }
    );
};

export default generateToken;