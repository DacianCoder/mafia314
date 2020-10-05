import React from 'react'
import { FieldRenderProps } from 'react-final-form'
import DynamicFormattedMessage from '../../../components/common/ui/DynamicFormattedMessage'

interface ICheckboxField extends FieldRenderProps<boolean> {
  type: 'checkbox'
  value: undefined
}

const CheckboxField: React.FC<ICheckboxField> = ({
  input,
  wrapperClass = '',
  meta,
  label = input.name,
  ...rest
}) => {
  return (
    <div className={wrapperClass}>
      <label htmlFor={`${label}id`}>
        <div className="checkbox-content">
          <input
            {...input}
            {...rest}
            className="checkbox-input"
            id={`${label}id`}
          />
        </div>
        <DynamicFormattedMessage tag="span" id={`form.field.${label}.label`} />
      </label>
      <DynamicFormattedMessage
        tag="span"
        id={`form.validation.${meta.error}`}
        shouldRender={!!meta.error && meta.touched}
      />
    </div>
  )
}

export default CheckboxField
