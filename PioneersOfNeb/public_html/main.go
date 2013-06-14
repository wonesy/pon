package main
 
import (
    "code.google.com/p/go.net/websocket"
    "flag"
    "log"
    "net/http"
    "html/template"
    "math/rand"
    "time"
    "database/sql"
    _ "github.com/go-sql-driver/mysql"
)
 
var addr = flag.String("addr", "192.168.1.88:8080", "http service address")
var homeTempl = template.Must(template.ParseFiles("lobby.html"))
var gameTempl = template.Must(template.ParseFiles("game.html"))
var globalGame *Game
var currentGames []*gameInstance

// Function Handler for executing HTML code
func homeHandler(w http.ResponseWriter, req *http.Request) {
    homeTempl.Execute(w, req.Host)
}

// Function handler for executing HTML code
func gameHandler(w http.ResponseWriter, req *http.Request)  {
    gameTempl.Execute(w, req.Host)
}

// Serves the files as needed, whenever they are requested
//      used for all images, js, css, and other static files
func SourceHandler(w http.ResponseWriter, r *http.Request) {
    http.ServeFile(w, r, r.URL.Path[1:])
}

func main() {
    // database connectivity
    db, err := sql.Open("mysql", "root:Mysqlcarm44@/pioneers")
	if err != nil {
		panic(err.Error())  // Just for example purpose. You should use proper error handling instead of panic
	}
	defer db.Close()
	
	// setting up variables for the game instances and chat connectivity
    rand.Seed( time.Now().UTC().UnixNano())
    flag.Parse()
    globalGame = init_game(4)   // hard coded for testing
    go h.run()  // start the hub
    
    // serving files for the game
    http.HandleFunc("/", homeHandler)
    http.Handle("/ws", websocket.Handler(wsLobbyHandler))
    http.HandleFunc("/game.html", gameHandler)
    http.HandleFunc("/javascript/", SourceHandler)
    http.HandleFunc("/stylesheet/", SourceHandler)
    http.HandleFunc("/images/", SourceHandler)
    //http.HandleFunc("/*.html", SourceHandler)
    if err := http.ListenAndServe(*addr, nil); err != nil {
        log.Fatal("ListenAndServe:", err)
    }
}
