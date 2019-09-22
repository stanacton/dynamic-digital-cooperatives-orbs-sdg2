sudo apt-get update

# GOLANG Setup 
sudo add-apt-repository ppa:longsleep/golang-backports -y
sudo apt-get update
sudo apt-get install golang-go -y
echo "export PATH=\"/usr/local/go/bin:~/go/bin:$PATH\"" >> ~/.profile

# DOCKER Setup
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo groupadd docker
sudo usermod -aG docker vagrant
newgrp docker 

# Docker compose
sudo curl -L "https://github.com/docker/compose/releases/download/1.24.1/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# NODEJS Using Ubuntu
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt-get install -y nodejs
# Using Debian, as root
# curl -sL https://deb.nodesource.com/setup_12.x | bash -
#apt-get install -y nodejs
sudo npm install -g mocha
sudo npm install -g typescript
sudo npm install -g truffle

# GAMMA-CLI 
curl -L https://github.com/orbs-network/gamma-cli/releases/download/v0.8.0/gammacli-linux-x86-64-v0.8.0.tar.gz | tar zx
sudo mkdir -p ./go/bin 
sudo cp ./_bin/gamma-cli ./go/bin/gamma-cli

# Setup ORBS SDK
cd /home/vagrant/go/src
go get -u github.com/orbs-network/orbs-contract-sdk/...

docker run hello-world
go version
node --version 
