package main
 
import (
    "code.google.com/p/go.net/websocket"
    "flag"
    "log"
    "net/http"
    "html/template"
    "math/rand"
    "time"
)
 
var addr = flag.String("addr", "192.168.1.88:8080", "http service address")
var homeTempl = template.Must(template.ParseFiles("test.html"))
var globalGame *Game

// Function Handler for executing HTML code
func homeHandler(w http.ResponseWriter, req *http.Request) {
    homeTempl.Execute(w, req.Host)
}

// Serves the files as needed, whenever they are requested
//      used for all images, js, css, and other static files
func SourceHandler(w http.ResponseWriter, r *http.Request) {
    http.ServeFile(w, r, r.URL.Path[1:])
}

func main() {
    rand.Seed( time.Now().UTC().UnixNano())
    flag.Parse()
    globalGame = init_game(2)   // hard coded for testing
    go h.run()  // start the hub
    http.HandleFunc("/", homeHandler)
    http.Handle("/ws", websocket.Handler(wsHandler))
    http.HandleFunc("/javascript/", SourceHandler)
    http.HandleFunc("/stylesheet/", SourceHandler)
    http.HandleFunc("/images/", SourceHandler)
    if err := http.ListenAndServe(*addr, nil); err != nil {
        log.Fatal("ListenAndServe:", err)
    }
}
