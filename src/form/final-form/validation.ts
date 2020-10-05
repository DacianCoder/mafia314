import { FieldValidator } from 'final-form'
import { integerToLocaleString } from '../../utils/number'
import { EMAIL_REGEX, MIN_AGE } from '../../constants/form'

enum FIELD_VALIDATION {
  REQUIRED = 'required',
  NUMBER = 'number',
  MIN = 'min',
  MAX = 'max',
  FIRST_VALUE = 'firstValue',
  GREATER_THAN = 'greaterThan',
  FORMAT = 'format',
}

type IDynamicFormError = { type: string; values: any }

/**
 * Function used to parse complex field validation for field personalized error rendering
 *
 * @param error
 */
export const getValidationErrorMessage: (
  error: string | IDynamicFormError
) => [string, any?] = (error) => {
  if (typeof error === 'string' || !error) {
    return [error]
  }

  return [error.type, error.values]
}

/**
 * Class used for holding all the validations used in forms
 */
export class Validations {
  private constructor() {
    // class should never be instantiated
  }

  /**
   * Function used for merging N validators and returning the first error
   *
   * @param validators
   */

  static composeValidators<T>(
    ...validators: FieldValidator<T>[]
  ): FieldValidator<T> {
    return (...validatorProps) => {
      return validators.reduce(
        (error, validator) => error || validator(...validatorProps),
        undefined
      )
    }
  }

  static required: FieldValidator<any> = (value: any) =>
    value != null ? undefined : FIELD_VALIDATION.REQUIRED

  static mustBeNumber: FieldValidator<any> = (value) =>
    isNaN(value) ? FIELD_VALIDATION.NUMBER : undefined

  static minValue: (min: number) => FieldValidator<number> = (min) => (
    value
  ) => {
    if (!(isNaN(Number(value)) || value >= min))
      return {
        type: FIELD_VALIDATION.GREATER_THAN,
        values: [integerToLocaleString(min)],
      }
  }

  static matches: (
    regex: string,
    skipNull: boolean
  ) => FieldValidator<string> = (regex = EMAIL_REGEX, skipNull = false) => (
    value = ''
  ) => {
    if ((!skipNull && !value) || !RegExp(regex).test(value)) {
      return FIELD_VALIDATION.FORMAT
    }
  }

  static intervalEnd: (startField: string) => FieldValidator<Date> = (
    startField
  ) => (endField, values: any) => {
    if (!endField) {
      return FIELD_VALIDATION.REQUIRED
    }
    if (!values[startField]) {
      return FIELD_VALIDATION.FIRST_VALUE
    }
    if (values[startField]?.value >= endField!!) {
      return FIELD_VALIDATION.GREATER_THAN
    }
  }

  static minLength: (min: number) => FieldValidator<string> = (min: number) => (
    value
  ) => {
    if (!value || value.trim().length < min) {
      return FIELD_VALIDATION.MIN
    }
  }

  static minimumAge: (min: number) => FieldValidator<number> = (
    minAge = MIN_AGE
  ) =>
    Validations.composeValidators(
      Validations.required,
      Validations.minValue(minAge)
    )
}
