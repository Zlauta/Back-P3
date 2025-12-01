import jwt from "jsonwebtoken";

export function validarTokenCliente(req, res, next) {
  try {
    const rawToken = req.headers.authorization;
    if (!rawToken || !rawToken.startsWith("Bearer")) {
      return res
        .status(401)
        .json({ msg: "Formato de Token inválido o inexistente" });
    }
    const token = rawToken.split(" ")[1];
    const usuarioDecodificado = jwt.verify(token, process.env.SECRET_KEY);
    req.usuario = usuarioDecodificado;

    next();
  } catch (error) {
    res.status(401).json({ msg: "Token inválido o expirado" });
  }
}
