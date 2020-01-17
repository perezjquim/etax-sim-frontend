<template>
    <v-dialog v-model="opened" persistent max-width="500" >
      <v-card
        class="mx-auto"
        style="border:0.3vh solid rgb(129, 199, 132);border-top:none;"
      >
        <v-card-title v-if="!spain" class="headline green lighten-2 grey--text text--darken-4 justify-center" >Resultados da simulação</v-card-title>
        <v-card-title v-if="spain" class="headline green lighten-2 grey--text text--darken-4 justify-center" >Resultados de la simulación</v-card-title>

        <v-divider/>
        <br>
        <v-layout justify-center white lighten-4 style="height:85%;">
        <div class="pa-auto ma-auto" style="display:flex;">
        
        <v-simple-table>
         <table> 
           <br>
           <tbody>
             <tr v-for="result in results" :key="result.key">
               <td v-if="result.key.includes('liquid') && !spain" class="title" style="border:2px dashed black"> 
                 Salário Líquido
               </td>
               <td v-if="result.key.includes('liquid') && spain"  class="title" style="border:2px dashed black"> 
                 Salario Líquido
               </td>
               <td class="display-1 green--text text--lighten-2" style="border:2px dashed black;border-left:none">
                 {{result.value}} €
               </td>
             </tr>
           </tbody>
           <br>
         </table>
        </v-simple-table>

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
      results: Array,
      spain: Boolean,
    },

}
</script>