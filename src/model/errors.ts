
export class AppError extends Error {
    constructor(public status: number, message: string, public error?: Error) {
        super(message);
    }
}
export class AuthenticationError extends Error {
}
export class InvalidDataError extends Error {}
export class NotFoundError extends Error {}