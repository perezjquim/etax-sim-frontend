<template>
  <v-app>
    <Navbar />

    <v-content class="grey darken-4 blue--text text--lighten-4">

      <router-view></router-view>

    </v-content>

    <v-footer app class="grey darken-3 blue--text text--lighten-4">
      <span>&copy; 2019</span>
    </v-footer>

  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar'

export default {
  name: 'App',
  components: { Navbar },
  data: () => ({
    //
  }),
};
</script>
