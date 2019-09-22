<template>
    <v-app id="plain-layout">
        <v-content>
            <router-view></router-view>
        </v-content>
    </v-app>
</template>

<script lang="ts">
    import { Component, Vue } from 'vue-property-decorator';

    @Component({
        data: () => ({
            drawer: null
        }),
    })

    export default class PlainLayout extends Vue {}
</script>
