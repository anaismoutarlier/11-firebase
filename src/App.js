import { useState, useEffect } from "react"

import './App.css';
import useAuth, { AuthContext } from "./auth"

import { Login, User } from "./components"

function App() {
  //STATE_______________________________________
  const [text, setText] = useState("")
  const [messages, setMessages] = useState([])

  //AUTH________________________________________
  const { user, firebase } = useAuth()

  useEffect(() => {
    const unsubscribe = firebase.getMessages(handleSnapshot)

    return () => unsubscribe()
  }, [])

  //FUNCTIONS___________________________________
  const handleTextChange = e => setText(e.target.value)

  const handleSnapshot = snapshot => {
    const messages = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))

    console.log(messages)
    setMessages(messages)
  }

  const handleSubmit = e => {
    e.preventDefault()

    const message = {
      text,
      author: {
        uid: user.uid,
        displayName: user.displayName,
        avatar: user.photoURL
      },
      createdAt: new Date()
    }

    firebase.newMessage(message)
    setText("")
  }

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
              {
                messages.map(message => (
                  <div className="message" key={ message.id }>
                    <img className="avatar" src={ message.author.avatar } />
                    <p>{ message.text }</p>
                  </div>
                ))
              }
            </div>
            <div className='input'>
              <form onSubmit={ handleSubmit } style={{ width: '100%'}}>
                <input type="text" value={ text } onChange={ handleTextChange } />
                <button style={{ marginLeft: 3 }} type="submit">SEND</button>
              </form>
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
