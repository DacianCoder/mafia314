import React, { createElement, ReactHTML } from 'react'
import { FormattedMessage } from 'react-intl'

interface IBase<T> {
  tag?: keyof ReactHTML | React.FC<T>
  shouldRender?: boolean
  id: string
  defaultMessage?: string
  values?: any
}

type IDynamicFormattedMessage<T> = IBase<T> &
  {
    [K in keyof T]: T[K]
  }

/**
 * Atom component used to render an intl message having as a wrapper a given tag
 *
 * @param tag
 * @param shouldRender
 * @param dynamicProps
 * @constructor
 */
function DynamicFormattedMessage<P extends object>({
  tag = undefined,
  shouldRender = true,
  ...dynamicProps
}: IDynamicFormattedMessage<P>) {
  if (!shouldRender) return null

  const { defaultMessage, id, values, ...parentProps } = dynamicProps
  const messageProps = { defaultMessage, id, values: dynamicProps.values }

  return createElement<P>(
    tag || 'span',
    parentProps as P,
    <FormattedMessage {...messageProps} />
  )
}

export default DynamicFormattedMessage
