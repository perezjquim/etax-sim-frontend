<template>
    <v-dialog v-model="opened" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">Erro</v-card-title>
        <v-card-text>Baboseira.</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" text @click="v => $emit('update', false)">Fechar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<script>
export default {

    props: {
      opened: Boolean,
    },
    
}
</script>