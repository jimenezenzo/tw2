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
  console.log(request.body);
  console.log(request);
  const producto = new Producto(request.body);

  try {
    const productoGuardado = await producto.save();
    return response.status(202).json({ producto: productoGuardado });
  } catch (error) {
    return response.status(409).json({ error: error.message });
  }
};

const crearProducto = () => {
  Producto.create({
    nombre: 'Apple iPhone 12',
    categoria: 'Celulares',
    precio: 205000,
    descripcion:
      'El iPhone 12 tiene una espectacular pantalla Super Retina XDR de 6.1 pulgadas (1). Un frente de Ceramic Shield, cuatro veces más resistente a las caídas (2). Modo Noche en todas las cámaras, para que puedas tomar fotos increíbles con poca luz. Grabación, edición y reproducción de video en Dolby Vision con calidad cinematográfica. Y el potente chip A14 Bionic. Además, es compatible con los nuevos accesorios MagSafe, que se acoplan fácilmente a tu iPhone y permiten una carga inalámbrica más rápida (3). Que comience la diversión.',
    color: 'blanco',
    marca: 'Apple',
    bateria: '3500 ma',
    almacenamiento: '64 gb',
    stock: 10,
    imagen: 'iphone12.jpg',
  });

  Producto.create({
    nombre: 'Apple iPhone 13 Pro Max',
    categoria: 'Celulares',
    precio: 305000,
    descripcion:
      'iPhone 13 Pro Max. El mayor avance en el sistema de cámaras Pro hasta ahora. Pantalla Super Retina XDR con ProMotion que brinda una respuesta más rápida y fluida. Chip A15 Bionic para un rendimiento fuera de serie. Diseño resistente y la mayor duración de batería jamás vista en un iPhone.',
    color: 'plata',
    marca: 'Apple',
    bateria: '4000 ma',
    almacenamiento: '256 gb',
    stock: 4,
    imagen: 'iphone13ProMax.jpg',
  });

  Producto.create({
    nombre: 'Apple iPhone 13 mini',
    categoria: 'Celulares',
    precio: 225000,
    descripcion:
      'iPhone 13 Pro Max. El mayor avance en el sistema de cámaras Pro hasta ahora. Pantalla Super Retina XDR con ProMotion que brinda una respuesta más rápida y fluida. Chip A15 Bionic para un rendimiento fuera de serie. Diseño resistente y la mayor duración de batería jamás vista en un iPhone.',
    color: 'rosa',
    marca: 'Apple',
    bateria: '3000 ma',
    almacenamiento: '128 gb',
    stock: 7,
    imagen: 'iphone13Mini.jpg',
  });

  Producto.create({
    nombre: 'Apple Watch Series 7',
    categoria: 'Relojes',
    precio: 77000,
    descripcion:
      'El Apple Watch Series 7 tiene la pantalla Retina siempre activa más grande y avanzada hasta ahora. Todo se ve increíble y es más fácil de usar. También es el más resistente a golpes gracias a su nuevo cristal frontal. Sus funcionalidades avanzadas te permiten medir tu nivel de oxígeno en la sangre(1), monitorear tus horas de sueño y practicar la conciencia plena. Y tiene un montón de entrenamientos para mantenerte en movimiento, incluyendo Tai Chi y Pilates.',
    color: 'blanco',
    marca: 'Apple',
    bateria: '200 ma',
    almacenamiento: '32 gb',
    stock: 7,
    imagen: 'appleWatch7.jpg',
  });

  Producto.create({
    nombre: 'Apple AirPods Pro',
    categoria: 'Auriculares',
    precio: 37000,
    descripcion:
      'Cancelación Activa de Ruido para que disfrutes de un sonido inmersivo. Modo Ambiente para que escuches todo lo que ocurre a tu alrededor y puedas interactuar con tu entorno. Ajuste personalizable para que los uses con comodidad todo el día. Y resistencia al agua y al sudor (1). Los AirPods Pro tienen un diseño increíblemente ligero y se configuran fácilmente en todos tus dispositivos Apple (2).',
    color: 'blanco',
    marca: 'Apple',
    bateria: '150 ma',
    almacenamiento: '2 gb',
    stock: 20,
    imagen: 'appleAirpods.jpg',
  });

  Producto.create({
    nombre: 'Xiaomi Redmi Note 10 5G Dual',
    categoria: 'Celulares',
    precio: 80000,
    descripcion:
      'El Xiaomi Redmi Note 10 es el líder de la décima reencarnación de la serie Redmi Note. Con una pantalla Super AMOLED de 6.43 pulgadas a resolución Full HD+, el Redmi Note 10 está potenciado por un procesador Snapdragon 678 con 4GB de memoria RAM con opciones de 64GB o 128GB de almacenamiento interno expandible vía microSD. La cámara posterior del Redmi Note 10 es cuádruple, en configuración 48MP+ 8MP + 2MP + 2MP, mientras que la cámara selfie es de 13 megapixels. Entre el resto de las características se destacan unos parlantes stereo, batería de 5000 mAh de carga rápida, resistencia al agua IP53 y corre MIUI 12 basado en Android 11.',
    color: 'gris',
    marca: 'Xiaomi',
    bateria: '4500 ma',
    almacenamiento: '128 gb',
    stock: 20,
    imagen: 'xiaomiRedmiNote10.jpg',
  });

  Producto.create({
    nombre: 'Xiaomi Redmi Note 10 Pro',
    categoria: 'Celulares',
    precio: 75000,
    descripcion:
      'El Xiaomi Redmi Note 10 Pro es el líder de la décima reencarnación de la serie Redmi Note. Con una pantalla Super AMOLED de 6.43 pulgadas a resolución Full HD+, el Redmi Note 10 está potenciado por un procesador Snapdragon 678 con 4GB de memoria RAM con opciones de 64GB o 128GB de almacenamiento interno expandible vía microSD. La cámara posterior del Redmi Note 10 es cuádruple, en configuración 48MP+ 8MP + 2MP + 2MP, mientras que la cámara selfie es de 13 megapixels. Entre el resto de las características se destacan unos parlantes stereo, batería de 5000 mAh de carga rápida, resistencia al agua IP53 y corre MIUI 12 basado en Android 11.',
    color: 'gris',
    marca: 'Xiaomi',
    bateria: '5000 ma',
    almacenamiento: '128 gb',
    stock: 10,
    imagen: 'xiaomiRedmiNote10Pro.jpg',
  });

  Producto.create({
    nombre: 'Xiaomi Pocophone Poco X4 Pro 5G Dual',
    categoria: 'Celulares',
    precio: 103000,
    descripcion:
      'El Xiaomi Poco X4 Pro 5G es el nuevo smartphone de la serie X de Poco. Con una pantalla AMOLED de 6.67 pulgadas a resolución FHD+ y tasa de refresco de 120Hz, el Poco X4 Pro 5G está potenciado por un procesador Snapdragon 695 con 6GB o 8GB de RAM y 128GB o 256GB de almacenamiento. El Poco X4 Pro tiene una cámara triple en su posterior compuesta de lentes de 108MP, 8MP y 2MP, con una cámara selfie de 16MP. Completando las características del Poco X4 Pro 5G encontramos una batería de 5000 mAh de carga rápida de 67W, lector de huellas lateral, parlantes stereo, y resistencia al agua IP53, corriendo Android 11.',
    color: 'amarillo',
    marca: 'Xiaomi',
    bateria: '5000 ma',
    almacenamiento: '256 gb',
    stock: 3,
    imagen: 'xiaomiPocoX4Pro.jpg',
  });

  Producto.create({
    nombre: 'Xiaomi Mi Smart Band 6',
    categoria: 'Relojes',
    precio: 5500,
    descripcion:
      'Con 10 años de trayectoria, Xiaomi se posiciona como uno de los líderes indiscutidos en el mercado de los smartwatches. Sus productos se destacan por la calidad, el diseño sencillo y muy buenas prestaciones. La Mi Band tiene todo lo necesario para acompañarte en tu rutina.',
    color: 'negro',
    marca: 'Xiaomi',
    bateria: '250 ma',
    almacenamiento: '2 gb',
    stock: 150,
    imagen: 'xiaomiMiSmartBand6.jpg',
  });

  Producto.create({
    nombre: 'Samsung Galaxy S10',
    categoria: 'Celulares',
    precio: 90000,
    descripcion:
      'El Samsung Galaxy S10 llega en el 2019 mejorando en varios aspectos al Galaxy S9. El Galaxy S10 tiene una pantalla QHD+ Dynamic AMOLED de 6.1 pulgadas, y está potenciado por el nuevo procesador Exynos 9820 de ocho núcleos . La cámara principal del Galaxy S10 es triple, con un sensor principal de 12 MP con OIS, un telefoto de 12 MP con AF, y un lente ultra-wide de 16 MP. La cámara frontal es de 10 MP. Completando sus características, el Galaxy S10 cuenta con lector de huellas embebido en pantalla, puerto USB-C, parlantes stereo optimizados por AKG, sonido Dolby Atmos, batería de 3400 mAh con carga rápida inalámbrica, carga reversible para funcionar como power bank y Android 9.0 Pie con la interfaz One UI.',
    color: 'negro',
    marca: 'Samsung',
    bateria: '3500 ma',
    almacenamiento: '128 gb',
    stock: 10,
    imagen: 'samsungS10.jpg',
  });

  Producto.create({
    nombre: 'Samsung Galaxy S21 Fe',
    categoria: 'Celulares',
    precio: 105000,
    descripcion:
      'Triple Cámara trasera de 12 MP + 12 MP + 8 MP Cámara Frontal de 32 MP. Infinity-O Display de 6.4" FHD+ Dynamic AMOLED 2X HID 120Hz. Procesador Exynos 2100 | Octa-Core 2.9GHz,2.8GHz,2.2GHz. 4.500 mAh para mayor duración de la batería y 25W Super Fast charging',
    color: 'gris',
    marca: 'Samsung',
    bateria: '4500 ma',
    almacenamiento: '128 gb',
    stock: 20,
    imagen: 'samsungS21Fe.jpg',
  });

  Producto.create({
    nombre: 'Samsung Galaxy S21 Ultra 5G',
    categoria: 'Celulares',
    precio: 240000,
    descripcion:
      'El Samsung Galaxy S21 Ultra es la variante más poderosa de la serie Galaxy S21, mejorando por completo todas las especificaciones de sus pares y el primer Galaxy S en utilizar stylus S Pen fuera de la serie Galaxy Note. El Galaxy S21 Ultra cuenta con una pantalla Dynamic AMOLED de 6.8 pulgadas a resolución QHD+, tasa de refresco de 120 Hz y protección Gorilla Glass Victus y por dentro encontramos el mismo par de procesadores dependientes de región: el Snapdragon 888 para USA y China y el Exynos 2100 para el resto del mundo, esta vez con opciones de 12GB de memoria RAM 128GB o 256GB de almacenamiento o 16GB de RAM con 512GB de almacenamiento. La cámara posterior del Galaxy S21 Ultra es mejorada a una cuádruple, con lente principal de 108MP, un lente periscópico de 10MP, lente telefoto de 10MP y un lente ultrawide de 12MP, mientras que la cámara frontal sube a 40MP. Completando las características del Galaxy S21 Ultra encontramos unos parlantes stereo con sonido HiFi, batería de 5000 mAh con carga rápida, inalámbrica y reversible, lector de huellas integrado en la pantalla, y One UI 3.5 con Android 11 debajo.',
    color: 'gris',
    marca: 'Samsung',
    bateria: '5000 ma',
    almacenamiento: '256 gb',
    stock: 10,
    imagen: 'samsungS21Ultra.jpg',
  });

  Producto.create({
    nombre: 'Samsung Galaxy S22 Ultra',
    categoria: 'Celulares',
    precio: 203000,
    descripcion:
      'Nueva apariencia digna de un Note. Conocé el Galaxy S22 Ultra, con el poder de Note. El marco pulido, delgado y audaz, rodea la forma extruida para lograr una simetría elegante. Y la cámara lineal, acentuada por anillos de lentes espejados, parece flotar en su lugar.',
    color: 'verde',
    marca: 'Samsung',
    bateria: '5000 ma',
    almacenamiento: '256 gb',
    stock: 15,
    imagen: 'samsungS22Ultra.jpg',
  });
};

const buscarProductos = async (request, response) => {
  let filtros = request.body;
  console.log(request.body);
  const productos = await Producto.find(filtros);

  return response.status(200).json(productos);
};

export {
  obtenerProductos,
  crearProducto,
  crearProducto2,
  buscarProductos,
  borrarProducto,
  actualizarProducto,
};