import express from "express";
import conectarDB from "./config/bd.js";
import dotenv from "dotenv";
import router from "./routes/api.js";
import cors from "cors";
import corsOptionsDelegate from "./config/cors.js";

const app = express();

dotenv.config();

conectarDB();

app.use(express.json());

app.use(cors(corsOptionsDelegate));

app.use(express.static('public'));

app.use("/api", router);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Servidor funcionando en el puerto ${PORT}`);
});