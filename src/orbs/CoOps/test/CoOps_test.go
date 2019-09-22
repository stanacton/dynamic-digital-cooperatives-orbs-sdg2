package test

import (
	"strings"
	"testing"

	"github.com/orbs-network/orbs-contract-sdk/go/testing/gamma"
)

func TestCoOpInit(t *testing.T) {
	gammaCli := gamma.Cli().Start()
	defer gammaCli.Stop()

	out := gammaCli.Run("deploy ../CoOps.go -name TestCoOps -signer user1")
	if !strings.Contains(out, `"ExecutionResult": "SUCCESS"`) {
		t.Fatal("deploy failed")
	}
}
