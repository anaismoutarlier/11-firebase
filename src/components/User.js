import { useContext } from 'react'
import { AuthContext } from '../auth'

export default function User() {
  const { user } = useContext(AuthContext)

  return user ? (
    <>
      <img src={ user.photoURL } />
      <h3>{ user.displayName }</h3>
      <h3>{ user.uid }</h3>
    </>
  ) : (
    <div>
      <h2>No user.</h2>
    </div>
  )
}
