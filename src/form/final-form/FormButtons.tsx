import React, { Dispatch, SetStateAction } from 'react'
import { FormRenderProps } from 'react-final-form'
import { FORM_STATE } from './index'
import DynamicFormattedMessage from '../../components/common/ui/DynamicFormattedMessage'
import Button from '../../components/common/ui/Button'

interface IFormButtons extends FormRenderProps<any> {
  editState?: [FORM_STATE, Dispatch<SetStateAction<FORM_STATE>>]
  disabled?: boolean
  canEdit?: boolean
}

/**
 * Component used for handling form submissions or resets
 * {@code FORM_STATE} is used to manage the current options the user has over the parent form
 *
 * @param form
 * @param submitting
 * @param pristine
 * @param disabled
 * @param editState
 * @param canEdit
 * @constructor
 */
export const FormButtons = ({
  form,
  submitting,
  pristine,
  disabled = submitting,
  editState = [FORM_STATE.ADD, () => null],
  canEdit = true,
}: IFormButtons) => {
  const [formState, setFormState] = editState

  if (formState === FORM_STATE.VIEW && canEdit) {
    return (
      <DynamicFormattedMessage
        tag={Button}
        id="form.button.edit"
        onClick={() => setFormState(FORM_STATE.EDIT)}
        disabled={disabled}
      />
    )
  }

  if (formState === FORM_STATE.EDIT || formState === FORM_STATE.ADD) {
    return (
      <>
        <DynamicFormattedMessage
          tag={Button}
          id="form.button.save"
          type="submit"
          disabled={disabled}
        />
        <DynamicFormattedMessage
          id="form.button.reset"
          tag={Button}
          onClick={() => {
            // @ts-ignore restart missing in exposed types for the moment
            form.restart()
            if (formState === FORM_STATE.EDIT) setFormState(FORM_STATE.VIEW)
          }}
          disabled={formState !== FORM_STATE.EDIT && (disabled || pristine)}
        />
      </>
    )
  }

  return null
}
