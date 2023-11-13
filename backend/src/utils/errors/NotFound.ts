class NotFound extends Error {
  public code: number;
  public name: string;

  constructor(message: string) {
    super(message);
    this.code = 404;
    this.name = 'Not Found';
  }
}

export default NotFound;
