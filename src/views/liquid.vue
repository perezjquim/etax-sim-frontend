<template>
  <div class="liquid">
    
    <h1 class="display-4 font-weight-black dark blue darken-4 white--text text--lighten-4 text-center">Santarém > Salário Liquido</h1>

    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eum debitis facilis modi sapiente corrupti voluptate, expedita exercitationem autem repellat dolor dicta minus saepe eligendi officiis ab ipsum magni et fuga.
    </p>

    <br>

    <v-form
        ref="form"
        v-model="valid"
        lazy-validation
    >
        

        <p class=text-center>Dados para a simulação</p>

        <br>
    
        <p class=text-center>Agregado Familiar</p>

        <v-row justify="center">

            <v-col cols="5">
                <v-select
                v-model="selectsituacao"
                :items="situation"
                :rules="[v => !!v || 'Campo necessário']"
                label="Situação"
                required
                ></v-select>
            </v-col>


            <v-col cols="5">
                <v-select
                v-model="selectdependentes"
                :items="children"
                :rules="[v => !!v || 'Campo necessário']"
                label="Nº de dependentes"
                required
                ></v-select>
            </v-col>

        </v-row>

        <v-row justify=center>
        
            <v-checkbox
            v-model="checkbox"
            label=" Tem uma incapacidade superior a 60%? "
            ></v-checkbox>

        </v-row>
        
        <br>

        <p class=text-center>Rendimentos</p>

        <v-row justify="center">

            <v-col cols="3">
                <v-text-field
                v-model="vencimento"
                :rules="numberRules"
                label="Vencimento Base (€)"
                required
                ></v-text-field>
            </v-col>
            
            <v-col cols="3">
                <v-text-field
                v-model="retribuicao"
                :rules="numberRules"
                label="Retribuição extraordinária (€)"
                required
                ></v-text-field>
            </v-col>

            <v-col cols="3">
                <v-text-field
                v-model="outrosrendirsss"
                :rules="numberRules"
                label="Outros rend. suj. a IRS e SS (€)"
                required
                ></v-text-field>
            </v-col>

        </v-row>

        <v-row justify="center">

            <v-col cols="3">
                <v-text-field
                v-model="outrosrendirs"
                :rules="numberRules"
                label="Outros rendimentos suj. só a IRS (€)"
                required
                ></v-text-field>
            </v-col>

            <v-col cols="3">
                <v-text-field
                v-model="outrosrendisentos"
                :rules="numberRules"
                label="Outros rendimentos isentos (€)"
                required
                ></v-text-field>
            </v-col>

            <v-col cols="3">
                <v-text-field
                v-model="taxass"
                :rules="numberRules"
                label="Taxa de Segurança Social (€)"
                required
                ></v-text-field>
            </v-col>
        
        </v-row>

        <v-row justify="center">
            <v-col cols="3">

                <v-select
                v-model="selectduodecimos"
                :items="twelfths"
                :rules="[v => !!v || 'Campo necessário']"
                label="Recebe subsídio(s) em duodécimos?"
                required
                ></v-select>
        
            </v-col>
        </v-row>

        <br>

        <p class=text-center>Subsídio refeição</p>

        <v-row  justify="center">

            <v-col cols="3">
                <v-select
                v-model="selecttipo"
                :items="type"
                :rules="[v => !!v || 'Campo necessário']"
                label="Tipo"
                required
                ></v-select>
            </v-col>

                <!-- Estes dois só vão poder estar ativos quando o anterior estiver selecionado  -->

            <v-col cols="3">
                <v-text-field
                v-model="valordiario"
                :rules="numberRules"
                label="Valor diário"
                ></v-text-field>
            </v-col>

            <v-col cols="3">
                <v-text-field
                v-model="dias"
                :rules="numberRules"
                label="Dias"
                ></v-text-field>
            </v-col>

        </v-row>

        <br>

        <!-- Acaba aqui os campos pedidos, falta definir as rules para cada campo -->

        <v-layout justify-center>

            <v-btn
            :disabled="!valid"
            color="success"
            class="mr-4"
            @click="validate"
            >
            Validar
            </v-btn>

            <v-btn
            color="error"
            class="mr-4"
            @click="reset"
            >
            Limpar Formulário
            </v-btn>

            <v-btn
            color="warning"
            @click="resetValidation"
            >
            Limpar Validações
            </v-btn>

        </v-layout>


  </v-form>


  </div>
</template>

<script>
  export default {
    data: () => ({

      valid: true,
      
      number: '',
      numberRules: [
        v => !!v || 'Number is required',
        v => (v && v.length <= 10) || 'Number must be less than 10 characters',
      ],

      select: null,

      situation: [
        'Não Casado',
        'Casado, 1 titular',
        'Casado, 2 titulares',
      ],
      children: [
        '0',
        '1',
        '2',
        '3',
        '4',
        '5 ou mais',
      ],
      twelfths: [
        'Não recebo os subsídios em duodécimos',
        'Recebo 50% de um subsídio em duodécimos',
        'Recebo 50% dos dois subsídios ou 1 subsídio completo em duodécimos',
        'Recebo os dois subsídios por inteiro em duodécimos',
      ],
      type: [
        'Não tenho',
        'Cartão/Vales refeição',
        'Remuneração',
      ],

      checkbox: false,
    }),

    methods: {
      validate () {
        if (this.$refs.form.validate()) {
          this.snackbar = true
        }
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
    },
  }
</script>