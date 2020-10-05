import React, { ButtonHTMLAttributes, MouseEvent, ReactNode } from 'react'

interface ICustomButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  loading: boolean
}

const Button: React.FunctionComponent<ICustomButton> = ({
  children,
  onClick = () => null,
  type = 'button',
  disabled = false,
  loading = false,
  className = '',
  ...rest
}) => {
  const handleClick = (props: MouseEvent<HTMLButtonElement>) =>
    !disabled && onClick(props)

  return (
    <button
      {...{ onClick: handleClick, disabled, type, ...rest }}
      className={className}
    >
      {/* TODO: Style loading */}
      {loading ? 'loading' : children}
    </button>
  )
}

export default Button
