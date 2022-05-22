const obtenerProductos = (request, response) => {
    const productos = [
        {nombre: 'xiaomi', precio: 20450.00, categoria: 'celular'}
    ];

    return response.status(200).json(productos);
}

export {
    obtenerProductos
}