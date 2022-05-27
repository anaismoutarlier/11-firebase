import { useState, useEffect } from "react"

import './App.css';
import "simplebar/dist/simplebar.min.css";

import useAuth, { AuthContext } from "./auth"

import { Login, User } from "./components"

import SimpleBar from "simplebar-react";

function App() {
  //STATE_______________________________________
  const [text, setText] = useState("")
  const [messages, setMessages] = useState([])
  const [activeUser, setActiveUser] = useState(null)
  const [status, setStatus] = useState(false)

  //AUTH________________________________________
  const { user, firebase } = useAuth()

  useEffect(() => {
    const unsubscribe = firebase.getMessages(handleSnapshot)

    return () => unsubscribe()
  }, [])

  useEffect(() => {
    const unsubscribe = firebase.getStatus(handleStatusChangeSnapshot)

    return () => unsubscribe()
  }, [])

  useEffect(() => {
    if (text.length && !status) {
      setStatus(true)
      firebase.setStatus(user.uid, true)
    } else if (!text.length && status) {
      setStatus(false)
      firebase.setStatus(user.uid, false)

    } 
  }, [text, user, status])

  //FUNCTIONS___________________________________
  const handleTextChange = e => {
    setText(e.target.value)
  }

  const handleStatusChangeSnapshot = snapshot => {
    const users = snapshot.docs.map(doc => ({
      ...doc.data()
    }))

    let user = users.find(el => el.active)
    if(user) setActiveUser(user)
    else setActiveUser(null)
  }

  const handleSnapshot = snapshot => {
    const messages = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))

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
              <SimpleBar style={{ height: '100%' }}>
                {
                  messages.map(message => (
                    <div className="message" key={ message.id }>
                      <div className="message-content">
                        <img className="avatar" alt="" src={ message.author.avatar } style={{ marginRight: 10 }}/>
                        <div>
                          <p className="author-name">{ message.author.displayName }</p>
                          <p className="message-text">{ message.text }</p>
                        </div>
                      </div>
                      <p>
                        { new Date(message.createdAt.toDate()).toLocaleTimeString("fr-fr", { hour: "2-digit", minute: '2-digit' }) }
                      </p>
                    </div>
                  ))
                }
              </SimpleBar>
            </div>
            <div className='input'>
              {
                activeUser ?
                <p style={{ margin: '5px 0px' }} className="author-name">{activeUser.displayName} is typing . . .</p>
                :
                <div style={{ height: "27px" }}></div>
              }
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
