import express from "express";
import { obtenerProductos } from "../controllers/ProductosController.js"

const router = express.Router();

// endpoints api
router.get("/productos", obtenerProductos);

export default router;