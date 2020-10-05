import React, { Fragment } from 'react'
import { useHistory } from 'react-router-dom'

export const About: React.FC = () => {
  const history = useHistory()

  return (
    <Fragment>
      <h1>About</h1>
      <p>Second page with go back button</p>
      <button type="button" className="btn" onClick={() => history.push('/')}>
        Go back
      </button>
    </Fragment>
  )
}
