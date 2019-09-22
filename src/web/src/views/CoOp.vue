<template>
    <v-container>
        <v-container fluid grid-list-md pa-2>
            <v-layout columns flex wrap>
                <v-flex xs12>
                    <v-card class="mx-auto">
                        <v-card-title>Co-Op {{ id }}</v-card-title>
                        <v-card-text>
                            <v-btn color="primary" class="text--white">Vote to Fix Price</v-btn>
                            <v-card>
                                <v-card-text>
                                    <v-simple-table class="">
                                        <thead>
                                        <tr>
                                            <th>Item</th>
                                            <th class="text-right">Value</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr>
                                            <td class="key">Today's Avg. Market Price</td>
                                            <td class="value">$34.00 per kgs</td>
                                        </tr>
                                        <tr>
                                            <td class="key">Current Bid Price</td>
                                            <td class="value">$15.00</td>
                                        </tr>
                                        <tr>
                                            <td class="key">Demand Quantity</td>
                                            <td class="value">3000 kgs</td>
                                        </tr>
                                        <tr>
                                            <td class="key">Quantity Collected</td>
                                            <td class="value">{{ totalQuantity }} kgs</td>
                                        </tr>
                                        <tr>
                                            <td class="key">Total Co-Op Members</td>
                                            <td class="value">{{ participants.length }}</td>
                                        </tr>
                                        <tr>
                                            <td class="key"></td>
                                            <td class="value"></td>
                                        </tr>
                                        </tbody>
                                    </v-simple-table>

                                </v-card-text>
                            </v-card>

                            <v-card>
                                <v-card-title>Participants</v-card-title>
                                <v-card-text>
                                    <v-simple-table>
                                        <thead>
                                        <tr>
                                            <th class="text-left">Comodity</th>
                                            <th class="text-right">Quantity Desc</th>
                                            <th class="text-right">Quantity</th>
                                            <th class="text-right">Min Price</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr v-for="item in participants">
                                            <td>{{ item.Name }}</td>
                                            <td class="text-right">{{ item.QuantityDesc }}</td>
                                            <td class="text-right">(~{{ item.Quantity }} {{ item.Unit }})</td>
                                            <td class="text-right">{{ formatPrice(item.MinPrice) }}</td>
                                        </tr>
                                        </tbody>
                                    </v-simple-table>

                                </v-card-text>
                            </v-card>

                            <div v-show="isJoin">
                                <br/>
                                <h3>Join Co-Op</h3>
                                <p>To join this Co-Op, please enter how much you want to contribute and what unit price</p>
                                <v-form ref="form">
                                    <v-row>
                                        <v-col sm="4" fluid>
                                            <v-text-field
                                                    v-model="join.quantity"
                                                    label="Quantity"
                                                    type="number"
                                                    outlined
                                                    :rules="[rules.required]"
                                            ></v-text-field>
                                        </v-col>
                                        <v-col sm="4" fluid>
                                            <v-text-field
                                                    v-model="join.minPrice"
                                                    label="Min. Unit Price"
                                                    type="number"
                                                    :rules="[rules.required]"
                                                    outlined
                                            ></v-text-field>
                                        </v-col>
                                        <v-col>
                                            <v-btn color="primary" large @click="joinCoOp()">Join</v-btn>
                                        </v-col>
                                    </v-row>
                                </v-form>
                            </div>
                        </v-card-text>
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
            join: {},
            coop: {
                maxQuantity: 1000
            },
            participants: [
/*
                {
                    name: 'Anderson Farm',
                    coopStatus: 'Joined',
                    quantityDesc: '5 Bunches',
                    quantity: 23,
                    unit: 'kgs',
                    coopId: 'bananas-abcdefg',
                    minPrice: 9
                },
                {
                    name: 'Peterson Bananas',
                    coopStatus: 'Joined',
                    quantityDesc: '50 Bunches',
                    quantity: 230,
                    unit: 'kgs',
                    coopId: 'bananas-abcdefg',
                    minPrice: 3
                },
*/
            ],
            rules: {
                required: (v) => !!v || 'This field is required'
            },
            isJoin: false
        }),
        async mounted() {
            this.id = this.$route.params.id;
            this.isJoin = this.$route.path.indexOf('join') > 0;
            try {
                this.coops = await this.coopSvc.get(this.id);
                this.participants = this.coops.Participants;
            } catch (e) {
                alert(e);
            }
        },
        methods: {
            async joinCoOp() {
                if (this.$refs.form.validate() === false) {
                    return;
                }

                try {
                    const p = {
                        ID: this.userId,
                        Name: 'Angela',
                        Quantity: this.join.quantity,
                        QuantityDesc: this.QuantityDesc || this.join.quantity,
                        MinPrice: this.join.minPrice
                    };

                    this.coops.Participants.push(p);
                    await this.coopSvc.write(this.coops);
                    this.navigate('/farmers');
                } catch (e) {
                    alert(e);
                }
            }
        },
        computed: {
            totalQuantity() {
                if (!this.participants) {
                    return 0;
                }
                let total = 0;
                for (const p of this.participants) {
                    total += parseInt(p.Quantity, 10);
                }
                return total;
            }
        }
    });
</script>

<style scoped>
    .value {
        text-align: right;
        font-size: 110%;
        font-weight: bold;
    }
</style>
