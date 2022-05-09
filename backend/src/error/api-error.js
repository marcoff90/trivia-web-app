class ApiError {
  constructor(code, message) {
    this.code = code;
    this.message = message;
  }

  static badRequest(message) {
    return new ApiError(400, {error: message});
  }

  static forbidden(message) {
    return new ApiError(403, {error: message});
  }

  static unauthorized(message) {
    return new ApiError(401, {error: message});
  }

  static notFound(message) {
    return new ApiError(404, {error: message});
  }

  static conflict(message) {
    return new ApiError(409, {error: message});
  }
}

export default ApiError;
