import ProductoModel from "../models/Producto.js";
import AppError from "../utils/appError.js";

export const obtenerProductosService = async () => {
  const productos = await ProductoModel.find();
  return {
    msg: "Productos obtenidos exitosamente",
    statusCode: 200,
    data: productos,
  };
};

export const obtenerProductoPorIdService = async (id) => {
  const producto = await ProductoModel.findById(id);
  if (!producto) {
    throw new AppError("Producto no encontrado", 404);
  }
  return {
    msg: "Producto obtenido exitosamente",
    statusCode: 200,
    data: producto,
  };
};

export const crearProductoService = async (productoData) => {
  const nuevoProducto = new ProductoModel(productoData);
  await nuevoProducto.save();
  return {
    msg: "Producto creado exitosamente",
    statusCode: 201,
    data: nuevoProducto,
  };
};

export const actualizarProductoService = async (id, productoData) => {
  const productoActualizado = await ProductoModel.findByIdAndUpdate(id, productoData, {
    new: true,
    runValidators: true,
  });
  if (!productoActualizado) {
    throw new AppError("Producto no encontrado", 404);
  }
  return {
    msg: "Producto actualizado exitosamente",
    statusCode: 200,
    data: productoActualizado,
  };
};

export const eliminarProductoService = async (id) => {
  const productoEliminado = await ProductoModel.findByIdAndDelete(id);
  if (!productoEliminado) {
    throw new AppError("Producto no encontrado", 404);
  }
  return {
    msg: "Producto eliminado exitosamente",
    statusCode: 200,
    data: productoEliminado,
  };
};

export const obtenerProductosFiltradosService = async (category, page = 1, limit = 10) => {
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
};
