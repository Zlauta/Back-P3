import { body, param } from "express-validator";
import { handleValidationErrors } from "../middlewares/validacionErrores.middleware.js";
import { contactoModel } from "../models/contacto.js";

export const validacionesCrearContacto = [
  body("nombre")
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .isLength({ min: 2, max: 50 })
    .withMessage("El nombre debe tener entre 2 y 50 caracteres")
    .matches(/^[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ\s]+$/)
    .withMessage(
      "El nombre solo puede contener letras, espacios y caracteres en español"
    )
    .custom(async (value) => {
      const existe = await contactoModel.findOne({ nombre: value });
      if (existe) throw new Error("El nombre ya existe en la base de datos");
      return true;
    })
    .trim(),

  body("email")
    .notEmpty()
    .withMessage("El email es obligatorio")
    .isEmail()
    .withMessage("Debe ingresar un email válido")
    .custom(async (value) => {
      const existe = await contactoModel.findOne({ email: value });
      if (existe) throw new Error("El email ya está registrado");
      return true;
    })
    .normalizeEmail(),

  body("telefono")
    .notEmpty()
    .withMessage("El teléfono es obligatorio")
    .matches(/^\+?[0-9\s\-()]{6,20}$/)
    .withMessage(
      "El teléfono solo puede contener números, espacios, +, - y () y debe tener entre 6 y 20 caracteres"
    )
    .trim(),

  body("fecha")
    .notEmpty()
    .withMessage("La fecha es obligatoria")
    .matches(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/)
    .withMessage("La fecha debe tener el formato DD/MM/YYYY"),

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
    .matches(/^\+?[0-9\s\-()]{6,20}$/)
    .withMessage(
      "El teléfono solo puede contener números, espacios, +, - y () y debe tener entre 6 y 20 caracteres"
    )
    .trim(),

  body("fecha")
    .optional()
    .matches(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/)
    .withMessage("La fecha debe tener el formato DD/MM/YYYY"),

  body("mensaje")
    .optional()
    .isLength({ min: 5, max: 500 })
    .withMessage("El mensaje debe tener entre 5 y 500 caracteres")
    .matches(/^[a-zA-ZÀ-ÿ0-9.,;:¡!¿?\-()'"%°\s]{5,500}$/u)
    .withMessage("El mensaje contiene caracteres no permitidos")
    .trim(),

  handleValidationErrors,
];
