import * as reservasService from "../services/reservas.service.js";

export const obtenerReservas = async (req, res) => {
  try {
    const { status, data } = await reservasService.obtenerReservas(req.query);
    res.status(status).json(data);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
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
    if (!req.usuario || !req.usuario.email) {
      return res.status(401).json({ 
        message: "No autorizado. Token inválido o sesión expirada." 
      });
    }

    const { status, data } = await reservasService.crearReserva(
      req.body, 
      req.usuario 
    );

    res.status(status).json({
      message: "Reserva creada con éxito",
      data
    });
  } catch (error) {
    console.error("❌ Error al crear reserva:", error);
    res.status(error.status || 500).json({ 
      message: error.message || "Error interno del servidor",
      details: error.details 
    });
  }
};

export const actualizarReserva = async (req, res) => {
  try {
    const { status, data } = await reservasService.actualizarReserva(req.params.id, req.body);
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