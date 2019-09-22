gamma-cli stop-local
gamma-cli start-local
sleep 3

gamma-cli deploy ./CoOps/CoOps.go -name CoOps -signer user1 
gamma-cli deploy ./Crops/Crops.go -name Crops -signer user1 
gamma-cli deploy ./Orders/Orders.go -name Orders -signer user1 

gamma-cli send-tx ./CoOps/add-honey-coop.json -signer user2
gamma-cli send-tx ./CoOps/add-pineapple-coop.json -signer user2

gamma-cli send-tx ./Orders/add-coffee-order.json -signer user2
gamma-cli send-tx ./Orders/add-honey-order.json -signer user2
gamma-cli send-tx ./Orders/add-pineapple-order.json -signer user2
