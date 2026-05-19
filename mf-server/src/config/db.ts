import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({
    host: "aws-1-ap-south-1.pooler.supabase.com",
    port: 5432,
    user: "postgres.lgezkduojgquxhmqrixx",
    password: process.env.password,
    database: "postgres",
    max: 50,
    ssl: {
        rejectUnauthorized: false
    }
});
const run = async (): Promise<void> => {
    try {
        await pool.connect();
        console.log(
            "Connected to PostgreSQL"
        );
    } catch (error) {
        console.log(error);
    }
};
run();

export default pool;