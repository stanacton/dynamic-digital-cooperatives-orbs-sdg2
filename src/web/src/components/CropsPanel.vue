<template>
    <v-card flat>
        <v-card-title class="align-end fill-height">Your Crops</v-card-title>

        <v-card-text>
            <v-simple-table>
                <thead>
                <tr>
                    <th class="text-left">Commodity</th>
                    <th class="text-right">Quantity Desc</th>
                    <th class="text-right">Quantity</th>
                    <th class="text-center">Co-Op Status</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in comodities">
                    <td>{{ item.Name }}</td>
                    <td class="text-right">{{ item.QuantityDesc }}</td>
                    <td class="text-right">(~{{ item.Quantity }} {{ item.Unit }})</td>
                    <td class="text-center">{{ item.coopStatus }}</td>
                    <td class="text-center">
                        <v-btn v-show="item.coopStatus === 'Available'" color="primary" small @click="showCoOp(item.ID, true)">Join</v-btn>
                        <v-btn v-show="item.coopStatus === 'Joined'" color="default" small @click="showCoOp(item.ID)">View</v-btn>
                        <v-btn v-show="item.coopStatus === 'BuyersWaiting'" color="primary" small @click="createCoOp(item.ID)">Create Co-Op</v-btn>
                        <v-btn v-show="item.coopStatus === 'Sold'" color="success" small @click="createCoOp(item.ID)">Request Pickup</v-btn>
                    </td>
                </tr>
                </tbody>
            </v-simple-table>
        </v-card-text>
        <v-card-actions>
            <v-btn color="primary" href="/crop/create">Add Crop</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script lang="ts">
    export default {
        name: "CropsPanel",
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
        async mounted() {
            try {
                this.comodities = await this.cropsSvc.list(this.userId);
                this.coops = await this.coopSvc.listAsDict();
                this.orders = await this.orderSvc.listAsDict();

                this.comodities = this.comodities.map((x) => {
                    const c = this.coops[x.Name.toLowerCase()];
                    const o = this.orders[x.Name.toLowerCase()];


                    if (!o) {
                        x.coopStatus = "NoBuyers";
                    } else if (!c) {
                        x.coopStatus = 'BuyersWaiting';
                    } else {
                        let joined = false;
                        for (const p of c.Participants || []) {
                            if (p.ID === this.userId) {
                                joined = true;
                                break;
                            }
                        }

                        if (joined) {
                            x.coopStatus = c.Sold === 'true' ? 'Sold' : 'Joined';
                        } else {
                            x.coopStatus = 'Available';
                        }
                    }
                    return x;
                });

            } catch (e) {
                alert(e);
            }
        },
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
