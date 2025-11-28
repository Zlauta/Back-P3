import { crearPedidoYPreferencia } from "../services/pagos.service.js";

export const crearPreferencia = async (req, res) => {
  try {
    // 1. OBTENEMOS EL EMAIL DESDE EL TOKEN (Validado por el middleware)
    const emailToken = req.usuario.email; 

    if (!emailToken) {
        return res.status(400).json({ mensaje: "Token inválido" });
    }

    // 2. ARMAMOS EL OBJETO DE DATOS
    // Pasamos el email al servicio en lugar del ID
    const datosPedido = {
        items: req.body.items,
        total: req.body.total,
        direccion: req.body.direccion,
        telefono: req.body.telefono,
        emailUsuario: emailToken // <--- Pasamos el email
    };

    // 3. LLAMAMOS AL SERVICIO
    // El servicio se encargará de buscar el ID y todo lo demás
    const resultado = await crearPedidoYPreferencia(datosPedido);
    
    // 4. RESPONDEMOS
    res.status(200).json(resultado);

  } catch (error) {
    console.error("Error controller pagos:", error.message);
    
    // Manejo de errores según el mensaje
    if (error.message.includes("no existe") || error.message.includes("vacío")) {
        return res.status(400).json({ mensaje: error.message });
    }
    
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};