import React from 'react'
import { Field } from 'react-final-form'
import { FormWrapper, OnSubmit } from '../form/final-form/FormWrapper'
import TextField from '../form/final-form/fields/TextField'
import { integerToLocaleString, localeStringToInteger } from '../utils/number'
import { FormButtons } from '../form/final-form/FormButtons'
import { Condition } from '../form/final-form/fields/Condition'
import CheckboxField from '../form/final-form/fields/CheckboxField'
import { Validations } from '../form/final-form/validation'

export interface IFormExampleFields {
  name?: string
  surname?: string
  amount: number
  color: string
}

export const FinalFormExample: React.FC = () => {
  const onSubmit: OnSubmit<IFormExampleFields> = (values) => {
    alert(JSON.stringify(values, null, 2))
  }

  return (
    <FormWrapper onSubmit={onSubmit}>
      {(formProps) => {
        return (
          <div>
            <Field
              name="name"
              component={TextField}
              validate={Validations.required}
            />
            <Field name="surname" component={TextField} />
            <Field
              name="amount"
              validate={Validations.composeValidators(
                Validations.required,
                Validations.minValue(1213)
              )}
              parse={(v) => localeStringToInteger(v)}
              format={(v) => integerToLocaleString(v)}
              component={TextField}
            />
            <Field
              name="color"
              component="select"
              className="test-class"
              multiple={true}
            >
              <option value="FF0000">Red</option>
              <option value="00FF00">Green</option>
              <option value="0000FF">Blue</option>
            </Field>

            <Field type="checkbox" name="isAdmin" component={CheckboxField} />

            <Condition when="isAdmin" is={true}>
              <Field name="address" component={TextField} isMandatory={true} />
            </Condition>

            <FormButtons {...formProps} />
          </div>
        )
      }}
    </FormWrapper>
  )
}
