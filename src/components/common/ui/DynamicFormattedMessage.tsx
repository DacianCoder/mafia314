import React, { createElement, FunctionComponent } from 'react'
import { FormattedMessage } from 'react-intl'

type ITag = 'span' | 'div' | 'button' | 'p' | 'label' | FunctionComponent<any>

interface IDynamicFormattedMessage {
  tag?: ITag
  shouldRender?: boolean
  id: string
  defaultMessage?: string
  values?: any
  [key: string]: any
}

/**
 * Atom component used to render an intl message having as a wrapper a given tag
 *
 * @param className
 * @param tag
 * @param props
 * @constructor
 */
const DynamicFormattedMessage = ({
  tag = 'span',
  shouldRender = true,
  ...dynamicProps
}: IDynamicFormattedMessage) => {
  if (!shouldRender) return null

  const { defaultMessage, id, values, ...parentProps } = dynamicProps
  const messageProps = { defaultMessage, id, values: dynamicProps.values }

  return createElement(
    tag || 'span',
    parentProps,
    <FormattedMessage {...messageProps} />
  )
}

export default DynamicFormattedMessage
