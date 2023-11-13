class BaseError extends Error {
  public code: number;

  constructor(code: number, { message }: { message: string; stack: unknown }) {
    super(message);
    this.code = code;
  }
}

export default BaseError;
