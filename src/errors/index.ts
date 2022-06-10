export class CustomError extends Error {
  status?: number;
  description?: string;
}

export class UnauthorizedError extends CustomError {
  constructor(message: string = 'User is not authorized') {
    super('Unauthorized');
    this.status = 401;
    this.name = 'UnauthorizedError';
    this.message = message;
  }
}

export class BadRequestError extends CustomError {
  constructor(message: string = 'Bad request') {
    super('Bad Request');
    this.status = 400;
    this.name = 'BadRequestError';
    this.message = message;
  }
}
