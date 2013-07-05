package main
 
import (
    "code.google.com/p/go.net/websocket"
    "github.com/gorilla/sessions"
    "github.com/gorilla/securecookie" 
    "flag"
    "log"
    "net/http"
    "html/template"
    "math/rand"
    "time"
    "database/sql"
    //"reflect"
    "fmt"
    _ "github.com/go-sql-driver/mysql"
)
 
// HTML variables
var myURL = "192.168.1.88:8080"
var addr = flag.String("addr", myURL, "http service address")
var homeTempl = template.Must(template.ParseFiles("login.html"))
var lobbyTempl = template.Must(template.ParseFiles("lobby.html"))
var gameTempl = template.Must(template.ParseFiles("game.html"))


// session/cookie variables
var sessionName = "pon"
var cookieKey = securecookie.GenerateRandomKey(32)
var store = sessions.NewCookieStore([]byte(cookieKey))

// global game variables
var globalGameList = GameList {
    Games: make([]*gameInstance, 0, 100),
    NumGames: 0,
}
var globalHub = hub {
    broadcast: make(chan string),
    register: make(chan *connection),
    unregister: make(chan *connection),
    connections: make(map[*connection]bool),
}

// this variable is a legacy tester, remains only to keep older code from breaking
//      it will be removed
var globalGame *Game

// database variable
var db *sql.DB

// Function Handler for executing HTML code
func homeHandler(w http.ResponseWriter, req *http.Request) {    
    homeTempl.Execute(w, nil)
}

// Function handler for executing HTML code
func gameHandler(w http.ResponseWriter, req *http.Request)  {
    fmt.Println("in game")
    gameTempl.Execute(w, req.Host)
    /*if isLoggedIn, _ := validateSession(w, req); isLoggedIn{
        gameTempl.Execute(w, req.Host)
    } else {
        homeTempl.Execute(w, map[string]string{
            "loginErrors": "Must log in first",
        })
    }*/
}

// Function handler for executing HTML code
func lobbyHandler(w http.ResponseWriter, req *http.Request)  {
    // make sure client is logged in
    if isLoggedIn, session := validateSession(w, req); isLoggedIn {
        fmt.Println(session)
        name := fmt.Sprintf("%v", session.Values["user"])
        if req.Method == "POST" {   // if there is a POST form from the lobby page
            if create := req.FormValue("create"); create != "" {   // see if it's to create a new game
                fmt.Println("here")
                globalGameList.createGameInstance(name, "")
                session.Options.Path =  "/game.html"
                http.Redirect(w, req, "/game.html", http.StatusFound)
            }
        } else {
            //availableGames := globalGameList.getAvailableGames()
            lobbyTempl.Execute(w, map[string]interface{}{
                "URL": myURL,
                "Name": name,
            })
        }
    } else {
        homeTempl.Execute(w, map[string]string{
            "loginErrors": "Must log in first",
        })
    } 
}

// Serves the files as needed, whenever they are requested
//      used for all images, js, css, and other static files
func sourceHandler(w http.ResponseWriter, r *http.Request) {
    http.ServeFile(w, r, r.URL.Path[1:])
}

func loginHandler(w http.ResponseWriter, r *http.Request) {
    un, pw := r.FormValue("lUn"), r.FormValue("lPw")
    if usr := findUser(un, pw); usr != nil {
        if success := createSession(w, r, usr); success {
            http.Redirect(w, r, "/lobby.html", http.StatusFound)
        } else { fmt.Println("error creating user") }
    } else {
        homeTempl.Execute(w, map[string]string{
            "loginErrors": "User not found",
        }) 
    }
}

func registerHandler(w http.ResponseWriter, r *http.Request) {
    email, un, pw := r.FormValue("rEmail"), r.FormValue("rUn"), r.FormValue("rPw")
    if usr, err := registerNewUser(email, un, pw); usr != nil {
        // success! user was added to the database
        if success := createSession(w, r, usr); success {
            http.Redirect(w, r, "/lobby.html", http.StatusFound)
        } else { fmt.Println("error creating user") }
    } else {
        homeTempl.Execute(w, map[string]string{
            "registerErrors": err.Error(),
        })
    }
}

func createSession(w http.ResponseWriter, r *http.Request, usr *User) bool {
    session, _ := store.Get(r, sessionName)
    session.Options = &sessions.Options{
        Path: "/lobby.html",
    }
    session.Values["isAuthorized"] = true
    session.Values["user"] = usr.Username

    //fmt.Println(session.Values["user"])
    if err := session.Save(r, w); err != nil {
        fmt.Println(err.Error())
        return false
    }

    return true
}

func validateSession(w http.ResponseWriter, r *http.Request) (bool, *sessions.Session) {
    if session, err := store.Get(r, sessionName); err == nil {
        fmt.Print(session)
        val, _ := session.Values["isAuthorized"]
        fmt.Println(val, "\n")
        if v, ok := session.Values["isAuthorized"]; ok && v == true {
            fmt.Println("Authorized user identified!")
            return true, session
        } else {
            fmt.Println("Unauthorized user detected!")
            return false, nil
        }
    } else {
        fmt.Println(err)
    }
    fmt.Println("nope")
    return false, nil
}

func main() {
    fmt.Printf("")
    // database connectivity
    db, _ = sql.Open("mysql", "root:toor@/pioneers")
	defer db.Close()
	
	// setting up variables for the game instances and chat connectivity
    rand.Seed( time.Now().UTC().UnixNano())
    flag.Parse()
    globalGame = init_game(4)   // hard coded for testing
    go globalHub.run()  // start the hub
    
    // serving files for the game
    http.HandleFunc("/", homeHandler)    
    http.Handle("/ws", websocket.Handler(wsLobbyHandler))
    http.HandleFunc("/login.html", homeHandler) 
    http.HandleFunc("/lobby.html", lobbyHandler)
    http.HandleFunc("/game.html", gameHandler)
    http.HandleFunc("/javascript/", sourceHandler)
    http.HandleFunc("/stylesheet/", sourceHandler)
    http.HandleFunc("/images/", sourceHandler)
    http.HandleFunc("/formlogin", loginHandler)
    http.HandleFunc("/formreg", registerHandler)
    //http.HandleFunc("/*.html", SourceHandler)
    if err := http.ListenAndServeTLS(*addr, "cert.pem", "key.pem", nil); err != nil {
        log.Fatal("ListenAndServe:", err)
    }
}
