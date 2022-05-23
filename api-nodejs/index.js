import express from "express";
import conectarDB from "./config/bd.js";
import dotenv from "dotenv";
import router from "./routes/api.js";
import cors from "cors";

const app = express();

dotenv.config();

conectarDB();

app.use(express.json());

const dominiosPermitidos = [
    'http://localhost:4200'
];

const corsOptions = {
    origin: function(origin, callback) {
        if(dominiosPermitidos.indexOf(origin) != -1) {
            callback(null, true);
        }
        else {
            callback(new Error('No permitido por CORS'), false);
        }
    }
}

app.use(cors(corsOptions));

app.use("/api", router);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Servidor funcionando en el puerto ${PORT}`);
});