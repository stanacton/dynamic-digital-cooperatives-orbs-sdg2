<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-container>
        <v-card class="mx-auto">
            <v-card-title class="align-end fill-height">Buy Request</v-card-title>
            <v-card-text>
                <v-form ref="form">
                    <v-container>
                        <v-row>
                            <v-col xs12 fluid>
                                <v-select
                                        v-model="bid.Commodity"
                                        :items="commlist"
                                        label="Commodity"
                                        outlined
                                        :rules="[rules.required]"
                                ></v-select>
                            </v-col>

                        </v-row>
                        <v-row>
                            <v-col sm="4" fluid>
                                <v-text-field
                                        v-model="bid.Quantity"
                                        label="Quantity"
                                        type="number"
                                        outlined
                                        :rules="[rules.required]"
                                ></v-text-field>
                            </v-col>
                            <v-col sm="2" fluid>
                                <v-select
                                        :items="units"
                                        v-model="bid.Units"
                                        label="Units"
                                        type="string"
                                        :rules="[rules.required]"
                                        outlined
                                ></v-select>
                            </v-col>
                            <v-col sm="6" fluid>
                                <v-text-field
                                        v-model="bid.BidPrice"
                                        label="Price"
                                        type="number"
                                        :rules="[rules.required]"
                                        outlined
                                ></v-text-field>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-btn color="primary" v-on:click="placeOrder()">Place Order</v-btn>
                <v-btn text href="/dashboard">Cancel</v-btn>
            </v-card-actions>
        </v-card>
    </v-container>
</template>
<script lang="ts">
    import {Component, Vue} from "vue-property-decorator";

    @Component
    export default class BuyBid extends Vue {
        headerImgSrc?: string =  "";
        bid: any = {
            Expiry: "",
            Units: "kgs"
        };
        timemenu: boolean = false;
        menu: boolean = false;
        min: any = new Date().toISOString().substr(0, 10);
        units: any[] = [];
        rules: any = {
            required: (value: any) => !!value || "* Required"
        };
        orders: any[] = [];

        async mounted() {
            this.units = [
                "kgs", "L", "tons"
            ];
            this.orders = this.$store.getters.orders;
        }

        async placeOrder() {
            const form: any = this.$refs.form;
            if (!form.validate()) {
                return;
            }

            try {
                this.bid.ID = this.createSlug(this.bid.Commodity);
                await this.orderSvc.write(this.bid);
                this.navigate('/buyers');
            } catch (e) {
                alert(e);
            }
        }
    }
</script>
