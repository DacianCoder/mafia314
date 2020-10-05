import React, { ReactNode } from 'react'
import { Field } from 'react-final-form'

interface IConditionalField {
  when: string
  is: any
  children: ReactNode
}

/**
 * Component used for conditional rendering of final-form fields
 *
 * @param when name of an existing field
 * @param is same value and type with the above mentioned field value
 * @param children will be rendered
 * @constructor
 */
export const Condition: React.FC<IConditionalField> = ({
  when,
  is,
  children,
}) => {
  return (
    <Field name={when} subscription={{ value: true }}>
      {({ input: { value } }) => (value === is ? children : null)}
    </Field>
  )
}
