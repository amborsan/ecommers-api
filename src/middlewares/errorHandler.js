export function httpError(status, message) {
  const err = new Error(message);
  err.status = status;
  return err;
}

export function notFoundHandler(req, res) {
  res.status(404).json({
    error: `Route ${req.method} ${req.originalUrl} not found.`,
  });
}

export function errorHandler(err, req, res, next) {
  const status = err.status || 500;
  res.status(status).json({
    status,
    error: err.message || "Internal Server Error",
  });
}
