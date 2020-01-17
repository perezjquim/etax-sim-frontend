<template>
  <div class="faq" style="height:100%;">

    <h1 class="font-weight-black dark grey darken-3 blue--text text--lighten-4 text-center" style="height:5%;text-transform: capitalize;">
      FAQ
    </h1>

    <div style="height:95%;display:flex;justify-content:center;align-items:center;border:1px solid rgb(187, 222, 251);border-left:0px;border-right:0px;">
    <v-card
      class="mx-auto"
      style="width:50%;height:65%;border:0.3vh solid rgb(187, 222, 251);border-top:none;"
    >

    <v-card-title class="subtitle-1 blue lighten-4 grey--text text--darken-4 justify-center" style="height:15%;" >Têm alguma dúvida relativamente ao funcionamento da nossa plataforma ? Aqui disponibilizamos as questões gerais mais <br> frequentes por parte dos nossos utilizadores.</v-card-title>

    <v-divider dark inset></v-divider>
      <v-layout white lighten-4 style="height:85%;">
      <div class="ml-5 mt-5" style="display:block;">

        <div class="faqContainer">

        <button type="button" class="question">Pergunta</button>
        <div class="answer">
            <p>Resposta</p>
        </div>

        </div>

      </div>
      </v-layout>

    </v-card>
    </div>

  </div>
</template>

<script>

export default {

  data(){
    return{
    
    }
  },

  methods:{



  }
  
}
</script>