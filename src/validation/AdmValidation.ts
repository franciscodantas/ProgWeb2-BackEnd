import Joi from 'joi';

export class AdmValidation {

  private static schema = Joi.object({
    name: Joi.string().required().messages({
      'string.base': 'The name must be a string.',
      'string.empty': 'The name cannot be empty.',
      'any.required': 'The name is required.',
    }),
    email: Joi.string().email().required().messages({
      'string.base': 'The email must be a string.',
      'string.email': 'The email must be a valid email.',
      'string.empty': 'The email cannot be empty.',
      'any.required': 'The email is required.',
    }),
    password: Joi.string().required().messages({
      'string.base': 'The password must be a string.',
      'string.password': 'The password must be a valid password.',
      'string.empty': 'The password cannot be empty.',
      'any.required': 'The password is required.',
    })
  });

  private static patchSchema = Joi.object({
    name: Joi.string().optional().messages({
      'string.base': 'The name must be a string.',
      'string.empty': 'The name cannot be empty.',
    }),
    email: Joi.string().email().optional().messages({
      'string.base': 'The email must be a string.',
      'string.email': 'The email must be a valid email.',
      'string.empty': 'The email cannot be empty.',
    }),
    password: Joi.string().required().messages({
      'string.base': 'The password must be a string.',
      'string.password': 'The password must be a valid password.',
      'string.empty': 'The password cannot be empty.',
      'any.required': 'The password is required.',
    }),
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
