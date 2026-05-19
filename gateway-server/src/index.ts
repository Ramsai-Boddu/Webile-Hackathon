import express from "express";
import cors from "cors";
import portfolioRoutes from "./routes/portfolioRoutes";
import authRoutes from "./routes/authRoutes";
import testRoutes from "./routes/testRoutes";
import auditMiddleware from "./middleware/auditMiddleware";


const app = express();

app.use(cors());
app.use(express.json());
app.use(auditMiddleware("GATEWAY_SERVICE"));

app.use("/auth", authRoutes);
app.use("/test", testRoutes);
app.use("/portfolio",portfolioRoutes);

app.listen(4000, () => {
    console.log("Gateway server running on port 4000");
});