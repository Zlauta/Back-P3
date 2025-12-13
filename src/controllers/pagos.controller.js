import { crearPedidoYPreferencia, procesarWebhook } from "../services/pagos.service.js";

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
      emailUsuario: emailToken,
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

export const recibirWebhook = async (req, res) => {
  try {
    // Solo pasamos el query y el body al servicio.
    // El controller no necesita saber cómo parsear la data de MercadoPago.
    await procesarWebhook(req.query, req.body);

    // Siempre respondemos 200 OK a MercadoPago
    res.status(200).send("OK");
  } catch (error) {
    console.error("Error en webhook:", error.message);
    // Respondemos 200 para evitar reintentos infinitos si es un error lógico nuestro
    res.status(200).send("Error procesado");
  }
};
