import express from 'express';
import {
  obtenerProductos,
  crearProducto,
  buscarProductos,
  crearProducto2,
  borrarProducto,
  actualizarProducto,
} from '../controllers/ProductosController.js';
import PaymentController from '../controllers/PaymentsControllers.js';
import UserController from '../controllers/UserController.js';
import PaymentService from '../services/PaymetService.js';
import storage from '../config/storage.js';
import authMiddleware from '../middleware/auth.js';

const router = express.Router();
const PaymentInstance = new PaymentController(new PaymentService());
const UserControllerInstance = new UserController();

// endpoints api
router.get('/productos', obtenerProductos);
router.post('/buscar-productos', buscarProductos);
router.post('/crear-producto', authMiddleware, storage.single('imagen'), crearProducto2);
router.get('/crear', authMiddleware, crearProducto);
router.delete('/borrar-producto', borrarProducto);
router.put('/actualizar-producto', authMiddleware, actualizarProducto);

router.post('/payment', authMiddleware, function (req, res, next) {
  PaymentInstance.getPaymentLink(req, res);
});

router.post('/webhook', authMiddleware, function (req, res, next) {
  PaymentInstance.webhook(req, res);
});

router.post('/registrar-usuario', function(req, res) {
  UserControllerInstance.signUp(req, res)
})

router.post('/login', function(req, res) {
  UserControllerInstance.signIn(req, res)
})

router.post('/recuperar-contrasenia', function(req, res) {
  UserControllerInstance.recuperarContrasenia(req, res)
})

router.post('/confirmar-contrasenia', function(req, res) {
  UserControllerInstance.confirmarContrasenia(req, res)
})

router.post('/confirmar-cuenta', function(req, res) {
  UserControllerInstance.confirmarCuenta(req, res)
})

router.get('/check-login', function(req, res) {
  UserControllerInstance.estaLogueado(req, res)
})

router.get('/get-perfil', function(req, res) {
  UserControllerInstance.getProfile(req, res)
})

export default router;
