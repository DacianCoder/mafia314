import { useEffect } from 'react'

import { auth, generateUserDocument } from '../api/firebase'
import { LOGGED_IN_COOKIE } from '../api/constants'

/**
 * Hook used to init watcher of authentication
 */
export const useAuthListener = () => {
  useEffect(() => {
    auth.onAuthStateChanged(async (userAuth) => {
      if (!userAuth) {
        return localStorage.removeItem(LOGGED_IN_COOKIE)
      }
      const user = await generateUserDocument(userAuth)

      localStorage.setItem(
        LOGGED_IN_COOKIE,
        JSON.stringify(user?.uid && { id: user?.uid, photoURL: user?.photoURL })
      )
    })
  }, [])
}
