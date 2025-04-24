class appErrors extends Error {
  constructor(message, statusCode) {
    super();
    this.message = message;
    this.statusCode = statusCode;
    this.isOperationError = true;
  }
}

export default appErrors;
