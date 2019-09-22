package test

/*

func TestAdd(t *testing.T) {
	gammaCli := gamma.Cli().Start()
	defer gammaCli.Stop()

	out := gammaCli.Run("deploy ../testcontract.go -name TestContract -signer user1")
	if !strings.Contains(out, `"ExecutionResult": "SUCCESS"`) {
		t.Fatal("deploy failed")
	}

	out = gammaCli.Run("send-tx testcontract-add-user1.json -signer user1")
	if !strings.Contains(out, `"ExecutionResult": "SUCCESS"`) {
		t.Fatal("deploy failed")
	}

	out = gammaCli.Run("run-query testcontract-get.json")
	if !strings.Contains(out, `"Value": "44"`) {
		t.Fatal(out)
	}

	r := Response{}

	err := json.Unmarshal([]byte(out), &r)
	if err != nil {
		t.Fatal(err)
	}

	fmt.Print(r)
}
*/

type OutputArgument struct {
	Type  string
	Value string
}

type Response struct {
	RequestStatus   string
	ExecutionResult string
	OutputArguments []OutputArgument
	BlockHeight     string
	BlockTimestamp  string
}
