package main

/*import (
    "container/list"
    "fmt"
)*/

// holds an instance of a game
type gameInstance struct {
    gameId int
    createdBy string
    isProtected bool
    gameHub hub
}


func createGameInstance() *gameInstance {
    newGame := new(gameInstance)
    
    (*newGame).gameId = getNewGameId()
    
    return nil;    
}

func getNewGameId() int {
    return -1;
}
