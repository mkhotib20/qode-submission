class NotAcceptable extends Error {
  public code: number;
  public name: string;

  constructor(message: string) {
    super(message);
    this.code = 406;
    this.name = 'Not Acceptable';
  }
}

export default NotAcceptable;
