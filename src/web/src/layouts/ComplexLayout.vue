<template>
    <v-app id="inspire">
        <v-app-bar
                app
                clipped-right
                color="blue-grey"
                dark
        >
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-toolbar-title>Toolbar</v-toolbar-title>
            <div class="flex-grow-1"></div>
        </v-app-bar>

        <v-navigation-drawer
                v-model="drawer"
                app
        >
            <v-img :aspect-ratio="16/9" src="/img/farmer.jpg"
                   gradient="to bottom left, rgba(100,115,201,.33), rgba(25,32,72,.7)">
                <v-layout pa-2 column fill-height class="lightbox white--text">
                    <v-spacer></v-spacer>
                    <v-flex shrink>
                        <div class="subheading">Angela</div>
                        <div class="body-1">angela@gmail.com</div>
                    </v-flex>
                </v-layout>
            </v-img>
            <v-list dense>
                <v-list-item href="/home">
                    <v-list-item-action>
                        <v-icon>mdi-home</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Home</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item href="/farmers">
                    <v-list-item-action>
                        <v-icon>mdi-tree</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Farmers</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item href="/buyers">
                    <v-list-item-action>
                        <v-icon>mdi-currency-usd</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Buyers</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
                <v-list-item href="/analytics">
                    <v-list-item-action>
                        <v-icon>mdi-graphql</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Analytics</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>

        <v-content>
            <router-view/>
        </v-content>

        <v-footer
                app
                color="blue-grey"
                class="white--text"
        >
            <span>Vuetify</span>
            <div class="flex-grow-1"></div>
            <span>&copy; 2019</span>
        </v-footer>
    </v-app>
</template>
<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';
    import {mapState} from 'vuex';
    @Component ({
        data: () => ({
            drawer: null,
            drawerRight: null,
            right: false,
            left: false,
            userData: {}
        })
    })

    export default class ComplexLayout extends Vue {}
</script>

<style scoped>
</style>
