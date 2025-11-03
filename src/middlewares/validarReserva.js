import { body, validationResult } from "express-validator";

// 🧩 Lista de palabras prohibidas (la misma del modelo, para consistencia)
const palabrasProhibidas = [
  "idiota",
  "tonto",
  "gil",
  "mierda",
  "puta",
  "imbécil",
  "forro",
  "tarado",
];

// ✅ Validaciones con express-validator
export const validarReserva = [
  // Nombre del reservante
  body("nombre")
    .trim()
    .notEmpty()
    .withMessage("El nombre del reservante es obligatorio")
    .isLength({ min: 2 })
    .withMessage("El nombre debe tener al menos 2 caracteres")
    .custom((value) => {
      const contieneProhibidas = palabrasProhibidas.some((p) =>
        new RegExp(`\\b${p}\\b`, "i").test(value)
      );
      if (contieneProhibidas) {
        throw new Error("El nombre contiene palabras inapropiadas");
      }
      return true;
    }),

  // Mesa
  body("mesa")
    .notEmpty()
    .withMessage("El número de mesa es obligatorio")
    .isInt({ min: 1 })
    .withMessage("La mesa debe ser un número entero positivo"),

  // Cantidad de personas
  body("cantidadPersonas")
    .notEmpty()
    .withMessage("Debe indicar la cantidad de personas")
    .isInt({ min: 1 })
    .withMessage("La cantidad de personas debe ser al menos 1"),

  // Fecha
  body("fecha")
    .notEmpty()
    .withMessage("La fecha de la reserva es obligatoria")
    .isISO8601()
    .withMessage("La fecha debe tener un formato válido (YYYY-MM-DD)"),

  // Hora
  body("hora")
    .notEmpty()
    .withMessage("La hora de la reserva es obligatoria")
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .withMessage("La hora debe tener el formato HH:mm (24h)"),

  // Notas (opcional)
  body("notas")
    .optional()
    .isLength({ max: 200 })
    .withMessage("Las notas no pueden superar los 200 caracteres"),

  // 🔥 Middleware final para manejar errores de validación
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        ok: false,
        errors: errors.array().map((e) => e.msg),
      });
    }
    next();
  },
];
