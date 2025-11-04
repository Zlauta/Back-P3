export const obtenerProductosController = (req, res) => {
    try {
        const {msg, statusCode, data} = obtenerProductosService();
    } catch (error) {
        res.status(statusCode).json({ msg });
    }
}

export const obtenerProductoPorIdController = (req, res) => {
    try {
        const {msg, statusCode, data} = obtenerProductoPorIdService(req.params.id);
    } catch (error) {
        res.status(statusCode).json({ msg });
    }
}

export const crearProductoController = (req, res) => {
    try {
        const {msg, statusCode, data} = crearProductoService(req.body);
    } catch (error) {
        res.status(statusCode).json({ msg });
    }
}
