import { body, param } from "express-validator";
import { handleValidationErrors } from "./validacionErrores.middleware.js";



export const validacionesCrearResenia = [
  body("nombre")
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .isLength({ min: 2, max: 50 })
    .withMessage("El nombre debe tener entre 2 y 50 caracteres")
    .matches(/^[a-zA-Z0-9\s]+$/)
    .withMessage("El nombre solo puede contener letras, números y espacios")
    .trim(),

  body("comentario")
    .notEmpty()
    .withMessage("El comentario es obligatorio")
    .isLength({ min: 5, max: 300 })
    .withMessage("El comentario debe tener entre 5 y 300 caracteres")
    .matches(/^[a-zA-Z0-9\s.,!?]+$/)
    .withMessage("El comentario solo puede contener letras, números, espacios y signos básicos (.,!?)")
    .trim(),

  body("calificacion")
    .notEmpty()
    .withMessage("La calificacion es obligatoria")
    .isInt({ min: 1, max: 5 })
    .withMessage("La calificacion debe ser un número entre 1 y 5"),

  handleValidationErrors,
];

export const validacionesEditarResenia = [
  param("id").isMongoId().withMessage("El ID de la resenia no es válido"),

  body("nombre")
    .optional()
    .isLength({ min: 2, max: 50 })
    .withMessage("El nombre debe tener entre 2 y 50 caracteres")
    .matches(/^[a-zA-Z0-9\s]+$/)
    .withMessage("El nombre solo puede contener letras, números y espacios")
    .trim(),

  body("comentario")
    .optional()
    .isLength({ min: 5, max: 300 })
    .withMessage("El comentario debe tener entre 5 y 300 caracteres")
    .matches(/^[a-zA-Z0-9\s.,!?]+$/)
    .withMessage("El comentario solo puede contener letras, números, espacios y signos básicos (.,!?)")
    .trim(),

  body("calificacion")
    .optional()
    .isInt({ min: 1, max: 5 })
    .withMessage("La calificacion debe ser un número entre 1 y 5"),

  handleValidationErrors,
];
