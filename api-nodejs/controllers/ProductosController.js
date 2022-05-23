import Producto from "../models/Producto.js";

const obtenerProductos = async (request, response) => {
    const productos = await Producto.find();

    return response.status(200).json(productos);
};

const crearProducto = async (request, response) => {
    const producto = new Producto(request.body);

    try {
        const productoGuardado = await producto.save();

        return response.status(202).json({producto: productoGuardado});
    } catch (error) {
        return response.status(409).json({error: error.message});
    }
};

export {
    obtenerProductos,
    crearProducto
}