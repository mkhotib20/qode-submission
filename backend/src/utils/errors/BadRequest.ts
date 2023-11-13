class BadRequest extends Error {
  public code: number;
  public name: string;

  constructor(message: string) {
    super(message);
    this.code = 400;
    this.name = 'Bad Request';
  }
}

export default BadRequest;
