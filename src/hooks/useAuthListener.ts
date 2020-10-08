import { useEffect, useState } from 'react'

import { LOGGED_IN_COOKIE } from '../api/constants'
import { registerUserToGame, generateUserDocument } from '../api'
import { auth } from '../api/auth'

/**
 * Watch the current authentication object from firebase
 */
export const useAuthListener = () => {
  const [isLogged, setIsLogged] = useState(false)

  useEffect(() => {
    auth.onAuthStateChanged(async (userAuth) => {
      if (!userAuth) {
        setIsLogged(false)
        return localStorage.removeItem(LOGGED_IN_COOKIE)
      }

      const user = await generateUserDocument(userAuth)
      await registerUserToGame(user)
      setIsLogged(true)
      localStorage.setItem(LOGGED_IN_COOKIE, JSON.stringify(user))
    })
  }, [])

  return isLogged
}
