package main

/*import (
    "container/list"
    "fmt"
)*/

// holds an instance of a game
type gameInstance struct {
    createdBy string
    isProtected bool
    hasStarted bool
    isValid bool
    password string
    gameHub *hub
}

// holds a complete list of games created, being played, or recently completed
type GameList struct {
    GameList []*gameInstance
    NumGames int
}


func (g *GameList) createGameInstance(creator, password string) *gameInstance {
    newGame := &gameInstance {
        createdBy: creator,
        password: password,
        hasStarted: false,
        isValid: true,
        isProtected: false,
        gameHub: createNewHub(),
    }

    if password != "" {
        newGame.isProtected = true
    }
    
    g.GameList = append(g.GameList, newGame)
    g.NumGames += 1

    return newGame
}

