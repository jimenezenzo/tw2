import express from "express";
import { obtenerProductos, crearProducto } from "../controllers/ProductosController.js"

const router = express.Router();

// endpoints api
router.get("/productos", obtenerProductos);
router.post("/producto", crearProducto);
router.get("/crear", crearProducto);


export default router;