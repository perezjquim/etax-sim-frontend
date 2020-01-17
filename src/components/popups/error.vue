<template>
    <v-dialog v-model="opened" persistent max-width="500" >
      <v-card
        class="mx-auto"
        style="border:0.3vh solid rgb(229, 115, 115);border-top:none;"
      >
        <v-card-title v-if="!spain" class="headline red lighten-2 grey--text text--darken-4 justify-center" >Erro</v-card-title>
        <v-card-title v-if="spain" class="headline red lighten-2 grey--text text--darken-4 justify-center" >Error</v-card-title>

        <v-divider/>
        <br>
        <v-layout justify-center white lighten-4 style="height:85%;">
        <div class="pa-auto ma-auto" style="display:flex;">
        
          <v-card-text v-if="!spain" class="display-1 red--text text--lighten-2">
            Ocorreu um erro no processamento da simulação. Verifique os dados e tente novamente.
          </v-card-text>
          <v-card-text v-if="spain" class="display-1 red--text text--lighten-2"> 
            Se ha producido un error durante el procesamiento de la simulación. Verifique los datos e intente nuevamente.
          </v-card-text>  

        </div>
        </v-layout>

        <br>
        <v-divider/>
        <v-card-actions class="grey lighten-4">
          <v-spacer></v-spacer>
          <v-btn v-if="!spain" color="red darken-1" text @click="v => $emit('update', false)">Fechar</v-btn>
          <v-btn v-if="spain" color="red darken-1" text @click="v => $emit('update', false)">Cerrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
export default {

    props: {
      opened: Boolean,
      spain: Boolean,
    },
    
}
</script>