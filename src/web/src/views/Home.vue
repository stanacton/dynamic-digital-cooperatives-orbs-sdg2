<template>
  <v-container>
    <h2>Dashboard</h2>

    <v-container fluid grid-list-md pa-2>
      <v-layout columns flex wrap>
        <v-flex xs12 sm6>
          <v-card class="mx-auto">
            <v-img
                    class="white--text"
                    height="200px"
                    src="img/farmer.jpg"
                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            >
              <v-card-title class="align-end fill-height">Farmer</v-card-title>
            </v-img>

            <v-card-text>
            </v-card-text>
            <v-card-actions>
              <v-btn class="primary" @click="navigate('/farmers')">Farmers</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
        <v-flex xs12 sm6>
          <v-card class="mx-auto">
            <v-img
                    class="white--text"
                    height="200px"
                    src="img/buyer.jpg"
                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            >
              <v-card-title class="align-end fill-height">Buyers</v-card-title>
            </v-img>

            <v-card-text>
            </v-card-text>
            <v-card-actions>
              <v-btn class="primary" @click="navigate('/buyers')">Buyers</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
<!--
        <v-flex xs12 sm6>
          <v-card class="mx-auto">
            <v-img
                    class="white&#45;&#45;text"
                    height="200px"
                    src="img/transport.jpg"
                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            >
              <v-card-title class="align-end fill-height">Transport</v-card-title>
            </v-img>

            <v-card-text>
            </v-card-text>
            <v-card-actions>
              <v-btn class="primary" @click="navigate('/transport')">Transport</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
-->
        <v-flex xs12 sm6>
          <v-card class="mx-auto">
            <v-img
                    class="white--text"
                    height="200px"
                    src="img/graphs.jpg"
                    gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            >
              <v-card-title class="align-end fill-height">Analytics</v-card-title>
            </v-img>

            <v-card-text>
            </v-card-text>
            <v-card-actions>
              <v-btn class="primary" @click="navigate('/analytics')">Analytics</v-btn>
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
  components: {
  },
});
</script>
