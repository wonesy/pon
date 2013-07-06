requires installation of Go

    sudo apt-get install golang-go

    required packages for Go are local to this folder and will be included in the git repo

    set GOPATH env variable to the git folder - export GOPATH=`pwd`
    
requires mysql installation
    
    - main.go: in main function, change the following line:
    
    db, _ = sql.Open("mysql", "root:toor@/pioneers")
    
    to whatever you need to get it running
    
    db, _ = sql.Open("mysql", "<user>:<password>@/<database>")

    create table users (id INT PRIMARY KEY AUTO_INCREMENT, email VARCHAR(40), username VARCHAR(20), password VARCHAR(60), sale VARCHAR(60));

changes for local testing environments will be located in main.go
    - line20: myURL = "some_local_ip:some_port"
    - or leave that part blank, just ":some_port", and it will default to "localhost:port"
    
you must use the https URL:

https://192.168.1.88:8080
    
this is run with "go run *.go"
you can compile it into an executable with "go build *.go"

*NOTE
after logging in, you are brought to a supremely ugly page. It is very incomplete. The only button that works is the Create Game button, which brings you to the board set up. The game is not available to play as of now. 
