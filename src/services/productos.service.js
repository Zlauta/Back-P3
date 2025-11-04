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

