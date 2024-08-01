import { plainToInstance } from 'class-transformer';
import { validateOrReject, ValidationError } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { HttpException } from '@exceptions/HttpException';

/**
 * @name ValidationMiddleware
 * @description Allows use of decorator and non-decorator based validation
 * @param type dto
 * @param skipMissingProperties When skipping missing properties
 * @param whitelist Even if your object is an instance of a validation class it can contain additional properties that are not defined
 * @param forbidNonWhitelisted If you would rather to have an error thrown when any non-whitelisted properties are present
 */
export const ValidateBodyMiddleware = ValidationMiddlewareFactory('body');
export const ValidateQueryMiddleware = ValidationMiddlewareFactory('query');
export const ValidateParamMiddleware = ValidationMiddlewareFactory('params');

/**
 * @name ValidationMiddlewareFactory
 * @description Simple factory to create ValidationMiddleware
 * @param source 'body' | 'query' | 'params' choose base on what your need to validate
 */
function ValidationMiddlewareFactory(source: 'body' | 'query' | 'params') {
  return (type: any, skipMissingProperties = false, whitelist = false, forbidNonWhitelisted = false) => {
    return (req: Request, res: Response, next: NextFunction) => {
      const dto = plainToInstance(type, req[source]) as object;
      validateOrReject(dto, { skipMissingProperties, whitelist, forbidNonWhitelisted })
        .then(() => {
          req[source] = dto;
          next();
        })
        .catch((errors: ValidationError[]) => {
          const message = errors.map((error: ValidationError) => Object.values(error.constraints)).join(', ');
          next(new HttpException(400, message));
        });
    };
  };
}
