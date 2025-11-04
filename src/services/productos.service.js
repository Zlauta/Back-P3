export const obtenerProductosService = async () => {
try {
    const productos = await ProductoModel.find();
    return {
        msg: "Productos obtenidos exitosamente",
        statusCode: 200,
        data: productos,
    };
} catch (error) {
    return {
        msg: "Error al obtener productos",
        statusCode: 500,
        data: null,
    };
}

}

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
    return {
        msg: "Error al obtener producto",
        statusCode: 500,
        data: null,
    };
}
}

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
        return {
            msg: "Error al crear producto",
            statusCode: 500,
            data: null,
        };
    }
}

export const actualizarProductoService = async (id, productoData) => {
    try {
        const productoActualizado = await ProductoModel.findByIdAndUpdate(id, productoData, { new: true, runValidators: true });
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
        return {
            msg: "Error al actualizar producto",
            statusCode: 500,
            data: null,
        };
    }
}
