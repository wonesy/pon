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
    Games []*gameInstance
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
    
    g.Games = append(g.Games, newGame)
    g.NumGames += 1

    return newGame
}

func (g *GameList) getAvailableGames() []gameInstance {
    games := make([]gameInstance, 0, g.NumGames)

    // c is count, entry is the actual gameInstance
    for _, entry := range g.Games {
        if !(entry.isValid || entry.hasStarted) {
            games = append(games, *entry)
        }
    }

    return games
}