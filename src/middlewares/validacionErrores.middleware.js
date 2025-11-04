import { validationResult } from "express-validator";

export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    console.log(errors);
    const formattedErrors = errors.array().map((err) => ({
      field: err.path || err.param,
      message: err.msg, 
      value: err.value,
    }));
    return res.status(400).json({
      success: false,
      message: "Errores de validación",
      errors: formattedErrors,
      totalErrors: formattedErrors.length,
    });
  }
  next();
};