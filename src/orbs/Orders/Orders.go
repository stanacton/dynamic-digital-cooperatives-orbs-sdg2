package main

import (
	"encoding/json"

	"github.com/orbs-network/orbs-contract-sdk/go/sdk/v1"
	"github.com/orbs-network/orbs-contract-sdk/go/sdk/v1/state"
)

var PUBLIC = sdk.Export(write, get, remove, list)
var SYSTEM = sdk.Export(_init)

var ORDERS_KEY = []byte("orders")

func _init() {
	c := make(map[string]Order)
	saveOrders(&c)
}

func list() string {
	cl := getOrders()
	return string(toJSON(cl))
}

func write(coopJSON string) {
	cl := getOrders()
	c := toOrder(coopJSON)
	cl[c.ID] = *c

	saveOrders(&cl)
}

func remove(id string) {
	cl := getOrders()
	delete(cl, id)
	saveOrders(&cl)
}

func toOrder(orderJSON string) *Order {
	c := Order{}
	err := json.Unmarshal([]byte(orderJSON), &c)
	if err != nil {
		panic(err)
	}
	return &c
}

func get(id string) string {
	cl := getOrders()
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

func saveOrders(orders *map[string]Order) {
	b, err := json.Marshal(orders)
	if err != nil {
		panic(err)
	}

	state.WriteBytes(ORDERS_KEY, b)
}

func getOrders() map[string]Order {
	cb := state.ReadBytes(ORDERS_KEY)
	var orders = make(map[string]Order)
	if err := json.Unmarshal(cb, &orders); err != nil {
		panic(err)
	}

	return orders
}

type Order struct {
	ID        string
	Commodity string
	BidPrice  string
	Quantity  string
	Unit      string
	BuyerID   string
}
