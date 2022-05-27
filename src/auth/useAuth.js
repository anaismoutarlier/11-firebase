import { useState, useEffect } from "react"
import firebase from "./firebase"

export default function useAuth() {
  const [user, setUser] = useState(null)
  
  useEffect(() => {
    const unsubscribe = firebase.auth.onAuthStateChanged(data => {
      if (data) {
        firebase.newUser(data)
        setUser(data)
      } else {
        setUser(null)
      }
    })

    return () => unsubscribe()
  }, [])

  return { user, firebase }
}
