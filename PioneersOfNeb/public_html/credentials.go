package main

import (
    "code.google.com/p/go.net/websocket"
    "code.google.com/p/go.crypto/bcrypt"
    "github.com/dchest/uniuri"
    "fmt"
    "strings"
    "encoding/json"
)

type LoginPayload struct {
	Type string
	Payload string
}

type LoginInfo struct {
	Username string
	Password string
}

type RegisterInfo struct {
	Email string
	Username string
	Password string
}

type User struct {
	ID 	int
	Username string
	Wins int
	Losses int
}


/* 
//	DATABASE fields
//	id INT UNSIGNED AUTO_INCREMENT PRIMARY_KEY
//	email VARCHAR(40) UNIQUE
//	username VARCHAR(20) UNIQUE
//	password VARCHAR(60)
//	wins INT
//	losses INT
// 	cost INT
*/

// sets the password as a string
func hashPassword(password string) string {
	hpass, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		fmt.Println("bcrypt error?")
		return ""
	}
	return string(hpass)
}

// replaces all instances of ' with "
func editPayload(payload string) string {
	r := strings.NewReplacer("'", "\"")
	return r.Replace(payload)
}

// searches database to find a specified user
// returns a user if it exists, nil otherwise
func (l *LoginInfo) FindUser() *User {
	// now we should have a username/password combination
	

	stmt, err := db.Prepare("SELECT password, salt FROM users WHERE username=?")
	if err != nil {
    	fmt.Printf(err.Error())
    }
    defer stmt.Close()

    var salt string
    var password string

    //hashedPass := hashPassword(l.Password + salt)

    err = stmt.QueryRow(l.Username).Scan(&password, &salt)
    if err != nil {
    	if strings.EqualFold(err.Error(), "sql: no rows in result set") {
    		return nil
    		// no such user exists
    	} else {
    		fmt.Println(err.Error())
    	}
    }

    if isMatch := bcrypt.CompareHashAndPassword([]byte(password), []byte(l.Password + salt)); isMatch == nil {
    	fmt.Println("match!")
    } else {
    	return nil
    }

    return new (User)
}

// searches database to see if an email is already registered
func (r *RegisterInfo) EmailAlreadyRegistered() bool {
	stmt, err := db.Prepare("SELECT id FROM users WHERE email=?")
	if err != nil {
    	fmt.Printf(err.Error())
    }
    defer stmt.Close()

    var myid int

    err = stmt.QueryRow(r.Email).Scan(&myid)
    if err != nil {
    	if strings.EqualFold(err.Error(), "sql: no rows in result set") {
    		return false
    		// no such user exists
    	} else {
    		// other SQL related errors, like a username existing already or something
    		fmt.Println(err.Error())
    	}
    }

    // user already exists
    return true
}

// registers a new user into the database
func (r *RegisterInfo) RegisterNewUser() *User {
	//	DATABASE fields
	//	id INT UNSIGNED AUTO_INCREMENT PRIMARY_KEY
	//	email VARCHAR(40) UNIQUE
	//	username VARCHAR(20) UNIQUE
	//	password VARCHAR(60)
	// 	salt VARCHAR(60)
	stmt, err := db.Prepare("INSERT INTO users VALUES(default,?,?,?,?)")
	if err != nil {
		fmt.Println(err.Error())
	}
	defer stmt.Close()

	salt := uniuri.NewLen(60)

	_, error := stmt.Exec(r.Email, r.Username, hashPassword(r.Password + salt), salt)
	if error != nil {
		fmt.Print("Inserting error", error.Error())
		return nil
	}

	return new(User)
}

// validates the login or registration information
func (c *connection) validateLoginCredentials() {
	defer c.ws.Close()
	for {
        var payload LoginPayload 
        err := websocket.JSON.Receive(c.ws, &payload)
        //loginInfo.SetPassword()
        if err != nil {
            fmt.Println("Websocket ended: ", err.Error())
            break
        }

        switch (payload.Type) {
        	case "login":
        		var loginInfo LoginInfo
        		if err := json.Unmarshal([]byte(editPayload(payload.Payload)), &loginInfo); err == nil {
        			usr := loginInfo.FindUser()
        			// if there is no user with those credentials
        			if usr == nil {
        				err := websocket.Message.Send(c.ws, "user404")
			    		if err != nil {
			    			fmt.Println("could not sent error message")
			    		}
        			} else {
        				// the user is logged in! make a new session
        				fmt.Println("found user")
        			}
        		}
    		case "reg":
    			var reg RegisterInfo
    			if err := json.Unmarshal([]byte(editPayload(payload.Payload)), &reg); err == nil {
    				if isAlreadyRegistered := reg.EmailAlreadyRegistered(); isAlreadyRegistered {
    					err := websocket.Message.Send(c.ws, "alreadyExists")
			    		if err != nil {
			    			fmt.Println("could not sent error message")
			    		}
    				} else {
    					fmt.Println("time to register email")
    					reg.RegisterNewUser()
    				}

    			}
        		// something
        }
    }
}
