package main

import (
    "code.google.com/p/go.crypto/bcrypt"
    "github.com/dchest/uniuri"
    "fmt"
    "strings"
    "errors"
)

type User struct {
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

// searches database to find a specified user
// returns a user if it exists, nil otherwise
func findUser(username, password string) *User {
	// now we should have a username/password combination
	stmt, err := db.Prepare("SELECT id, password, salt FROM users WHERE username=?")
	if err != nil {
    	fmt.Printf(err.Error())
    }
    defer stmt.Close()

    var id int
    var salt string
    var pass string

    //hashedPass := hashPassword(l.Password + salt)

    err = stmt.QueryRow(username).Scan(&id, &pass, &salt)
    if err != nil {
    	if strings.EqualFold(err.Error(), "sql: no rows in result set") {
    		return nil
    		// no such user exists
    	} else {
    		fmt.Println(err.Error())
    	}
    }

    if isMatch := bcrypt.CompareHashAndPassword([]byte(pass), []byte(password + salt)); isMatch != nil {
    	// there is no user
    	return nil
    }

    // user was found with this credentials
    return &User{Username: username}
}

// searches database to see if an email is already registered
func emailAlreadyRegistered(email string) bool {
	stmt, err := db.Prepare("SELECT id FROM users WHERE email=?")
	if err != nil {
    	fmt.Printf(err.Error())
    }
    defer stmt.Close()

    var myid int

    err = stmt.QueryRow(email).Scan(&myid)
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

func usernameAlreadyRegistered(username string) bool {
	stmt, err := db.Prepare("SELECT id FROM users WHERE username=?")
	if err != nil {
    	fmt.Printf(err.Error())
    }
    defer stmt.Close()

    var myid int

    err = stmt.QueryRow(username).Scan(&myid)
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
func registerNewUser(email, username, password string) (*User, error) {
	//	DATABASE fields
	//	id INT UNSIGNED AUTO_INCREMENT PRIMARY_KEY
	//	email VARCHAR(40) UNIQUE
	//	username VARCHAR(20) UNIQUE
	//	password VARCHAR(60)
	// 	salt VARCHAR(60)

	if emailAlreadyRegistered := emailAlreadyRegistered(email); emailAlreadyRegistered {
		// that email is already registered
		return nil, errors.New("Email already registered")
	}

	if unAlreadyRegistered := usernameAlreadyRegistered(username); unAlreadyRegistered {
		// that email is already registered
		return nil, errors.New("Username already exists")
	}

	stmt, err := db.Prepare("INSERT INTO users VALUES(default,?,?,?,?)")
	if err != nil {
		fmt.Println(err.Error())
	}
	defer stmt.Close()

	salt := uniuri.NewLen(60)

	_, error := stmt.Exec(email, username, hashPassword(password + salt), salt)
	if error != nil {
		fmt.Print("Inserting error", error.Error())
		return nil, error
	}

	return &User{Username: username}, nil
}

