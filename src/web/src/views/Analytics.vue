<template>
    <v-container>
        <h2>Analytics</h2>
        <v-container fluid grid-list-md pa-2>
            <v-layout columns flex wrap>
                <v-flex xs6>
                    <bar-chart title="Banana Sales"></bar-chart>
                </v-flex>
                <v-flex xs6>
                    <line-chart title="Coffee Price"></line-chart>
                </v-flex>
            </v-layout>
        </v-container>
    </v-container>
</template>

<script lang="ts">
    import Vue from 'vue';
    import BarChart from '@/components/BarChart.vue';
    import LineChart from '@/components/LineChart.vue';

    export default Vue.extend({
        components: {
            BarChart,
            LineChart
        },
    });
</script>

<style scoped>

</style>
