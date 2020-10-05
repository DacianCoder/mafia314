import React, { ReactElement } from 'react'
import { Form, FormProps, FormRenderProps } from 'react-final-form'

/**
 * Extends Final form props in order to be able to use them as FormWrapper Props
 */
export interface IFormConfig<FormValues> extends FormProps<FormValues> {
  children: (props: FormRenderProps<FormValues>) => ReactElement
}

/**
 * Uses a FormValues interface to strong type the form values and everything impacted by this generic
 */
export type OnSubmit<FormValues> = IFormConfig<FormValues>['onSubmit']

/**
 * Wrapper for final form components
 * Abstracts the repetitive code needed for declaring a form
 * Adds a default subscription in order to optimize the number of re-renders
 *
 * By providing a strongly typed onSubmit function, all other Final form features will have strongly typed FormValues
 *
 * @param children
 * @param rest
 * @constructor
 */
export function FormWrapper<FormValues>({
  children,
  ...rest
}: IFormConfig<FormValues>) {
  return (
    <Form subscription={{ submitting: true, pristine: true }} {...rest}>
      {(formProps) => {
        return (
          <form onSubmit={formProps.handleSubmit}>{children(formProps)}</form>
        )
      }}
    </Form>
  )
}
