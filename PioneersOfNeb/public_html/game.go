package main

import "fmt"

type Game struct {
    players []*Player       // array of all players
    board *Board            // instance of a board
    longestRoad *Player     // keeps track of which player has the longest road
    largestArmy *Player     // keeps track of which player has the largest army
    curPlayer *Player       // keeps track of whose turn it is
}

func init_game(numPlayers int) *Game {
    //fmt.Println("here in game")
    g := new(Game)
    g.players = make([]*Player, numPlayers)
    
    // initialize players
    for i := 0; i < numPlayers; i++ {
        g.players[i] = init_player(i)
    }
    
    // initialize board
    g.board = init_board()
    
    // initialize the rest
    g.longestRoad = nil
    g.largestArmy = nil
    g.curPlayer = g.players[0]
    
    return g
}

// Returns the data from the game's tiles in JSON format to the websocket
func (g *Game) getTileInfo() {
    tiles := g.board.tiles
    
    tileInfo := "{\"MsgType\":\"data\",\"Func\":\"getTileInfo\",\"Info\":["
    
    for i := range tiles {
        tileInfo = tileInfo + fmt.Sprintf("{\"Res\":\"%d\",\"Roll\":\"%d\"}", tiles[i].resourceType, tiles[i].rollValue)
        if i < len(tiles)-1 {
            tileInfo = tileInfo + "," 
        } 
    }

    tileInfo = tileInfo + "]}"
    globalHub.broadcast <- tileInfo
    
}

// makes a new board and sends it out to the other players
func (g *Game) makeNewBoard() {
    defineResources(g.board.tiles)
    defineRolls(g.board.tiles)
    g.getTileInfo()
}

func (g *Game) startGame() {
    ///////////////////////////////
    ///////////////////////////////
    // TODO change
    globalHub.broadcast <- "{\"MsgType\":\"data\",\"Func\":\"gameStarted\"}"
    
    //TODO: start game!
}

// Reads the data from the struct and calls the appropriate function
func callFunc(d Data) {
    switch d.Function {
    case "getTileInfo":
        globalGame.getTileInfo()
    case "makeNewBoard":
        globalGame.makeNewBoard()
    case "startGame":
        globalGame.startGame()
    }
}
