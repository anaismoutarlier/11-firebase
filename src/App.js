import './App.css';
import useAuth, { AuthContext } from "./auth"

import { Login, User } from "./components"

function App() {
  const { user, firebase } = useAuth()

  return (
    <AuthContext.Provider value={ { user, firebase } } >
      {
        user ?
        <div className="App">
          <div className="sider">
            <User />
          </div>
          <div className="content">
            <div className="messages">

            </div>
            <div className='input'>
              <input type="text" />
              <button style={{ marginLeft: 3 }}>SEND</button>
            </div>
          </div>
        </div>
        : <div className='login'>
            <Login />
          </div>
      }
    </AuthContext.Provider>
  );
}

export default App;
