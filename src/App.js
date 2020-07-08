import React, { useState, useEffect } from "react"
import { FormControl, Input, IconButton } from "@material-ui/core"
import firebase from "firebase"
import FlipMove from "react-flip-move"
import SendIcon from "@material-ui/icons/Send"
// import firebase from "firebase"
// CSS
import "./App.css"
// Components
import Message from "./components/messenger/Message"
// Plugins
import { db } from "./plugins/firebase"

function App() {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState([
    { userName: "Test Man", text: "hello" },
  ])
  const [userName, setUserName] = useState("")

  // useEffect = run code on a condition in REACT
  useEffect(() => {
    setUserName(prompt("Please enter your name"))
    db.collection("messages")
      .orderBy("timeStamp", "desc")
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        )
      })
  }, [])

  const sendMessege = (event) => {
    event.preventDefault()
    // firestore
    db.collection("messages").add({
      text: input,
      userName: userName,
      timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
    })
    setInput("")
  }
  return (
    <div className="App">
      <img
        src="https://facebookbrand.com/wp-content/uploads/2018/09/Header-e1538151782912.png?w=100&h=100"
        alt="messenger"
      />
      <h1>This is Messenger!</h1>
      <h3>Welcome {userName}</h3>

      <div className="app__form_content">
        <form className="app__form">
          <FormControl className="app__formControl">
            <Input
              placeholder="Enter a message..."
              value={input}
              onChange={(event) => setInput(event.target.value)}
              className="app__input"
            />
            <IconButton
              type="submit"
              disabled={!input}
              variant="contained"
              color="primary"
              onClick={sendMessege}
              className="app__iconButton"
            >
              <SendIcon></SendIcon>
            </IconButton>
          </FormControl>
        </form>
      </div>

      <FlipMove className="app__flipMove">
        {messages.map((message) => (
          <Message key={message.id} message={message} userName={userName} />
        ))}
      </FlipMove>
    </div>
  )
}

export default App
