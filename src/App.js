import React, { useState, useEffect } from "react"
import { FormControl, Input, InputLabel, IconButton } from "@material-ui/core"
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
      <h3>Welcome: {userName}</h3>

      <form className="app__form">
        <FormControl>
          <InputLabel>Enter a message...</InputLabel>
          <Input
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <IconButton
            type="submit"
            disabled={!input}
            variant="contained"
            color="primary"
            onClick={sendMessege}
          >
            <SendIcon></SendIcon>
          </IconButton>
        </FormControl>
      </form>

      <FlipMove>
        {messages.map((message) => (
          <Message key={message.id} message={message} userName={userName} />
        ))}
      </FlipMove>
    </div>
  )
}

export default App
