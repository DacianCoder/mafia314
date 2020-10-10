import { useEffect } from 'react'
import { useRecoilState } from 'recoil'

import { LOGGED_IN_COOKIE } from '../api/constants'
import { generateUserDocument, registerUserToGame } from '../api'
import { auth } from '../api/auth'
import { loggedUserAtom } from '../recoil/atoms'

/**
 * Watch the current authentication object from firebase
 */
export const useAuthListener = () => {
  const [loggedUser, setLoggedUser] = useRecoilState(loggedUserAtom)

  useEffect(() => {
    auth.onAuthStateChanged(async (userAuth) => {
      if (!userAuth) {
        setLoggedUser(null)
        return localStorage.removeItem(LOGGED_IN_COOKIE)
      }

      const user = await generateUserDocument(userAuth)
      await registerUserToGame(user)
      localStorage.setItem(LOGGED_IN_COOKIE, JSON.stringify(user))
      setLoggedUser(user || null)
    })
  }, [])

  return loggedUser
}
