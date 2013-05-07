package main

//import "fmt"

type Tile struct {
    id int
    rollValue int
    resourceType int    
}

func init_tile(i int) *Tile {
    t := new(Tile)
    t.id = i
    //fmt.Printf("Tile: %d\n", t.id)
    return t
}
    
