package main

import (
	"encoding/json"

	"github.com/orbs-network/orbs-contract-sdk/go/sdk/v1"
	"github.com/orbs-network/orbs-contract-sdk/go/sdk/v1/state"
)

var PUBLIC = sdk.Export(write, get, remove, list)
var SYSTEM = sdk.Export(_init)

var COOPS_KEY = []byte("co-ops")

func _init() {
	c := make(map[string]CoOp)
	saveCoOps(&c)
}

func list() string {
	cl := getCoOps()
	return string(toJSON(cl))
}

func write(coopJSON string) {
	cl := getCoOps()
	c := toCoOp(coopJSON)
	cl[c.ID] = *c

	saveCoOps(&cl)
}

func remove(id string) {
	cl := getCoOps()
	delete(cl, id)
	saveCoOps(&cl)
}

func toCoOp(coopJSON string) *CoOp {
	c := CoOp{}
	err := json.Unmarshal([]byte(coopJSON), &c)
	if err != nil {
		panic(err)
	}
	return &c
}

func get(id string) string {
	cl := getCoOps()
	c := cl[id]
	return string(toJSON(c))
}

func toJSON(c interface{}) []byte {
	b, err := json.Marshal(c)

	if err != nil {
		panic(err)
	}

	return b
}

func saveCoOps(coops *map[string]CoOp) {
	b, err := json.Marshal(coops)
	if err != nil {
		panic(err)
	}

	state.WriteBytes(COOPS_KEY, b)
}

func getCoOps() map[string]CoOp {
	cb := state.ReadBytes(COOPS_KEY)
	var coops = make(map[string]CoOp)
	if err := json.Unmarshal(cb, &coops); err != nil {
		panic(err)
	}

	return coops
}

type CoOp struct {
	ID           string
	Name         string
	Participants []Participant
	Commodity    string
}

type Participant struct {
	ID           string
	Quantity     string
	MinPrice     string
	Name         string
	QuantityDesc string
}
