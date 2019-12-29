<template>
  <div class="portugal" >

    <h1 class="font-weight-black dark blue darken-4 white--text text--lighten-4 text-center" >
      
      {{region.description}}
      
    </h1>
    

    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum debitis facilis modi sapiente corrupti voluptate, expedita exercitationem autem repellat dolor dicta minus saepe eligendi officiis ab ipsum magni et fuga.
    </p>

    <v-layout justify-center>

    <v-btn width=15vw height=15vw fixed left light class="white lighten-4 black--text text--darken-4" v-bind:to="region.id + '/liquidPT'">
      <v-icon left>mdi-currency-eur</v-icon>
      <span>Salário Líquido</span>
    </v-btn>

    
    <v-btn width=15vw height=15vw fixed middle light class="white lighten-4 black--text text--darken-4" v-bind:to="region.id + '/irsPT'">
      <v-icon left>mdi-calculator</v-icon>
      <span>IRS</span>
    </v-btn>
    

    <v-btn width=15vw height=15vw fixed right light class="white lighten-4 black--text text--darken-4">
      <v-icon left>mdi-food</v-icon>
      <span>Subsídio de Alimentação</span>
    </v-btn>

    </v-layout>

  </div>
</template>

<script>
    import ApiHandler from "../../common/api/ApiHandler";
    const oRegionRepository = ApiHandler.getRepository("regions");
    const oStrategyRepository = ApiHandler.getRepository("StrategyByCountryByRegions/country/region");

   const onBeforeRouteEnter = async function(vm)
   {
      const sRegionId = vm.$route.params.id;
      const oRegionInfo = await oRegionRepository.getById(sRegionId);
      vm.region = oRegionInfo.data;

      const sCountryId = vm.region.countryId;
      const  oStrategyInfo = await oStrategyRepository.getById(`${sCountryId}/${sRegionId}`);
      vm.strategies = oStrategyInfo.data;
   };

export default {
        beforeRouteEnter(to, from, next) {
            next(vm => {
                onBeforeRouteEnter(vm);
            })
        },        
   data() {
   return {
        region: {},
        strategies: []
    }    
    }
}
</script>