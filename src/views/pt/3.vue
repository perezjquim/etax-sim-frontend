<template>
  <div class = "3" style="height:100%;">
    
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
        <p class="title font-weight-regular grey--text text--darken-4 ml-5 mb-0">Agregado Familiar</p>
        <v-divider/>
        
        <v-row justify="center" class="mt-0 mb-n8">

            <v-col cols="3">
                <v-select
                v-model="married"
                item-value="value"
                item-text="text"
                :items="married_items"
                :rules="[v => !!v || 'Este campo é obrigatório']"
                label="Situação (Estado Civil)"
                required
                clearable
                outlined
                dense 
                class="mt-5"               
                ></v-select>
            </v-col>

            <v-col cols="3">
                <v-select
                v-model="no_dependents"
                item-value="value"
                item-text="text"
                :items="no_dependents_items"
                :rules="[v => !!v || 'Este campo é obrigatório']"
                label="Nº de dependentes"
                required
                clearable
                outlined
                dense
                class="mt-5"                   
                ></v-select>
            </v-col>
        
            <v-col cols="3">
                <v-checkbox
                v-model="disability"
                label=" Tem uma incapacidade superior a 60%? "
                ></v-checkbox>
            </v-col>

        </v-row>

        <!-- <v-divider/> -->

        <br>
        <p class="title font-weight-regular grey--text text--darken-4 ml-5 mb-0">Rendimentos</p>
        <v-divider/>
        
        <v-row justify="center" class="mt-0 mb-n4">

            <v-col cols="5">
                <v-text-field
                v-model="base_salary"
                :rules="salaryRules"
                label="Vencimento base"
                required
                suffix="€"
                clearable
                outlined
                dense
                class="mt-5" 
                ></v-text-field>
            </v-col>

            <v-col cols="5">
                <v-select
                v-model="twelfths"
                item-value="value"
                item-text="text"
                :items="twelfths_items"
                :rules="[v => !!v || 'Este campo é obrigatório']"
                label="Recebe subsídio(s) em duodécimos?"
                required
                clearable
                outlined
                dense
                class="mt-5" 
                ></v-select>
            </v-col>

        </v-row>

        <!-- <v-divider/> -->

        <br>
        <p class="title font-weight-regular grey--text text--darken-4 ml-5 mb-0">Subsídio de Refeição</p>
        <v-divider/>
        
        <v-row justify="center" class="mt-0 mb-n4">

            <v-col cols="3">
                <v-select
                v-model="meal_allowance"
                item-value="value"
                item-text="text"
                :items="meal_allowance_items"
                :rules="[v => !!v || 'Este campo é obrigatório']"
                label="Tipo"
                required
                clearable
                outlined
                dense
                class="mt-5" 
                @input="aConditional"
                ></v-select>
            </v-col>

                <!-- Estes dois só vão poder estar ativos quando o anterior estiver selecionado  -->

            <v-col cols="3">
                <v-text-field
                v-model="meal_allowance_value"
                :rules="meal_allowanceRules"
                label="Valor diário"
                suffix="€"
                clearable
                outlined
                dense
                class="mt-5" 
                ></v-text-field>
            </v-col>

            <v-col cols="3">
                <v-text-field
                v-model="meal_allowance_days"
                :rules="meal_allowance_daysRules"
                label="Nº de dias"
                max="31"
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

        <!-- <v-divider/> -->

        <br>
        <p class="title font-weight-regular grey--text text--darken-4 ml-5 mb-0">Outros Subsídios</p>
        <v-divider/>
        
        <v-row justify="center" class="mt-0 mb-0">

            <v-col cols="3">
            <v-checkbox
            v-model="holiday_allowance"
            label=" Recebe subsídio de férias? "
            ></v-checkbox>
            </v-col>

            <v-col cols="3">
            <v-checkbox
            v-model="Christmas_subsidy"
            label=" Recebe subsídio de natal? "
            ></v-checkbox>
            </v-col>

            <v-col cols="3">
            <v-checkbox
            v-model="teste_madeira"
            label=" Reside na Madeira? "
            ></v-checkbox>
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
          number: '',
          salaryRules: [
            v => !!v || 'Este campo é obrigatório',
            v => v && v > 0 || 'O vencimento base deve ser um número maior que 0',
          ],
          meal_allowanceRules: [
            
          ],
          meal_allowance_daysRules: [
            
          ],
          meal_allowanceRules_false: [
           
          ],
          meal_allowance_daysRules_false: [
            
          ],
          meal_allowanceRules_true: [
            v => !!v || 'Este campo é obrigatório',
            v => v && v > 0 || 'O valor diário deve ser um número maior que 0',
          ],
          meal_allowance_daysRules_true: [
            v => !!v || 'Este campo é obrigatório',
            v => v && v > 0 && v < 32 || 'O nº de dias deve ser um número compreendido entre 1 e 31',
            v => v  == Math.floor(v) || 'O nº de dias deve ser um número inteiro',
          ],


          //Data para os popups
          success_opened: false,
          error_opened: false,
          results: [],

          //Estados iniciais do modelo do form, selects, e campos dependentes
          valid: true,
          select: null,
          conditional: false,



          //Conjuntos de Texto - Valores para os campos com atribuição de valores
          married_items: [
            {text : 'Não Casado', value:'0'},
            {text : 'Casado', value:'1'}
          ],
          no_dependents_items: [
            {text:'0',value:'0'},
            {text:'1',value:'1'},
            {text:'2',value:'2'},
            {text:'3',value:'3'},
            {text:'4',value:'4'},
            {text:'5',value:'5'},
            {text:'6 ou mais',value:'6'},
          ],
          twelfths_items: [
            {text:'Não recebo os subsídios em duodécimos',value:'Percent0'},
            {text:'Recebo 50% de um subsídio em duodécimos',value:'Percent50'},
            {text:'Recebo por inteiro em duodécimos',value:'Percent100'},
          ],
          meal_allowance_items: [
            {text:'Não recebo',value:'none'},
            {text:'Cartão/Vales refeição',value:'card'},
            {text:'Remuneração',value:"cash"},
          ],

          //Declaração dos models (checkbox's a false)
          disability: false,
          holiday_allowance: false,
          Christmas_subsidy: false,
          married: null,
          no_dependents: null,
          base_salary: null,
          twelfths: null,
          meal_allowance: null,
          meal_allowance_days: null,
          meal_allowance_value: null,
          teste_madeira: false,

          
          
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
          married:this.married,
          no_dependents:this.no_dependents,
          disability:+this.disability,
          base_salary:this.base_salary,
          twelfths:this.twelfths,
          meal_allowance:this.meal_allowance,
          meal_allowance_value:this.meal_allowance_value,
          meal_allowance_days:this.meal_allowance_days,
          holiday_allowance:+this.holiday_allowance,
          Christmas_subsidy:+this.Christmas_subsidy,
          teste_madeira:+this.teste_madeira,
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
      },

      aConditional (a) {
        if(a === 'none' || a === undefined){
          this.conditional= false;
          this.meal_allowanceRules = this.meal_allowanceRules_false;
          this.meal_allowance_daysRules = this.meal_allowance_daysRules_false;
          this.meal_allowance_value = undefined;
          this.meal_allowance_days = undefined;
        }else if (a === 'card' || a === 'cash'){
          this.conditional = true;
          this.meal_allowanceRules = this.meal_allowanceRules_true;
          this.meal_allowance_daysRules = this.meal_allowance_daysRules_true;
        }
      },



    }    
}
</script>