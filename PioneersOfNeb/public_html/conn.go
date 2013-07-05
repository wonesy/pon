package main
 
import (
    "code.google.com/p/go.net/websocket"
    "encoding/json"
    //"net/http"
    "io"
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
            if err == io.EOF {
                fmt.Println("Socket has ended")
                break
            }
            fmt.Println("Websocket error: ", err)
            break
        }
        //fmt.Println(msg.MsgType);
        // determine whether traffic is for game data or for chat
        switch msg.MsgType {
        case "chat":
            globalHub.broadcast <- fmt.Sprintf("{\"MsgType\":\"chat\",\"Text\":\"%s\"}",msg.Text)
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

// reader for lobby websockets only
func (c *connection) lobbyReader() {
    for {
        //var msg Message
    }
}

// Reads the data from the struct and calls the appropriate function
func callFunc(d Data) {
    switch d.Function {
    case "getTileInfo":
        globalGame.getTileInfo()
    case "makeNewBoard":
        globalGame.makeNewBoard()
    case "startGame":
        globalGame.startGame()
    case "createGame":

    }
}

// This needs to be handled
func wsHandler(ws *websocket.Conn) {
    fmt.Println(ws.LocalAddr());
    c := &connection{send: make(chan string, 512), ws: ws}
    globalHub.register <- c
    defer func() { globalHub.unregister <- c }()
    go c.writer()
    c.reader()
}

// handles the websocket connections for lobbies!
func wsLobbyHandler(ws *websocket.Conn) {
    c := &connection{send: make(chan string, 512), ws: ws}
    globalHub.register <- c
    defer func() {globalHub.unregister <- c}()
    go c.writer()
    c.reader()
}

