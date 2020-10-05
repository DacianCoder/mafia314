import React from 'react'
import { NavLink } from 'react-router-dom'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import { Box } from '@material-ui/core'
import navbarStyles from './navbarStyles'

export const Navbar: React.FC = () => {
  const styles = navbarStyles()

  return (
    <AppBar position="static">
      <Toolbar className={styles.toolbar}>
        <Typography variant="h6">Mafia 314</Typography>
        <Box>
          <Button component={NavLink} to="/" color="inherit">
            Home
          </Button>
          <Button component={NavLink} to="/about" color="inherit">
            About
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
