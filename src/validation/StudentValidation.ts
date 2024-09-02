import Joi from 'joi';

export class StudentValidation {

  private static schema = Joi.object({
    id: Joi.number().integer().required().messages({
      'number.base': 'The id must be a number.',
      'number.integer': 'The id must be an integer.',
      'any.required': 'The id is required.',
    }),
    name: Joi.string().required().messages({
      'string.base': 'The name must be a string.',
      'string.empty': 'The name cannot be empty.',
      'any.required': 'The name is required.',
    }),
    identityProviderId: Joi.string().required().messages({
      'string.base': 'The identity provider ID must be a string.',
      'string.empty': 'The identity provider ID cannot be empty.',
      'any.required': 'The identity provider ID is required.',
    }),
    code: Joi.string().required().messages({
      'string.base': 'The code must be a string.',
      'string.empty': 'The code cannot be empty.',
      'any.required': 'The code is required.',
    }),
    email: Joi.string().email().required().messages({
      'string.base': 'The email must be a string.',
      'string.email': 'The email must be a valid email.',
      'string.empty': 'The email cannot be empty.',
      'any.required': 'The email is required.',
    })
  });

  private static patchSchema = Joi.object({
    name: Joi.string().optional().messages({
      'string.base': 'The name must be a string.',
      'string.empty': 'The name cannot be empty.',
    }),
    identityProviderId: Joi.string().optional().messages({
      'string.base': 'The identity provider ID must be a string.',
      'string.empty': 'The identity provider ID cannot be empty.',
    }),
    code: Joi.string().optional().messages({
      'string.base': 'The code must be a string.',
      'string.empty': 'The code cannot be empty.',
    }),
    email: Joi.string().email().optional().messages({
      'string.base': 'The email must be a string.',
      'string.email': 'The email must be a valid email.',
      'string.empty': 'The email cannot be empty.',
    })
  }).min(1).messages({
    'object.min': 'At least one field must be provided for update.',
  });

  public static validate(data: any) {
    const { error } = this.schema.validate(data, { abortEarly: false });
    if (error) {
      return error.details.map(detail => detail.message);
    }
    return null;
  }

  public static validatePatch(data: any) {
    const { error } = this.patchSchema.validate(data, { abortEarly: false });
    if (error) {
      return error.details.map(detail => detail.message);
    }
    return null;
  }
}
