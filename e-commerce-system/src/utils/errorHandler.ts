export class NetworkError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number = 503) {
    super(message);
    this.name = "NetworkError";
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, NetworkError.prototype);
  }
}

export class DataError extends Error {
  field?: string | undefined;

  constructor(message: string, field?: string) {
    super(message);
    this.name = "DataError";
    this.field = field;
    Object.setPrototypeOf(this, DataError.prototype);
  }
}
