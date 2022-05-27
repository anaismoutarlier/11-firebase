import { useContext } from 'react'
import { AuthContext } from '../auth'

export default function User() {
  const { user, firebase } = useContext(AuthContext)

  return user ? (
    <>
      <img src={ user.photoURL } className="avatar" />
      <h3 className="username">{ user.displayName }</h3>
      <button onClick={firebase.logout}>Logout</button>
    </>
  ) : null
}
