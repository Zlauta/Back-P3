import ProductoModel from "../models/Producto.js";

export const obtenerProductosService = async () => {
  try {
    const productos = await ProductoModel.find();
    return {
      msg: "Productos obtenidos exitosamente",
      statusCode: 200,
      data: productos,
    };
  } catch (error) {
    console.error(error);
    return {
      msg: "Error al obtener productos",
      statusCode: 400,
      data: null,
    };
  }
};

export const obtenerProductoPorIdService = async (id) => {
  try {
    const producto = await ProductoModel.findById(id);
    if (!producto) {
      return {
        msg: "Producto no encontrado",
        statusCode: 404,
        data: null,
      };
    }
    return {
      msg: "Producto obtenido exitosamente",
      statusCode: 200,
      data: producto,
    };
  } catch (error) {
    console.error(error);
    return {
      msg: "Error al obtener producto",
      statusCode: 400,
      data: null,
    };
  }
};

export const crearProductoService = async (productoData) => {
  try {
    const nuevoProducto = new ProductoModel(productoData);
    await nuevoProducto.save();
    return {
      msg: "Producto creado exitosamente",
      statusCode: 201,
      data: nuevoProducto,
    };
  } catch (error) {
    console.error(error);
    return {
      msg: "Error al crear producto",
      statusCode: 400,
      data: null,
    };
  }
};

export const actualizarProductoService = async (id, productoData) => {
  try {
    const productoActualizado = await ProductoModel.findByIdAndUpdate(id, productoData, {
      new: true,
      runValidators: true,
    });
    if (!productoActualizado) {
      return {
        msg: "Producto no encontrado",
        statusCode: 404,
        data: null,
      };
    }
    return {
      msg: "Producto actualizado exitosamente",
      statusCode: 200,
      data: productoActualizado,
    };
  } catch (error) {
    console.error(error);
    return {
      msg: "Error al actualizar producto",
      statusCode: 400,
      data: null,
    };
  }
};

export const eliminarProductoService = async (id) => {
  try {
    const productoEliminado = await ProductoModel.findByIdAndDelete(id);
    if (!productoEliminado) {
      return {
        msg: "Producto no encontrado",
        statusCode: 404,
        data: null,
      };
    }
    return {
      msg: "Producto eliminado exitosamente",
      statusCode: 200,
      data: productoEliminado,
    };
  } catch (error) {
    console.error(error);
    return {
      msg: "Error al eliminar producto",
      statusCode: 400,
      data: null,
    };
  }
};

export const obtenerProductosFiltradosService = async (category, page = 1, limit = 10) => {
  try {
    const filtro = category ? { categoria: category } : {};
    const skip = (Number(page) - 1) * Number(limit);

    const [items, totalItems] = await Promise.all([
      ProductoModel.find(filtro).skip(skip).limit(Number(limit)),
      ProductoModel.countDocuments(filtro),
    ]);

    const totalPages = Math.ceil(totalItems / Number(limit));

    return {
      msg: "Productos filtrados obtenidos exitosamente",
      statusCode: 200,
      data: {
        items,
        meta: {
          totalItems,
          totalPages,
          currentPage: Number(page),
        },
      },
    };
  } catch (error) {
    console.error(error);
    return {
      msg: "Error al obtener productos filtrados",
      statusCode: 400,
      data: null,
    };
  }
};
