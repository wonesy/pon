package main
 
import (
    "code.google.com/p/go.net/websocket"
    "encoding/json"
    "fmt"
)
 
type connection struct {
    // The websocket connection.
    ws *websocket.Conn
 
    // Buffered channel of outbound messages.
    send chan string
}

type Message struct {
    MsgType string
    Text string
}

type Data struct {
    Player string
    Function string
    Params string
}

// Continuously reads from the connection until there is an error
//      if a message is received, sends to the broadcast channel
func (c *connection) reader() {
    for {
        var msg Message 
        err := websocket.JSON.Receive(c.ws, &msg)
        if err != nil {
            fmt.Println(err)
            break
        }
        // determine whether traffic is for game data or for chat
        switch msg.MsgType {
        case "chat":
            h.broadcast <- fmt.Sprintf("{\"MsgType\":\"chat\",\"Text\":\"%s\"}",msg.Text)
        case "data":
            var data Data
            if err := json.Unmarshal([]byte(msg.Text), &data); err == nil {
                go callFunc(data)
            } else {
                fmt.Println(err)
            }
            
        }
    }
    c.ws.Close()
}

// Sends, or "writes" the message to all of the send channels
func (c *connection) writer() {
    for message := range c.send {
        err := websocket.Message.Send(c.ws, message)
        if err != nil {
            break
        }
    }
    c.ws.Close()
}
 
func wsHandler(ws *websocket.Conn) {
    c := &connection{send: make(chan string, 512), ws: ws}
    h.register <- c
    defer func() { h.unregister <- c }()
    go c.writer()
    c.reader()
}
