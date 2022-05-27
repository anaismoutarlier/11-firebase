import { useContext } from 'react'
import { AuthContext } from '../auth'
export default function Login() {
  const { user, firebase } = useContext(AuthContext)

  return (
    <div style={ { display: 'flex', flexDirection: "column", alignItems: "center" } }>
      <h3>No user logged.</h3>
      <div>
        <button onClick={() => firebase.login("google") }>Google Login</button>
        <button onClick={ () => firebase.login("facebook") }>Facebook Login</button>
      </div>
    </div>
  )
}
