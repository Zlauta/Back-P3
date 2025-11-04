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