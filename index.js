import express from "express";
import spacesRoutes from "./routes/spacesRoutes.js";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import logMiddlewares from "./middlewares/logMiddlewares.js";

const app = express();

app.use(express.json());
app.use(cors())
app.use(logMiddlewares);

app.use("/spaces", spacesRoutes);
app.use("/auth", authRoutes);

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(3001, () => {
    console.log("Server started on port 3001");
});