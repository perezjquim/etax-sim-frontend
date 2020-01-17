<template>
  <div class = "1" style="height:100%;">
    
    <h1 class="font-weight-black dark grey darken-3 blue--text text--lighten-4 text-center" style="height:5%;text-transform: capitalize;">
      {{ strategy.name }}
      <img src="../../assets/madeira.svg" style="height:23px;width:23px;border-radius:50%;"> 
      <img src="../../assets/portugal.svg" style="height:23px;width:23px"> 
    </h1>

    <div style="height:95%;display:flex;justify-content:center;align-items:center;border:1px solid rgb(187, 222, 251);border-left:0px;border-right:0px;">
    <v-card
      class="mx-auto"
      style="max-width: 1000px;"
    >

    <v-card-title class="headline blue lighten-4 grey--text text--darken-4 justify-center" >Dados para a simulação</v-card-title>

    <v-form
        ref="form"
        v-model="valid"
        lazy-validation
        style="border:3px solid rgb(187, 222, 251);border-top:none;"
    >
        
        <v-divider/>

        <br>
        <v-card-text class="display-1 red--text text--lighten-2">
            Esta simulação estará brevemente disponível.
        </v-card-text>
        

        <!-- Acaba aqui os campos pedidos, falta definir as validations para cada campo -->

        <v-divider/>
        <v-card-actions class="grey lighten-4">
        <v-layout justify-center>

            <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="onSubmit"
            >
            Submeter
            </v-btn>

            <v-btn
            color="error"
            class="mr-4"
            @click="reset"
            >
            Limpar
            </v-btn>


        </v-layout>
        </v-card-actions>

        <v-row justify="center">
         <success :opened="success_opened" @update="onSuccessUpdate" :results="results"/>
         <error :opened="error_opened" @update="onErrorUpdate" />
        </v-row>

    </v-form>
    </v-card>
    </div>
</div>
  
</template>

<script>
import FormHelper from '../../common/helpers/FormHelper';
import success from '../../components/popups/success';
import error from '../../components/popups/error';

export default {

    mounted() {
        FormHelper.onBeforeRouteEnter(this);
    },  
    
    components: {
      success, error
    },

    data() {
        return {

          // Form Helper guarda nesta array o objeto da estrategia
          strategy: {},

          //Validações


          //Data para os popups
          success_opened: false,
          error_opened: false,
          results: [],

          //Estados iniciais do modelo do form e selects
          valid: true,
          select: null,


          //Conjuntos de Texto - Valores para os campos com atribuição de valores


          //Declaração dos models (checkbox's a false)


          
          
        }
    },
    methods:
    {
      onSubmit: async function(){
       if (this.$refs.form.validate()) {
        this.snackbar = true
        try
        {
          const oResult = await FormHelper.onSubmit(this, {

          });
          FormHelper.handleResults(this,oResult);
        }
        catch(e)
        {
          FormHelper.handleResults(this);
        }
      }},

      reset () {
        this.$refs.form.reset()
      },

      onSuccessUpdate: function(v)
      {
        FormHelper.onSuccessUpdate(this,v)
      },

      onErrorUpdate: function(v)
      {
        FormHelper.onErrorUpdate(this,v)
      }

    }    
}
</script>