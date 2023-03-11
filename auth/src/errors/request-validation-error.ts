import { ValidationError } from "express-validator"

export class RequestValidationError extends Error {
  
  constructor(private errors: ValidationError[]){
    super()
    // Only becaue we are extending a build in class
    Object.setPrototypeOf(this, RequestValidationError.prototype)
  }
}