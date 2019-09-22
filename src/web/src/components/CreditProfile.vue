<template>
    <v-card flat>

        <v-card-title class="align-end fill-height">Credit Profile</v-card-title>

        <v-card-text>
            <v-container fluid grid-list-md pa-2>
                <v-layout columns flex wrap>
                    <v-flex xs6>
                        <v-card class="text-center" color="green">
                            <v-card-title>Credit Score</v-card-title>
                            <v-card-text>
                                <span class="credit-score">545</span>
                            </v-card-text>
                        </v-card>
                    </v-flex>
                    <v-flex xs6>
                        <v-card class="text-center">
                            <v-card-title>Your Co-Op Share Value</v-card-title>
                            <v-card-text>
                                <span class="credit-score">{{formatPrice(1300)}}</span>
                            </v-card-text>
                        </v-card>
                    </v-flex>
                    <v-flex xs12 sm4>
                        <v-card class="text-center">
                            <v-card-title>Loans Outstanding</v-card-title>
                            <v-card-text>
                                <span class="loan-outsanding">$433.32</span>
                            </v-card-text>
                        </v-card>
                    </v-flex>
                    <v-flex xs12 sm4>
                        <v-card class="text-center">
                            <v-card-title>Monthly Profit/Loss</v-card-title>
                            <v-card-text>
                                <span class="loan-outsanding">{{ formatPrice(150.00) }}</span>
                            </v-card-text>
                        </v-card>
                    </v-flex>
                    <v-flex xs12 sm4>
                        <v-card class="text-center">
                            <v-card-title>Total Assets</v-card-title>
                            <v-card-text>
                                <span class="loan-outsanding">{{ formatPrice(totalAssets) }}</span>
                            </v-card-text>
                        </v-card>
                    </v-flex>
                    <v-flex xs12>
                        <v-card class="text-center">
                            <v-card-title>Assets</v-card-title>
                            <v-card-text>
                                <v-simple-table>
                                    <thead>
                                    <tr>
                                        <th class="text-left">Item</th>
                                        <th class="text-right">Estimated Value</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr v-for="item in asset">
                                        <td class="text-left">{{ item.name }}</td>
                                        <td class="text-right">{{ formatPrice(item.value) }}</td>
                                    </tr>
                                    </tbody>
                                </v-simple-table>
                            </v-card-text>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card-text>
    </v-card>
</template>

<script lang="ts">
    export default {
        name: "CreditProfile",
        data: () => ({
            asset: [
                {
                    name: '10 Bovine',
                    value: '2334'
                },
                {
                    name: '12 Goats',
                    value: '1453'
                },
                {
                    name: '6 Sheep',
                    value: '453'
                },
                {
                    name: '50 Avocado Trees',
                    value: '150'
                },
            ],
        }),
        computed: {
            totalAssets() {
                let total = 0;
                for (const a of this.asset) {
                    total += parseInt(a.value, 10);
                }
                return total;
            }
        }
    };
</script>

<style scoped>
    .credit-score {
        font-size:  30px;
        text-align: center;
        font-weight: bold;
    }
    .loan-outsanding {
        font-size:  30px;
        text-align: center;
        font-weight: bold;
    }
</style>
