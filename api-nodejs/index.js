import express from "express";
import dotenv from "dotenv";
import router from "./routes/api.js";

const app = express();

app.use(express.json());

dotenv.config();

app.use("/api", router);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Servidor funcionando en el puerto ${PORT}`);
});