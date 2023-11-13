class Unauthorized extends Error {
  public code: number;
  public name: string;

  constructor(message: string) {
    super(message);
    this.code = 401;
    this.name = 'Unauthorized';
  }
}

export default Unauthorized;
