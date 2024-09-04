import Joi from 'joi';

export class PaginationValidation {
  private static schema = Joi.object({
    page: Joi.number().integer().min(1).default(1).messages({
      'number.base': 'The page must be a number.',
      'number.integer': 'The page must be an integer.',
      'number.min': 'The page must be at least 1.',
      'any.default': 'The page defaults to 1 if not provided.',
    }),
    limit: Joi.number().integer().min(1).default(20).messages({
      'number.base': 'The limit must be a number.',
      'number.integer': 'The limit must be an integer.',
      'number.min': 'The limit must be at least 1.',
      'any.default': 'The limit defaults to 20 if not provided.',
    }),
  });

  public static validate(data: any) {
    const { error, value } = this.schema.validate(data, { abortEarly: false });
    if (error) {
      return error.details.map(detail => detail.message);
    }
    return value;
  }
}
