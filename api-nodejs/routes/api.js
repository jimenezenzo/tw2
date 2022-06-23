import express from "express";
import { obtenerProductos, crearProducto, buscarProductos } from "../controllers/ProductosController.js"

const router = express.Router();

// endpoints api
router.get("/productos", obtenerProductos);
router.post("/producto", crearProducto);
router.post("/buscar-productos", buscarProductos);
// router.post("/producto", crearProducto);
router.get("/crear", crearProducto);


export default router;