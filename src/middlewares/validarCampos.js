import { validationResult } from "express-validator";

/**
 * Middleware genérico para capturar y devolver errores de validación.
 * Se usa al final del arreglo de middlewares en las rutas.
 */
export const validarCampos = (req, res, ) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: errors.array().map(err => ({
        campo: err.param,
        mensaje: err.msg,
      })),
    });
  }

  next(); // si no hay errores, continúa al siguiente middleware o controller
};
