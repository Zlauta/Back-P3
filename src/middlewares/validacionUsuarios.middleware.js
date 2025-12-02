import { body, param } from "express-validator";
import { handleValidationErrors } from "../middlewares/validacionErrores.middleware.js";
import UsuarioModel from "../models/Usuario.js";

export const crearUsuarioValidator = [
  body("nombre")
    .notEmpty()
    .withMessage("El nombre de usuario es requerido")
    .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s'-]+$/)
    .withMessage("Solo se permiten letras")
    .isLength({ min: 3, max: 30 })
    .withMessage("El nombre debe tener entre 3 y 30 caracteres")
    .trim(),

  body("email")
    .notEmpty()
    .withMessage("El correo electrónico es requerido")
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
    .withMessage("El correo electrónico debe ser válido")
    .trim()
    .custom(async (value) => {
      const emailExistente = await UsuarioModel.findOne({ email: value });
      if (emailExistente) {
        throw new Error("El correo electrónico ya está en uso");
      }
      return true;
    }),

  body("contrasenia")
    .notEmpty()
    .withMessage("La contraseña es requerida")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[\]{}]).{8,}$/
    )
    .withMessage(
      "La contraseña debe contener mayúsculas, minúsculas, números y caracteres especiales"
    ),

  body("rol")
    .optional()
    .isIn(["admin", "cliente"])
    .withMessage("El rol debe ser 'admin' o 'cliente'"),

  body("estado")
    .optional()
    .isIn(["activo", "inactivo"])
    .withMessage("El estado debe ser 'activo' o 'inactivo'"),

  body("telefono")
    .notEmpty()
    .withMessage("El teléfono es obligatorio")
    .matches(/^\+?[1-9]\d{7,14}$/)
    .withMessage(
      "El número de teléfono debe tener entre 8 y 15 dígitos, puede comenzar con “+” y no debe iniciar con 0."
    ),
  handleValidationErrors,
];

export const editarUsuarioValidator = [
  param("id").isMongoId().withMessage("El ID no es válido"),

  body("rol")
    .optional()
    .isIn(["admin", "cliente"])
    .withMessage("El rol debe ser 'admin' o 'cliente'")
    .trim(),

  body("estado")
    .optional()
    .isIn(["activo", "inactivo"])
    .withMessage("El estado debe ser 'activo' o 'inactivo'")
    .trim(),

  body("telefono")
    .optional()
    .matches(/^\+?[1-9]\d{7,14}$/)
    .withMessage(
      "El número de teléfono debe tener entre 8 y 15 dígitos, puede comenzar con “+” y no debe iniciar con 0."
    )
    .trim(),

  handleValidationErrors,
];
