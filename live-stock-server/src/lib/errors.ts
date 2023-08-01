export class InvalidDataError extends Error {
  constructor(message, internal?: any) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    (this as any).internal = internal;
    (this as any).isOperational = true; // This is required since bluebird 4 doesn't append it anymore.
    Error.captureStackTrace(this, (this as any).constructor.name);
  }
}

export class NotAuthorizedError extends Error {
  constructor(message, internal?: any) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    (this as any).internal = internal;
    (this as any).isOperational = true; // This is required since bluebird 4 doesn't append it anymore.
    Error.captureStackTrace(this, (this as any).constructor.name);
  }
}

/**
 * @extends Error
 */
class ExtendableError extends Error {
  constructor(message, status, isPublic, messages) {
    super(message);
    const x = this as any;
    x.name = x.constructor.name;
    x.message = message;
    x.messages = messages;
    x.status = status;
    x.isPublic = isPublic;
    x.isOperational = true; // This is required since bluebird 4 doesn't append it anymore.
    Error.captureStackTrace(this, x.constructor.name);
  }
}

/**
 * Class representing an API error.
 * @extends ExtendableError
 */
export class ApiError extends ExtendableError {
  /**
   * Creates an API error.
   * @param {string} message - Error message.
   * @param {number} status - HTTP status code of error.
   * @param {boolean} isPublic - Whether the message should be visible to user or not.
   */
  constructor(message, status = 500, isPublic = false, messages?: any) {
    super(message, status, isPublic, messages);
  }
}

export class NotFoundError extends Error {
  constructor(message, internal?: any) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    (this as any).internal = internal;
    (this as any).isOperational = true; // This is required since bluebird 4 doesn't append it anymore.
    Error.captureStackTrace(this, (this as any).constructor.name);
  }
}
