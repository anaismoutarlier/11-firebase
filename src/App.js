import './App.css';
import useAuth, { AuthContext } from "./auth"

import { Login, User } from "./components"

function App() {
  const { user, firebase } = useAuth()

  return (
    <AuthContext.Provider value={ { user, firebase } } >
      <div className="App">
        <header className="App-header">

          <User />
          <Login />

        </header>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
