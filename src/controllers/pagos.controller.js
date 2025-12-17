import { crearPedidoYPreferencia, procesarWebhook } from "../services/pagos.service.js";

export const crearPreferencia = async (req, res, next) => {
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
    next(error);
  }
};

export const recibirWebhook = async (req, res) => {
  try {
    await procesarWebhook(req.query, req.body);

    res.status(200).send("OK");
  } catch (error) {
    console.error("Error en webhook:", error.message);
    res.status(200).send("Error procesado");
  }
};
