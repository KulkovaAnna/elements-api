export class UnauthorizedError extends Error {
  constructor(msg: string = null) {
    super();
    this.message = msg ?? 'Неавторизованный пользователь';
  }
}
