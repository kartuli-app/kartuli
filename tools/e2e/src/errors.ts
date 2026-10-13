export class E2eConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'E2eConfigError';
  }
}
