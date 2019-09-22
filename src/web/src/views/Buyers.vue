<template>
    <v-container>

        <v-container fluid grid-list-md pa-2>
            <v-layout columns flex wrap>
                <v-flex xs12>
                    <v-card class="mx-auto">
                        <v-card-title>Buyers</v-card-title>
                        <v-card-text>
                            <v-card>
                                <v-card-title>Orders</v-card-title>
                                <v-card-text>
                                    <v-simple-table>
                                        <thead>
                                        <tr>
                                            <th class="text-left">Commodity</th>
                                            <th class="text-right">Quantity</th>
                                            <th class="text-right">Bid Price</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr v-for="item in orders">
                                            <td>{{ item.Commodity }}</td>
                                            <td class="text-right">{{ item.Quantity }} {{ item.Unit }}</td>
                                            <td class="text-right">{{ formatPrice(item.BidPrice) }}</td>
                                        </tr>
                                        </tbody>
                                    </v-simple-table>

                                </v-card-text>
                            </v-card>
                        </v-card-text>
                        <v-card-actions>
                            <v-btn href="/orders/create" color="primary">Create Order</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </v-container>
</template>

<script lang="ts">
    import Vue from 'vue';

    export default Vue.extend({
        data: () => ({
            id: '',
            rules: {
                required: (v) => !!v || 'This field is required'
            },
            orders: [],
            isJoin: false
        }),
        async mounted() {
            try {
                this.orders = await this.orderSvc.list();
            } catch (e) {
                alert(e);
            }
        },
    });
</script>

<style scoped>

</style>
