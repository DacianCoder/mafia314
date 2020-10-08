import React from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { Box } from '@material-ui/core'
import navbarStyles from './navbarStyles'
import DynamicFormattedMessage from '../common/ui/DynamicFormattedMessage'
import { ROUTES } from '../../constants/routes'
import { signOutWithGoogle } from '../../api/auth'

export const Navbar: React.FC = () => {
  const styles = navbarStyles()
  const history = useHistory()

  return (
    <AppBar position="static">
      <Toolbar className={styles.toolbar}>
        <Typography variant="h6">Mafia 314</Typography>
        <Box>
          <DynamicFormattedMessage
            id="home"
            tag={Button}
            component={NavLink}
            to={ROUTES.HOME}
          />

          <DynamicFormattedMessage
            id="signOut"
            onClick={() => signOutWithGoogle(history)}
            tag={Button}
          />
        </Box>
      </Toolbar>
    </AppBar>
  )
}
