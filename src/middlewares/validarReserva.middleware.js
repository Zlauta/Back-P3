import { body} from "express-validator";
import { handleValidationErrors } from "./validacionErrores.middleware.js";

export const validarReserva = [
  body("mesa")
    .notEmpty()
    .withMessage("El número de mesa es obligatorio")
    .isInt({ min: 1, max: 30 })
    .withMessage("La mesa debe ser un número entero positivo"),

  body("cantidadPersonas")
    .notEmpty()
    .withMessage("Debe indicar la cantidad de personas")
    .isInt({ min: 1 })
    .withMessage("La cantidad de personas debe ser al menos 1"),

  body("fecha")
    .notEmpty()
    .withMessage("La fecha de la reserva es obligatoria")
    .isISO8601()
    .withMessage("La fecha debe tener un formato válido (YYYY-MM-DD)"),

  body("hora")
    .notEmpty()
    .withMessage("La hora de la reserva es obligatoria")
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/)
    .withMessage("La hora debe tener el formato HH:mm (24h)"),

  body("notas")
    .optional()
    .isLength({ max: 200 })
    .withMessage("Las notas no pueden superar los 200 caracteres"),

    handleValidationErrors
];
