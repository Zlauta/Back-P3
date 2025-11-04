export const obtenerProductosController = (req, res) => {
    try {
        const {msg, statusCode, data} = obtenerProductosService();
    } catch (error) {
        res.status(statusCode).json({ msg });
    }
}