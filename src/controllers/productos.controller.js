export const obtenerProductosController = (req, res) => {
    try {
        const {msg, statusCode, data} = obtenerProductosService();
    } catch (error) {
        res.status(statusCode).json({ msg });
    }
}

export const obtenerProductoPorIdController = (req, res) => {
    try {
        const id = req.params.id;
        const {msg, statusCode, data} = obtenerProductoPorIdService(id);
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

export const actualizarProductoController = (req, res) => {
    try {
        const id = req.params.id;
        const {msg, statusCode, data} = actualizarProductoService(id, req.body);
    } catch (error) {
        res.status(statusCode).json({ msg });
    }
}

export const eliminarProductoController = (req, res) => {
    try {
        const id = req.params.id;
        const {msg, statusCode, data} = eliminarProductoService(id);
    } catch (error) {
        res.status(statusCode).json({ msg });
    }
}
