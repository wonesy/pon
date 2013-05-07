package main

import (
    "math/rand"
    //"fmt"
)

const numTiles int = 37
const numRes   int = 6

const (
    BRICK int = iota    // 0
    WOOD        // 1
    SHEEP       // 2
    WHEAT       // 3
    ORE         // 4
    DESERT      // 5
    SEA         // 6
    PORT_WHEAT  // 7
    PORT_SHEEP  // 8
    PORT_BRICK  // 9
    PORT_ORE    // 10
    PORT_WOOD   // 11
    PORT_RAND1  // 12
    PORT_RAND2  // 13
    PORT_RAND3  // 14
    PORT_RAND4  // 15
)

type Board struct {
    tiles []*Tile
    //vertices []Vertex
    //edges []Edge
}

func init_board() *Board {
    b := new(Board)
    b.tiles = make([]*Tile, numTiles)
    
    for i := 0; i < numTiles; i++ {
        b.tiles[i] = init_tile(i)
    }
    
    defineResources(b.tiles)
    defineRolls(b.tiles)
    
    return b
}

// Defines the roll values for each tile
func defineRolls(t []*Tile) {
    rollOrder := []int{5,2,6,3,8,10,9,12,11,4,8,10,9,4,5,6,3,11}
    order := make([][]int, 6)
    
    order[0] = []int{5,6,7,13,20,26,31,30,29,23,16,10,11,12,19,25,24,17,18}
    order[1] = []int{7,13,20,26,31,30,29,23,16,10,5,6,12,19,25,24,17,11,18}
    order[2] = []int{20,26,31,30,29,23,16,10,5,6,7,13,19,25,24,17,11,12,18}
    order[3] = []int{31,30,29,23,16,10,5,6,7,13,20,26,25,24,17,11,12,19,18}
    order[4] = []int{29,23,16,10,5,6,7,13,20,26,31,30,24,17,11,12,19,25,18}
    order[5] = []int{16,10,5,6,7,13,20,26,31,30,29,23,17,11,12,19,25,24,18}
    
    num := randInt(0, 6)
    x := 0
    for i := 0; i < len(order[0]); i++ {
        if t[order[num][i]].resourceType != DESERT {
            t[order[num][i]].rollValue = rollOrder[x]
            x++
        }
    }
}


// Defines the resource types for each tile
func defineResources(t []*Tile) {
    res := make(map[int]int)
    res[BRICK], res[ORE] = 3, 3
    res[WOOD], res[WHEAT], res[SHEEP] = 4, 4, 4
    res[DESERT] = 1
    
    for i := 0; i < numTiles; i++ {
        switch t[i].id {
        case 2: 
            t[i].resourceType = PORT_ORE
        case 8: 
            t[i].resourceType = PORT_WHEAT
        case 9: 
            t[i].resourceType = PORT_SHEEP
        case 32: 
            t[i].resourceType = PORT_WOOD
        case 35: 
            t[i].resourceType = PORT_BRICK
        case 0:
            t[i].resourceType = PORT_RAND2
        case 21:
            t[i].resourceType = PORT_RAND4
        case 22:
            t[i].resourceType = PORT_RAND1
        case 33:
            t[i].resourceType = PORT_RAND3
        case 1, 3, 4, 14, 15, 27, 28, 34, 36:
            t[i].resourceType = SEA
        default:
            num := randInt(0,numRes); 
            for res[num] <= 0 { 
                num = randInt(0,numRes)
            }
            t[i].resourceType = num
            res[num]-- 
            //fmt.Println(t[i].resourceType)
        }
    }
}

// returns a random integer [0.max)
func randInt(min, max int) int {
    return min + rand.Intn(max-min)
}
