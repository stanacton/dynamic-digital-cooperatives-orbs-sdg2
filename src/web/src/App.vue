<template>
  <v-app>
    <component :is="layout">
    </component>
  </v-app>
</template>

<script lang="ts">
  import ComplexLayout from '@/layouts/ComplexLayout.vue';

  const defaultLayout = 'complex';
  import { Component, Vue } from 'vue-property-decorator';
  import PlainLayout from '@/layouts/PlainLayout.vue';
  @Component({
    components: {
      ComplexLayout,
      PlainLayout,
    },
    data() {
      return {
        //
      };
    },
    computed: {
      layout() {
        let layout = defaultLayout;
        if (this.$route && this.$route.meta && this.$route.meta.layout) {
          layout = this.$route.meta.layout;
        }
        return layout + '-layout';
      },
    },
  })
  export default class App extends Vue {}
</script>
