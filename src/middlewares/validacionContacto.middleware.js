import { body, param } from "express-validator";
import { handleValidationErrors } from "../middlewares/validacionErrores.middleware.js";

export const validacionesCrearContacto = [
  body("nombre")
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .isLength({ min: 2, max: 50 })
    .withMessage("El nombre debe tener entre 2 y 50 caracteres")
    .matches(/^[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ\s]+$/)
    .withMessage(
      "El nombre solo puede contener letras, espacios y caracteres en español, y entre 2 y 50 caracteres"
    )
    .trim(),

  body("email")
    .notEmpty()
    .withMessage("El email es obligatorio")
    .isEmail()
    .withMessage("Debe ingresar un email válido")
    .normalizeEmail(),

  body("telefono")
    .notEmpty()
    .withMessage("El teléfono es obligatorio")
    .matches(/^\+?[1-9]\d{1,14}$/)
    .withMessage(
      "El teléfono debe estar en formato internacional, por ejemplo: +5493811234567"
    )
    .trim(),

  body("mensaje")
    .notEmpty()
    .withMessage("El mensaje es obligatorio")
    .isLength({ min: 5, max: 500 })
    .withMessage("El mensaje debe tener entre 5 y 500 caracteres")
    .matches(/^[a-zA-ZÀ-ÿ0-9.,;:¡!¿?\-()'"%°\s]{5,500}$/u)
    .withMessage("El mensaje contiene caracteres no permitidos")
    .trim(),

  handleValidationErrors,
];

export const validacionesEditarContacto = [
  param("id").isMongoId().withMessage("El ID del contacto no es válido"),

  body("nombre")
    .optional()
    .isLength({ min: 2, max: 50 })
    .withMessage("El nombre debe tener entre 2 y 50 caracteres")
    .matches(/^[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ\s]+$/)
    .withMessage(
      "El nombre solo puede contener letras, espacios y caracteres en español"
    )
    .trim(),

  body("email")
    .optional()
    .isEmail()
    .withMessage("Debe ingresar un email válido")
    .normalizeEmail(),

  body("telefono")
    .optional()
    .matches(/^\+?[1-9]\d{1,14}$/)
    .withMessage(
      "El teléfono solo puede contener números, espacios, +, - y () y debe tener entre 6 y 20 caracteres"
    )
    .trim(),

  body("mensaje")
    .optional()
    .isLength({ min: 5, max: 500 })
    .withMessage("El mensaje debe tener entre 5 y 500 caracteres")
    .matches(/^[a-zA-ZÀ-ÿ0-9.,;:¡!¿?\-()'"%°\s]{5,500}$/u)
    .withMessage("El mensaje contiene caracteres no permitidos")
    .trim(),

  handleValidationErrors,
];
