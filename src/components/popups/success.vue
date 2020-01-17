<template>
    <v-dialog v-model="opened" persistent max-width="290">
      <v-card>
        <v-card-title class="headline">Resultado</v-card-title>
        <v-list three-line subheader v-for="result in results" :key="result.key">
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>{{result.value}}</v-list-item-title>
              <v-list-item-subtitle>{{result.key}}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
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
      results: Array,
    },

}
</script>