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
  field?: string;

  constructor(message: string, field?: string) {
    super(message);
    this.name = "DataError";
    this.field = field;
    Object.setPrototypeOf(this, DataError.prototype);
  }
}

export function handleError(error: unknown): void {
  if (error instanceof NetworkError) {
    console.error(`[NetworkError ${error.statusCode}] ${error.message}`);
  } else if (error instanceof DataError) {
    console.error(
      `[DataError${error.field ? ` on field "${error.field}"` : ""}] ${error.message}`,
    );
  } else if (error instanceof Error) {
    console.error(`[Error] ${error.message}`);
  } else {
    console.error("[Unknown Error]", error);
  }
}