<template>
    <v-card flat>

        <v-card-title class="align-end fill-height">Transactions</v-card-title>

        <v-card-text>
            <v-simple-table>
                <thead>
                <tr>
                    <th class="text-left">Date</th>
                    <th class="text-left">Description</th>
                    <th class="text-right">Amount</th>
                    <th class="text-right">Balance</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in transactions">
                    <td>{{ item.date }}</td>
                    <td class="text-left">{{ item.description }}</td>
                    <td class="text-right">
                        <span class="negative" v-show="item.type === 'DEBIT'">({{formatPrice(item.amount)}})</span>
                        <span v-show="item.type !== 'DEBIT'">{{ formatPrice(item.amount)}}</span>
                    </td>
                    <td class="text-right">
                        <span class="negative" v-show="item.balance < 0">({{formatPrice(item.balance)}})</span>
                        <span v-show="item.balance >= 0">{{ formatPrice(item.balance)}}</span>
                    </td>
                </tr>
                </tbody>
            </v-simple-table>
        </v-card-text>
    </v-card>
</template>

<script lang="ts">
    export default {
        name: "TransactionHistory",
        data: () => ({
            transactions: [
            ],
        }),
        methods: {
            getDate(days: number): string {
                let d: any = new Date();
                d.setDate(d.getDate() - days);
                return d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate();
            }
        },
        mounted() {
            this.transactions = [
                {
                    date: this.getDate(-16),
                    type: "CREDIT",
                    amount: 300,
                    description: "Loan"
                },
                {
                    date: this.getDate(-15),
                    type: "CREDIT",
                    amount: 30,
                    description: "Honey Sales"
                },
                {
                    date: this.getDate(-14),
                    type: "DEBIT",
                    amount: 10,
                    description: "Loan Repayment"
                },
                {
                    date: this.getDate(-13),
                    type: "DEBIT",
                    amount: 11.32,
                    description: "Loan Repayment"
                },
                {
                    date: this.getDate(-11),
                    type: "DEBIT",
                    amount: 10,
                    description: "Loan Repayment"
                },
                {
                    date: this.getDate(-10),
                    type: "DEBIT",
                    amount: 10.99,
                    description: "Loan Repayment"
                },
                {
                    date: this.getDate(-8),
                    type: "CREDIT",
                    amount: 130,
                    description: "Honey Sales"
                },
            ];

            let balance = 0;
            this.transactions = this.transactions.map((x) => {
                if (x.type === "DEBIT") {
                    balance -= x.amount;
                } else {
                    balance += x.amount;
                }

                x.balance = balance;
                return x;
            })
        }
    };
</script>
<style scoped>
    .negative {
        color: red;
    }
    </style>
