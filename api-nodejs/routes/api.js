import express from "express";
import { obtenerProductos, crearProducto, buscarProductos } from "../controllers/ProductosController.js"
import PaymentController from "../controllers/PaymentsControllers.js";
import PaymentService from "../services/PaymetService.js";

const router = express.Router();
const PaymentInstance = new PaymentController(new PaymentService);

// endpoints api
router.get("/productos", obtenerProductos);
router.post("/producto", crearProducto);
router.post("/buscar-productos", buscarProductos);
// router.post("/producto", crearProducto);
router.get("/crear", crearProducto);

router.post("/payment", function (req, res, next) {
    PaymentInstance.getPaymentLink(req, res);
});
  
router.post("/webhook", function (req, res, next) {
    PaymentInstance.webhook(req, res);
});

export default router;