import { crearPedidoYPreferencia } from "../services/pagos.service.js";

export const crearPreferencia = async (req, res) => {
  try {
    const emailToken = req.usuario.email; 

    if (!emailToken) {
        return res.status(400).json({ mensaje: "Token inválido" });
    }
    const datosPedido = {
        items: req.body.items,
        total: req.body.total,
        direccion: req.body.direccion,
        telefono: req.body.telefono,
        emailUsuario: emailToken 
    };
    const resultado = await crearPedidoYPreferencia(datosPedido);
    
    res.status(201).json(resultado);

  } catch (error) {
    console.error("Error controller pagos:", error.message);
    
    if (error.message.includes("no existe") || error.message.includes("vacío")) {
        return res.status(400).json({ mensaje: error.message });
    }
    
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};