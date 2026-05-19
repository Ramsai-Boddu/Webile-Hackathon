import express from "express";
import cors from "cors";
import equityRoutes from "./routes/equityRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/equity",equityRoutes);

app.listen(4001, () => {
    console.log("Equity service running on port 4001");
});