import React, { FC, Fragment } from 'react'
import { useHistory } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import { Box } from '@material-ui/core'
import DynamicFormattedMessage from '../components/common/ui/DynamicFormattedMessage'
import { getCookieSliceOr } from '../utils'
import { signInWithGoogle } from '../api/auth'

const piLogo = require('../assets/img/pi.png')

export const WelcomePage: FC = () => {
  const history = useHistory()

  const isUserLogged = getCookieSliceOr()

  if (isUserLogged) {
    return null
  }

  return (
    <Fragment>
      <Box display="flex" justifyContent="center">
        <DynamicFormattedMessage id="appTitle" tag={Typography} variant="h3" />
      </Box>
      <Box display="flex" justifyContent="center">
        <button
          onClick={() => signInWithGoogle(history)}
          style={{ backgroundColor: '#349eeb' }}
        >
          <Box display="flex" justifyContent="center">
            <img
              alt="google logo"
              src="https://img.icons8.com/color/32/000000/google-logo.png"
              width={32}
            />
            <DynamicFormattedMessage
              id="signIn"
              tag={Typography}
              variant="h6"
            />
          </Box>
        </button>
      </Box>
      <Box display="flex" justifyContent="flex-end" alignItems="flex-end">
        <img src={piLogo} alt="Pi logo" />
      </Box>
    </Fragment>
  )
}
