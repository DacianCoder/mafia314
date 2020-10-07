import React, { FC, Fragment, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import DynamicFormattedMessage from '../components/common/ui/DynamicFormattedMessage'
import { signInWithGoogle } from '../api/firebase'
import { getCookieSliceOr } from '../utils'
import { LOGGED_IN_COOKIE } from '../api/constants'
import { ROUTES } from '../constants/routes'

export const WelcomePage: FC = () => {
  const history = useHistory()

  const isUserLogged = getCookieSliceOr(LOGGED_IN_COOKIE)

  useEffect(() => {
    if (isUserLogged) {
      history.push(ROUTES.HOME)
    }
  }, [isUserLogged])

  if (isUserLogged) {
    return null
  }

  return (
    <Fragment>
      <button
        onClick={() => signInWithGoogle(history)}
        style={{ backgroundColor: '#349eeb' }}
      >
        <img
          alt="google logo"
          src="https://img.icons8.com/color/32/000000/google-logo.png"
          width={32}
        />
        <DynamicFormattedMessage id="signIn" />
      </button>
    </Fragment>
  )
}
