<template>
  <div class="portugal" style="height:100%;">

    <h1 class="font-weight-black dark grey darken-3 blue--text text--lighten-4 text-center" style="height:5%;text-transform: capitalize;">
      {{region.description}}
      <img v-if="region.description == 'Madeira'" src="../../assets/madeira.svg" style="height:23px;width:23px">
      <img src="../../assets/portugal.svg" style="height:23px;width:23px">
    </h1>

    <div style="height:95%;display:flex;justify-content:center;align-items:center;border:1px solid rgb(187, 222, 251);border-left:0px;border-right:0px;">
    <v-card
      class="mx-auto"
      style="width:50%;height:65%;border:0.3vh solid rgb(187, 222, 251);border-top:none;"
    >

    <v-card-title class="headline blue lighten-4 grey--text text--darken-4 justify-center" style="height:15%;" >Simulações Disponíveis</v-card-title>

    <v-divider dark inset></v-divider>
      <v-layout justify-center grey darken-3 style="height:85%;">
      <div v-for="strategy in strategies" :key="strategy.id" class="pa-auto ma-auto" style="border:5px solid rgb(187, 222, 251);border-radius:31%;display:flex;">

      <v-btn width=15vw height=15vw light class="white lighten-4 black--text text--darken-4" style="border-radius:30%;overflow:visible;display:flex;" v-bind:to="$route.params.id + '/' + strategy.id">
        <v-icon v-if="strategy.name.includes('Salário')" left>mdi-currency-eur</v-icon>
        <v-icon v-if="strategy.name.includes('Reembolso')" left>mdi-calculator</v-icon>
        <span style="font-size:0.5vw;display:flex;font-weight:900;">{{strategy.name}}</span>
      </v-btn>

      </div>
      </v-layout>

    </v-card>
    </div>

  </div>
</template>

<script>
import RegionHelper from '../../common/helpers/RegionHelper';

export default {

    mounted() {
            RegionHelper.onBeforeRouteEnter(this);
    },       

    data() {
    return {
        region: {},
        strategies: [],
    }    
    }
}
</script>