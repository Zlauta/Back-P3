import jwt from "jsonwebtoken";

export function validarAutenticacion(req, res, next) {
  try {
    const rawToken = req.headers.authorization;
    if (!rawToken?.startsWith("Bearer")) {
      return res.status(401).json({ msg: "Formato de Token inválido" });
    }
    const token = rawToken?.split(" ")[1];
    const usuario = jwt.verify(token, process.env.SECRET_KEY);
    req.usuario = usuario;
    if (!usuario) {
      return res.status(403).json({ msg: "Usuario no autorizado" });
    }
    next();
  } catch (error) {
    next(error);
  }
}

export function validarAdmin(req, res, next) {
  try {
    const rawToken = req.headers.authorization;
    if (!rawToken?.startsWith("Bearer")) {
      return res.status(401).json({ msg: "Formato de Token inválido" });
    }
    const token = rawToken?.split(" ")[1];
    const usuario = jwt.verify(token, process.env.SECRET_KEY);
    req.usuario = usuario;
    if (usuario.rol !== "admin") {
      return res.status(403).json({ msg: "Usuario no autorizado" });
    }
    next();
  } catch (error) {
    next(error);
  }
}
export function validarAutenticacionOpcional(req, res, next) {
  try {
    const rawToken = req.headers.authorization;
    if (!rawToken?.startsWith("Bearer")) {
      return next();
    }
    const token = rawToken?.split(" ")[1];
    const usuario = jwt.verify(token, process.env.SECRET_KEY);
    req.usuario = usuario;
    return next();
  } catch (error) {
    next();
  }
}
