export function httpError(status, message) {
  const error = new Error(message);
  error.status = status;
  return error;
}

export function notFoundHandler(req, res, next) {
  next(
    httpError(
      404,
      `Route ${req.method} ${req.originalUrl} nicht gefunden`
    )
  );
}

/* export function errorHandler(error, req, res, next) {
  const status = error.status || 500;

  res.status(status).json({
    message: error.message || "Internal server error",
  });
} */