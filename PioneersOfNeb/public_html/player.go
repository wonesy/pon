package main

//import "fmt"

type Player struct {
    id int
    name string
    // and a lot more
}

func init_player(idNo int) *Player {
    p := new(Player)
    p.id = idNo
    //p.name = "default" + string(idNo)
    return p
}
