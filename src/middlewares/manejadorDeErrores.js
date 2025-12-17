import AppError from "../utils/appError.js";

const handleCastErrorDB = (err) => {
  const message = `ID inválido: ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err) => {

  const textoError = err.errmsg || err.message || "";

  const match = textoError.match(/(["'])(\\?.)*?\1/);

  const value = match ? match[0] : "campo duplicado";

  const message = `Valor duplicado: ${value}. Por favor usá otro.`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Datos inválidos: ${errors.join(". ")}`;
  return new AppError(message, 400);
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    ok: false,
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      ok: false,
      status: err.status,
      message: err.message,
    });
  } else {
    console.error("ERROR 💥", err);
    res.status(500).json({
      ok: false,
      status: "error",
      message: "Algo salió mal, por favor intentá más tarde.",
    });
  }
};

export default (err, req, res, _next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else {
    let error = { ...err };
    error.message = err.message;

    if (error.name === "CastError") {
      error = handleCastErrorDB(error);
    }
    if (error.code === 11000) {
      error = handleDuplicateFieldsDB(error);
    }
    if (error.name === "ValidationError") {
      error = handleValidationErrorDB(error);
    }

    sendErrorProd(error, res);
  }
};
