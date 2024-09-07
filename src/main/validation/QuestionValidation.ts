import Joi from 'joi';

export class QuestionValidation {
  private static schema = Joi.object({
    title: Joi.string().required().messages({
      'string.base': 'The title must be a string.',
      'string.empty': 'The title cannot be empty.',
      'any.required': 'The title is required.',
    }),
    content: Joi.string().required().messages({
      'string.base': 'The content must be a string.',
      'string.empty': 'The content cannot be empty.',
      'any.required': 'The content is required.',
    }),
    answer: Joi.string().required().messages({
      'string.base': 'The answer must be a string.',
      'string.empty': 'The answer cannot be empty.',
      'any.required': 'The answer is required.',
    }),
    image: Joi.binary().optional().messages({
      'binary.base': 'The image must be a binary type.',
    }),
    professorId: Joi.number().integer().optional().messages({
      'number.base': 'The professor ID must be an integer.',
    }),
    studentId: Joi.number().integer().optional().messages({
      'number.base': 'The student ID must be an integer.',
    }),
    disciplineId: Joi.number().integer().required().messages({
      'number.base': 'The discipline ID must be an integer.',
      'any.required': 'The discipline ID is required.',
    }),
  });

  private static patchSchema = Joi.object({
    title: Joi.string().optional().messages({
      'string.base': 'The title must be a string.',
      'string.empty': 'The title cannot be empty.',
    }),
    content: Joi.string().optional().messages({
      'string.base': 'The content must be a string.',
      'string.empty': 'The content cannot be empty.',
    }),
    answer: Joi.string().optional().messages({
      'string.base': 'The answer must be a string.',
      'string.empty': 'The answer cannot be empty.',
    }),
    image: Joi.binary().optional().messages({
      'binary.base': 'The image must be a binary type.',
    }),
    professorId: Joi.number().integer().optional().messages({
      'number.base': 'The professor ID must be an integer.',
    }),
    studentId: Joi.number().integer().optional().messages({
      'number.base': 'The student ID must be an integer.',
    }),
    disciplineId: Joi.number().integer().optional().messages({
      'number.base': 'The discipline ID must be an integer.',
    }),
  }).min(1).messages({
    'object.min': 'At least one field must be provided for update.',
  });

  private static updateSchema = Joi.object({
    title: Joi.string().required().messages({
      'string.base': 'The title must be a string.',
      'string.empty': 'The title cannot be empty.',
      'any.required': 'The title is required.',
    }),
    content: Joi.string().required().messages({
      'string.base': 'The content must be a string.',
      'string.empty': 'The content cannot be empty.',
      'any.required': 'The content is required.',
    }),
    answer: Joi.string().required().messages({
      'string.base': 'The answer must be a string.',
      'string.empty': 'The answer cannot be empty.',
      'any.required': 'The answer is required.',
    }),
    image: Joi.binary().required().messages({
      'binary.base': 'The image must be a binary type.',
    }),
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

  public static validateUpdate(data: any) {
    const { error } = this.updateSchema.validate(data, { abortEarly: false });
    if (error) {
      return error.details.map(detail => detail.message);
    }
    return null;
  }
  
}
