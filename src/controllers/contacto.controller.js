import { actualizarContactoService, crearContactoService, eliminarContactoService, obtenerContactoPorIdService, obtenerContactosService } from "../services/contacto.service.js";


export const crearContactoController = async (req, res) => {
    try {
        const { msg, statusCode, data } = await crearContactoService(req.body);
        res.status(statusCode).json({ msg, data });
    } catch (error) {
        res.status(400).json({ msg: "Error al crear contacto" });
    }
}

export const obtenerContactosController = async (req, res) => {
    try {
        const { msg, statusCode, data } = await obtenerContactosService();
        res.status(statusCode).json({ msg, data });
    } catch (error) {
        res.status(400).json({ msg: "Error al obtener contactos" });
    }
}

export const obtenerContactoPorIdController = async (req, res) => {
    try {
        const id = req.params.id;
        const { msg, statusCode, data } = await obtenerContactoPorIdService(id);
        res.status(statusCode).json({ msg, data });
    } catch (error) {
        res.status(400).json({ msg: "Error al obtener contacto" });
    }
}

export const actualizarContactoController = async (req, res) => {
    try {
        const id = req.params.id;
        const { msg, statusCode, data } = await actualizarContactoService(id, req.body);
        res.status(statusCode).json({ msg, data });
    } catch (error) {
        res.status(400).json({ msg: "Error al actualizar contacto" });
    }
}

export const eliminarContactoController = async (req, res) => {
    try {
        const id = req.params.id;
        const { msg, statusCode, data } = await eliminarContactoService(id);
        res.status(statusCode).json({ msg, data });
    } catch (error) {
        res.status(400).json({ msg: "Error al eliminar contacto" });
    }
}