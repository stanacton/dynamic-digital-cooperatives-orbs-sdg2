<template>
    <v-container>

        <v-container fluid grid-list-md pa-2>
            <v-layout columns flex wrap>
                <v-flex xs12>
                    <v-card class="mx-auto">
                        <v-card-title>Create Crop</v-card-title>
                        <v-card-text>
                            <p>You are the founding member of this Co-Op.  Enter the details below to start</p>
                            <v-form ref="form">
                                <v-row>
                                    <v-col sm="12" fluid>
                                        <v-select
                                            :items="commlist"
                                            v-model="join.Commodity"
                                            label="Commodity"
                                            type="string"
                                            outlined
                                            :rules="[rules.required]"
                                            ></v-select>
                                    </v-col>
                                    <v-col sm="4" fluid>
                                        <v-text-field
                                                v-model="join.QuantityDesc"
                                                label="Quantity Desc"
                                                type="string"
                                                outlined
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
                                                v-model="join.Unit"
                                                label="Unit"
                                                type="string"
                                                :rules="[rules.required]"
                                                outlined
                                        ></v-text-field>
                                    </v-col>
                                    <v-col>
                                        <v-btn color="primary" large @click="createCoOp()">Join</v-btn>
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
            join: {
                Unit: 'kgs'
            },
            rules: {
                required: (v) => !!v || 'This field is required'
            },
            commodity: ''
        }),
        mounted() {
            this.commodity = this.$route.params.commodity;
        },
        methods: {
            async createCoOp() {
                if (this.$refs.form.validate() === false) {
                    return;
                }
                try {
                    this.join.Name = this.join.Name || this.join.Commodity;
                    this.join.QuantityDesc = this.join.QuantityDesc || this.join.Quantity;
                    await this.cropsSvc.write(this.join, this.userId);
                } catch (e) {
                    alert(e);
                }

                this.navigate('/farmers');
            }
        }
    });
</script>

<style scoped>

</style>
