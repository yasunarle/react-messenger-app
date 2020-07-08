import React, { forwardRef } from "react"
import { Card, CardContent, Typography } from "@material-ui/core"
// css
import "./Message.css"
const Message = forwardRef(({ message, userName }, ref) => {
  const isUser = userName === message.userName

  return (
    <div ref={ref} className={`message ${isUser && "message__user"}`}>
      <Card className={isUser ? "message__userCard" : "message__guestCard"}>
        <CardContent>
          <Typography variant="h5" color="white" component="h2">
            {!isUser && `${message.userName || "Unkown User"}: `}
            {message.text}
          </Typography>
        </CardContent>
      </Card>
    </div>
  )
})
export default Message
