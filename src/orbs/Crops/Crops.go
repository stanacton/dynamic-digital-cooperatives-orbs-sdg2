package main

import (
	"encoding/json"

	"github.com/orbs-network/orbs-contract-sdk/go/sdk/v1"
	"github.com/orbs-network/orbs-contract-sdk/go/sdk/v1/state"
)

var PUBLIC = sdk.Export(write, get, remove, list)
var SYSTEM = sdk.Export(_init)

var CROPS_KEY = []byte("crops")

func _init() {
}

func list(userId string) string {
	u := getUser(userId)
	if len(u.Crops) == 0 {
		return "[]"
	}

	return string(toJSON(u.Crops))
}

func write(userId string, coopJSON string) {
	u := getUser(userId)
	c := toCrop(coopJSON)

	u.Crops = append(u.Crops, *c)

	save(*u, userId)
}

func getUser(userId string) *User {
	b := state.ReadBytes(getKey(userId))
	user := User{}
	if len(b) == 0 {
		return &user
	}

	if err := json.Unmarshal(b, &user); err != nil {
		panic(err)
	}

	return &user
}

func toCrop(crop string) *Crop {
	c := Crop{}

	if err := json.Unmarshal([]byte(crop), &c); err != nil {
		panic(err)
	}

	return &c
}

func remove(userId string, id string) {
	u := getUser(userId)
	index := -1
	for i, c := range u.Crops {
		if c.ID == id {
			index = i
			break
		}
	}

	if index > -1 {
		u.Crops = append(u.Crops[:index], u.Crops[:index+1]...)
	}

	save(*u, userId)
}

func get(userId string, id string) string {
	u := getUser(userId)

	for _, c := range u.Crops {
		if c.ID == id {
			return string(toJSON(c))
		}
	}
	return "{}"
}

func toJSON(c interface{}) []byte {
	b, err := json.Marshal(c)

	if err != nil {
		panic(err)
	}

	return b
}

func save(user User, userId string) {
	b, err := json.Marshal(user)
	if err != nil {
		panic(err)
	}

	state.WriteBytes(getKey(userId), b)
}
func getKey(userId string) []byte {
	return append(CROPS_KEY, []byte(userId)...)
}

type Crop struct {
	ID           string
	Name         string
	QuantityDesc string
	Quantity     string
	Unit         string
	UserID       string
}

type User struct {
	ID    string
	Crops []Crop
}
