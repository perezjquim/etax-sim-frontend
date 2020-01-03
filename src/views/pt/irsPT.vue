<template>
  <div class="irsPT">
    
    <div v-for="region in portugal" :key="region.name">
    <div v-if="$route.params.id === region.id">

      {{validregion()}}

      <h1 class="display-4 font-weight-black dark blue darken-4 white--text text--lighten-4 text-center" >
        
        {{region.name}} > IRS
        
      </h1>

      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum debitis facilis modi sapiente corrupti voluptate, expedita exercitationem autem repellat dolor dicta minus saepe eligendi officiis ab ipsum magni et fuga.
      </p>

      <br>

      <v-form>

      </v-form>

    </div>
    </div>

    <div v-if="invalidregion===true" class="display-4 font-weight-black dark white--text text--lighten-4 text-center fill-height grid-list-md text-xs-center wrap align-center">
      Erro <!-- QUERO CENTRAR ESTA MERDA VERTICALMENTE E NÃO SEI COMO -->
      <p class="display-1">Região não encontrada</p>
    </div>

  </div>
</template>

<script>
export default {
    data() {
        return {

        invalidregion: true,

        portugal: [
          { id: 'PT-01', name: 'Aveiro' },
          { id: 'PT-02', name: 'Beja' },
          { id: 'PT-03', name: 'Braga' },
          { id: 'PT-04', name: 'Bragança' },
          { id: 'PT-05', name: 'Castelo Branco' },
          { id: 'PT-06', name: 'Coimbra' },
          { id: 'PT-07', name: 'Évora' },
          { id: 'PT-08', name: 'Faro' },
          { id: 'PT-09', name: 'Guarda' },
          { id: 'PT-10', name: 'Leiria' },
          { id: 'PT-11', name: 'Lisboa' },
          { id: 'PT-12', name: 'Portalegre' },
          { id: 'PT-13', name: 'Porto' },
          { id: 'PT-14', name: 'Santarém' },
          { id: 'PT-15', name: 'Setúbal' },
          { id: 'PT-16', name: 'Viana do Castelo' },
          { id: 'PT-17', name: 'Vila Real' },
          { id: 'PT-18', name: 'Viseu' },
          { id: 'PT-20', name: 'Açores' },
          { id: 'PT-30', name: 'Madeira' },
        ],
        }
    },

    methods: {
      validregion() {
        this.invalidregion= false;
      }
    },

}
</script>
