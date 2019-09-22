<template>
    <v-container>
        <h2>Farmer</h2>
        <v-container fluid grid-list-md pa-2>
            <v-layout columns flex wrap>
                <v-flex xs12>
                    <v-card class="mx-auto">

                        <v-tabs
                                background-color="deep-purple accent-4"
                                center-active
                                dark
                                v-model="tabs"
                        >
                            <v-tab href="#crops">Your Crops</v-tab>
                            <v-tab href="#transactions">Your Transactions</v-tab>
                            <v-tab href="#credit-profile">Your Assets</v-tab>
                            <v-tab href="#analytics">Your Farm</v-tab>
                        </v-tabs>


                        <v-tabs-items v-model="tabs">
                            <v-tab-item value="crops">
                                <crops-panel></crops-panel>
                            </v-tab-item>
                            <v-tab-item value="transactions">
                                <transaction-history></transaction-history>
                            </v-tab-item>
                            <v-tab-item value="credit-profile">
                                <credit-profile></credit-profile>
                            </v-tab-item>
                            <v-tab-item value="analytics">
                                <h2>Your Data</h2>
                                <v-container fluid grid-list-md pa-2>
                                    <v-layout columns flex wrap>
                                        <v-flex xs6>
                                            <bar-chart title="Overall Farm Profit & Loss"></bar-chart>
                                        </v-flex>
                                        <v-flex xs6>
                                            <line-chart title="How you're performing vs. Others"></line-chart>
                                        </v-flex>
                                    </v-layout>
                                </v-container>
                            </v-tab-item>
                        </v-tabs-items>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </v-container>
</template>

<script lang="ts">
    import Vue from 'vue';
    import CreditProfile from '@/components/CreditProfile.vue';
    import TransactionHistory from '@/components/TransactionHistory.vue';
    import CropsPanel from '@/components/CropsPanel.vue';
    import BarChart from '@/components/BarChart.vue';
    import LineChart from '@/components/LineChart.vue';

    export default Vue.extend({
        components: {CreditProfile, TransactionHistory, CropsPanel, BarChart, LineChart},
        data: () => ({
            tabs: null,

            comodities: [
            ]
        }),
        methods: {
            showCoOp(id: string, join: boolean) {
                let url = '/co-op/' + id;
                if (join) {
                    url += '/join';
                }
                this.navigate(url);
            },
            createCoOp(name: string) {
                this.navigate('/co-op/create/' + name);
            },
            addCrop() {
                this.navigate('/crop/create/');
            }
        },
    });
</script>

<style scoped>

</style>
