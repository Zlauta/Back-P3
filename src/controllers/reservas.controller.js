import * as reservasService from "../services/reservas.service.js";

export const obtenerReservas = async (req, res) => {
  try {
    const { status, data } = await reservasService.obtenerReservas(req.query);
    res.status(status).json(data);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message, details: error.details });
  }
};

export const obtenerReservaPorId = async (req, res) => {
  try {
    const { status, data } = await reservasService.obtenerReservaPorId(req.params.id);
    res.status(status).json(data);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

export const crearReserva = async (req, res) => {
  try {
    if (!req.usuario || !req.usuario._id) {
        return res.status(401).json({ 
            message: "No autorizado. Debes iniciar sesión." 
        });
    }

    const { status, data } = await reservasService.crearReserva(
        req.body, 
        req.usuario._id
    );

    res.status(status).json({
        message: "Reserva creada con éxito",
        data
    });

  } catch (error) {
    console.error("❌ Error en crearReserva:", error);
    res.status(error.status || 500).json({ 
        message: error.message || "Error interno del servidor",
        details: error.details 
    });
  }
};

export const actualizarReserva = async (req, res) => {
  try {
    const { status, data } = await reservasService.actualizarReserva(
      req.params.id,
      req.body
    );
    res.status(status).json(data);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};

export const eliminarReserva = async (req, res) => {
  try {
    const { status, data } = await reservasService.eliminarReserva(req.params.id);
    res.status(status).json(data);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};