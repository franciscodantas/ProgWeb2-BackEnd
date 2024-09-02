import Joi from 'joi';

export class DisciplineValidation {

  private static schema = Joi.object({
    courseCode: Joi.string().required().messages({
      'string.base': 'The course code must be a string.',
      'string.empty': 'The course code cannot be empty.',
      'any.required': 'The course code is required.',
    }),
    curriculumCode: Joi.string().required().messages({
      'string.base': 'The curriculum code must be a string.',
      'string.empty': 'The curriculum code cannot be empty.',
      'any.required': 'The curriculum code is required.',
    }),
    subjectCode: Joi.string().required().messages({
      'string.base': 'The subject code must be a string.',
      'string.empty': 'The subject code cannot be empty.',
      'any.required': 'The subject code is required.',
    }),
    name: Joi.string().required().messages({
      'string.base': 'The name must be a string.',
      'string.empty': 'The name cannot be empty.',
      'any.required': 'The name is required.',
    }),
    type: Joi.string().required().messages({
      'string.base': 'The type must be a string.',
      'string.empty': 'The type cannot be empty.',
      'any.required': 'The type is required.',
    }),
  });

  private static patchSchema = Joi.object({
    courseCode: Joi.string().optional().messages({
      'string.base': 'The course code must be a string.',
      'string.empty': 'The course code cannot be empty.',
    }),
    curriculumCode: Joi.string().optional().messages({
      'string.base': 'The curriculum code must be a string.',
      'string.empty': 'The curriculum code cannot be empty.',
    }),
    subjectCode: Joi.string().optional().messages({
      'string.base': 'The subject code must be a string.',
      'string.empty': 'The subject code cannot be empty.',
    }),
    name: Joi.string().optional().messages({
      'string.base': 'The name must be a string.',
      'string.empty': 'The name cannot be empty.',
    }),
    type: Joi.string().optional().messages({
      'string.base': 'The type must be a string.',
      'string.empty': 'The type cannot be empty.',
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
