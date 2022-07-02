import Producto from "../models/Producto.js";

const obtenerProductos = async (request, response) => {
    const productos = await Producto.find();

    return response.status(200).json(productos);
};

const actualizarProducto = async (request, response) => {
  const productoId = request.query.id;
  const update = request.body;
  console.log(request.body);
  try {
    const productoActulizado = await Producto.findByIdAndUpdate(
      productoId,
      update
    );
    return response.status(202).json({
      message: `${productoActulizado.nombre} fue Actualizado.`,
      producto: productoActulizado,
    });
  } catch (error) {
    return response
      .status(409)
      .json({ error: error.message, message: 'Id no encontrada.' });
  }
};

const borrarProducto = async (request, response) => {
  const productoId = request.query.id;
  const productoABorrar = await Producto.findById(productoId);
  try {
    const productoBorrado = await productoABorrar.remove();
    return response.status(202).json({
      message: `${productoBorrado.nombre} fue borrado.`,
      producto: productoBorrado,
    });
  } catch (error) {
    return response
      .status(409)
      .json({ error: error.message, message: 'Id no encontrada.' });
  }
};

const crearProducto2 = async (request, response) => {
  const producto = new Producto(request.body);
  try {
    const productoGuardado = await producto.save()
    return response.status(202).json({ producto: productoGuardado });
  } catch (error) {
    return response.status(409).json({ error: error.message });
  }
};

const buscarProductos = async (request, response) => {
  let filtros = request.body;
  console.log(request.body);
  const productos = await Producto.find(filtros);

  return response.status(200).json(productos);
};

export {
  obtenerProductos,
  crearProducto2,
  buscarProductos,
  borrarProducto,
  actualizarProducto,
};