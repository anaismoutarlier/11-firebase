import { useContext } from 'react'
import { AuthContext } from '../auth'
export default function Login() {
  const { firebase } = useContext(AuthContext)

  return (
    <div>
      <button onClick={() => firebase.login("google") }>Google Login</button>
      <button onClick={ () => firebase.login("facebook") }>Facebook Login</button>

      <button onClick={firebase.logout}>Logout</button>
    </div>
  )
}
