<template>
    <v-container>

        <v-container fluid grid-list-md pa-2>
            <v-layout columns flex wrap>
                <v-flex xs12>
                    <v-card class="mx-auto">
                        <v-card-title>Create Co-Op: {{ Commodity }}</v-card-title>
                        <v-card-text>
                            <p>You are the founding member of this Co-Op.  Enter the details below to start</p>
                            <v-form ref="form">
                                <v-row>
                                    <v-col sm="12" fluid v-show="!Commodity">
                                        <v-text-field
                                                v-model="join.Commodity"
                                                label="Commodity"
                                                type="string"
                                                outlined
                                                :rules="[rules.required]"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col sm="4" fluid>
                                        <v-text-field
                                                v-model="join.Quantity"
                                                label="Quantity"
                                                type="number"
                                                outlined
                                                :rules="[rules.required]"
                                        ></v-text-field>
                                    </v-col>
                                    <v-col sm="4" fluid>
                                        <v-text-field
                                                v-model="join.Price"
                                                label="Min. Unit Price"
                                                type="number"
                                                :rules="[rules.required]"
                                                outlined
                                        ></v-text-field>
                                    </v-col>
                                    <v-col>
                                        <v-btn color="primary" large @click="createCoOp()">Join/Create</v-btn>
                                    </v-col>
                                </v-row>
                            </v-form>
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
            join: {},
            rules: {
                required: (v) => !!v || 'This field is required'
            },
            Commodity: ''
        }),
        mounted() {
            this.Commodity = this.$route.params.commodity;
            this.join.Commodity = this.Commodity;
        },
        methods: {
            async createCoOp() {
                if (this.$refs.form.validate() === false) {
                    return;
                }
                try {
                    this.join.Name = this.join.Name || this.join.Commodity;
                    this.join.ID = this.createSlug(this.join.Name);
                    this.join.Participants = [{
                        ID: this.userId,
                        Name: 'Angela',
                        Quantity: this.join.Quantity,
                        QuantityDesc: this.join.QuantityDesc || this.join.Quantity,
                        MinPrice: this.join.Price
                    }];
                    await this.coopSvc.write(this.join);
                    this.navigate('/farmers');
                } catch (e) {
                    alert(e);
                }
            }
        }
    });
</script>

<style scoped>

</style>
