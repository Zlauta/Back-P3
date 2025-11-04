import { body, param } from "express-validator";
import { handleValidationErrors } from "../middlewares/validacionErrores.middleware.js";
import ProductoModel from "../models/producto.js";

export const validacionesCrearProducto = [
  body("nombre")
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .isLength({ min: 2, max: 50 })
    .withMessage("El nombre debe tener entre 2 y 50 caracteres")
    .matches(/^[a-zA-ZñÑáéíóúÁÉÍÓÚüÜ0-9\s]+$/)
    .withMessage("El nombre solo puede contener letras, números, espacios y caracteres en español")
    .custom(async (value) => {
      const productoExistente = await ProductoModel.findOne({ nombre: value });
      if (productoExistente) {
        throw new Error("El nombre del producto ya existe");
      }
      return true;
    })
    .trim(),

  body("descripcion")
    .notEmpty()
    .withMessage("La descripción es obligatoria")
    .isLength({ min: 10, max: 500 })
    .withMessage("Debe ingresar una descripción entre 10 y 500 caracteres")
    .matches(/^[a-zA-Z0-9\s]+$/)
    .withMessage(
      "La descripción solo puede contener letras, números y espacios"
    )
    .trim(),

  body("precio")
    .notEmpty()
    .withMessage("El precio es obligatorio")
    .matches(/^\d+(\.\d{1,2})?$/)
    .withMessage("El precio debe ser un número válido con hasta 2 decimales")
    .isFloat({ min: 0 })
    .withMessage("Debe ingresar un número válido para el precio"),

  body("categoria")
    .notEmpty()
    .withMessage("La categoría es obligatoria")
    .isIn(["comida", "bebida", "postre"])
    .withMessage("La categoría debe ser 'comida', 'bebida' o 'postre'"),

  body("imagen")
    .notEmpty()
    .withMessage("La imagen es obligatoria")
    .isURL()
    .withMessage("La imagen debe ser una URL válida")
    .matches(/\.(jpg|jpeg|png|webp)$/)
    .withMessage(
      "La imagen debe ser una URL que apunte a un archivo JPG, PNG o WEBP"
    )
    .matches(/^https:\/\/.+/)
    .withMessage("La imagen debe usar HTTPS"),

  handleValidationErrors,
];

export const validacionesEditarProducto = [
  param("id").isMongoId().withMessage("El ID del producto no es válido"),

  body("nombre")
    .optional()
    .isLength({ min: 2, max: 50 })
    .withMessage("El nombre debe tener entre 2 y 50 caracteres")
    .matches(/^[a-zA-Z0-9\s]+$/)
    .withMessage("El nombre solo puede contener letras, números y espacios")
    .custom(async (value) => {
      const productoExistente = await ProductoModel.findOne({ nombre: value });
      if (productoExistente) {
        throw new Error("El nombre del producto ya existe");
      }
      return true;
    })
    .trim(),

  body("descripcion")
    .optional()
    .isLength({ min: 10, max: 500 })
    .withMessage("Debe ingresar una descripción entre 10 y 500 caracteres")
    .matches(/^[a-zA-Z0-9\s]+$/)
    .withMessage(
      "La descripción solo puede contener letras, números y espacios"
    )
    .trim(),

  body("precio")
    .optional()
    .matches(/^\d+(\.\d{1,2})?$/)
    .withMessage("El precio debe ser un número válido con hasta 2 decimales")
    .isFloat({ min: 0 })
    .withMessage("Debe ingresar un número válido para el precio"),

  body("categoria")
    .optional()
    .isIn(["comida", "bebida", "postre"])
    .withMessage("La categoría debe ser 'comida', 'bebida' o 'postre'"),

  body("imagen")
    .optional()
    .isURL()
    .withMessage("La imagen debe ser una URL válida")
    .matches(/\.(jpg|jpeg|png|webp)$/)
    .withMessage(
      "La imagen debe ser una URL que apunte a un archivo JPG, PNG o WEBP"
    )
    .matches(/^https:\/\/.+/)
    .withMessage("La imagen debe usar HTTPS"),

  handleValidationErrors,
];
