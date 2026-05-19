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

export default generateToken;