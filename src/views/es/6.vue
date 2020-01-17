<template>
  <div class = "6" style="height:100%;">
    
    <h1 class="font-weight-black dark grey darken-3 blue--text text--lighten-4 text-center" style="height:5%;text-transform: capitalize;">
      {{ strategy.name }}
      <img src="../../assets/spain.svg" style="height:23px;width:23px"> 
    </h1>

    <v-div style="height:95%;display:flex;justify-content:center;align-items:center;border:1px solid rgb(187, 222, 251);border-left:0px;border-right:0px;">
    <v-card
      class="mx-auto"
      style="max-width: 500px;"
    >

    <v-card-title class="headline blue lighten-4 grey--text text--darken-4 justify-center" >Datos para la simulación</v-card-title>

    <v-form
        ref="form"
        v-model="valid"
        lazy-validation
        style="border:3px solid rgb(187, 222, 251);border-top:none;"
    >

        <v-divider/>

        <br>
        <p class="title font-weight-regular grey--text text--darken-4 ml-5 mb-0">Salarios</p>
        <v-divider/>

        <v-row justify="center" class="mt-0 mb-0">

            <v-col cols="7">
                <v-text-field
                v-model="base_salary"
                :rules="salaryRules"
                label="Salario Base"
                required
                suffix="€"
                clearable
                outlined
                dense
                class="mt-5" 
                ></v-text-field>
            </v-col>

            <v-col cols="7">
                <v-text-field
                v-model="no_salary"
                :rules="no_salaryRules"
                label="Cantidad de Salarios"
                required
                max="500"
                min="1"
                step="1"
                type="number"
                clearable
                outlined
                dense
                class="mt-5" 
                ></v-text-field>
            </v-col>
            
        </v-row>


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
            Enviar
            </v-btn>

            <v-btn
            color="error"
            class="mr-4"
            @click="reset"
            >
            Limpiar
            </v-btn>


        </v-layout>
        </v-card-actions>

        <v-row justify="center">
         <success :opened="success_opened" @update="onSuccessUpdate" :results="results"/>
         <error :opened="error_opened" @update="onErrorUpdate" :results="results"/>
        </v-row>

    </v-form>
    </v-card>
    </v-div>
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
          number: '',
          salaryRules: [
            v => !!v || 'Este campo es obligatorio',
            v => v && v > 0 || 'El salario debe ser un número mayor que 0',
          ],
          no_salaryRules: [
            v => !!v || 'Este campo es obligatorio',
            v => v && v > 0 || 'El número de salarios debe ser un número mayor que 0',
            v => v  == Math.floor(v) || 'El número de salarios debe ser un número entero',
          ],


          //Data para os popups
          success_opened: false,
          error_opened: false,
          results: [],

          //Estados iniciais do modelo do form e selects
          valid: true,
          select: null,


          //Declaração dos models (checkbox's a false)
          base_salary: null,
          no_salary: null,
          

          
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
          base_salary:this.base_salary,
          no_salary:this.no_salary,
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