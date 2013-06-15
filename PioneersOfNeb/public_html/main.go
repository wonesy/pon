package main
 
import (
    "code.google.com/p/go.net/websocket"
    "github.com/gorilla/sessions"
    "flag"
    "log"
    "net/http"
    "html/template"
    "math/rand"
    "time"
    "database/sql"
    "fmt"
    _ "github.com/go-sql-driver/mysql"
)
 
// HTML variables
var addr = flag.String("addr", "192.168.1.88:8080", "http service address")
var homeTempl = template.Must(template.ParseFiles("login.html"))
var gameTempl = template.Must(template.ParseFiles("game.html"))
var lobbyTempl = template.Must(template.ParseFiles("lobby.html"))

// session/cookie variables
var store = sessions.NewCookieStore([]byte("secret-key"))

// global game variables
var globalGame *Game

// database variable
var db *sql.DB

// Function Handler for executing HTML code
func homeHandler(w http.ResponseWriter, req *http.Request) {
    homeTempl.Execute(w, req.Host)
}

// Function handler for executing HTML code
func gameHandler(w http.ResponseWriter, req *http.Request)  {
    gameTempl.Execute(w, req.Host)
}

// Function handler for executing HTML code
func lobbyHandler(w http.ResponseWriter, req *http.Request)  {
    lobbyTempl.Execute(w, req.Host)
}

// Serves the files as needed, whenever they are requested
//      used for all images, js, css, and other static files
func SourceHandler(w http.ResponseWriter, r *http.Request) {
    http.ServeFile(w, r, r.URL.Path[1:])
}

// sessions handler
func sessionHandler(w http.ResponseWriter, r *http.Request) {
    // Get a session. We're ignoring the error resulted from decoding an
    // existing session: Get() always returns a session, even if empty.
    sessionName := r.RemoteAddr
    fmt.Println(sessionName)
    session, _ := store.Get(r, "session-name")
    fmt.Println(r)
    // Set some session values.
    session.Values["name"] = "bar"
    session.Values[42] = 43
    // Save it.
    session.Save(r, w)
}

func main() {
    // database connectivity
    db, _ = sql.Open("mysql", "root:Mysqlcarm44@/pioneers")
	defer db.Close()
	
	// setting up variables for the game instances and chat connectivity
    rand.Seed( time.Now().UTC().UnixNano())
    flag.Parse()
    globalGame = init_game(4)   // hard coded for testing
    go h.run()  // start the hub
    
    // serving files for the game
    http.HandleFunc("/", homeHandler)
    http.Handle("/loginws", websocket.Handler(wsLoginHandler))
    http.Handle("/ws", websocket.Handler(wsLobbyHandler))
    http.HandleFunc("/lobby.html", gameHandler)
    http.HandleFunc("/game.html", gameHandler)
    http.HandleFunc("/javascript/", SourceHandler)
    http.HandleFunc("/stylesheet/", SourceHandler)
    http.HandleFunc("/images/", SourceHandler)
    //http.HandleFunc("/*.html", SourceHandler)
    if err := http.ListenAndServeTLS(*addr, "cert.pem", "key.pem", nil); err != nil {
        log.Fatal("ListenAndServe:", err)
    }
}
