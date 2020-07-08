import React, { useState, useEffect } from "react"
import { Button, FormControl, Input, InputLabel } from "@material-ui/core"
import firebase from "firebase"
import FlipMove from "react-flip-move"
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
      <h1>Testify🔥: Hello {userName}</h1>

      <form>
        <FormControl>
          <InputLabel>Enter a message...</InputLabel>
          <Input
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
          <Button
            type="submit"
            disabled={!input}
            variant="contained"
            color="primary"
            onClick={sendMessege}
          >
            Send Messege
          </Button>
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
