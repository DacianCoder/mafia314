import React from 'react'
import { FieldRenderProps } from 'react-final-form'
import DynamicFormattedMessage from '../../../components/common/ui/DynamicFormattedMessage'
import { getValidationErrorMessage } from '../validation'

const TextField = ({
  input,
  meta,
  wrapperClass = '',
  placeHolder = '',
  showLabel = true,
  label = input.name,
  isMandatory = false,
  ...rest
}: FieldRenderProps<string>) => {
  const [errorMessage, errorValues] = getValidationErrorMessage(meta.error)

  return (
    <div className={wrapperClass}>
      {showLabel && (
        <>
          <DynamicFormattedMessage
            tag="label"
            id={`form.field.${label}.label`}
          />
          {isMandatory && ' *'}
        </>
      )}
      <input
        {...input}
        {...rest}
        type={input.type || 'text'}
        placeholder={placeHolder}
      />
      <DynamicFormattedMessage
        tag="span"
        id={`form.validation.${errorMessage}`}
        values={errorValues}
        shouldRender={!!errorMessage && meta.touched}
      />
    </div>
  )
}

export default TextField
