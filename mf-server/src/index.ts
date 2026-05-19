import express from "express";
import cors from "cors";
import mfRoutes from "./routes/mfRoutes";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/mf",mfRoutes);

app.listen(4002, () => {
    console.log("MF service running on port 4002");
});