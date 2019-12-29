<template>
    <nav> 

       <v-app-bar app clipped-left class="grey darken-3 blue--text text--lighten-4">

           <v-app-bar-nav-icon class="blue--text text--lighten-4" @click="drawer = !drawer"></v-app-bar-nav-icon>

           <v-toolbar-title>
               <span class="font-weight-light">eTax</span>
               <span class="font-weight-bold">Sim</span>
           </v-toolbar-title>

           <v-btn text fixed right class="blue--text text--lighten-4">
               <span>Sair</span>
               <v-icon right>mdi-exit-to-app</v-icon>
           </v-btn>

        </v-app-bar>

        <v-navigation-drawer v-model="drawer" app clipped class="blue lighten-4">
            <v-list dense>

                <v-list-item v-for="link in links" :key="link.text" router :to="link.route">
                    <v-list-item-icon>
                        <v-icon class="grey--text text--darken-4">{{ link.icon }}</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title class="grey--text text--darken-4">{{ link.text }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

            </v-list>
        </v-navigation-drawer>

    </nav>
</template>


<script>
export default {
    data() {
        return {
            
        drawer: false,

        links: [
            { icon: 'mdi-map-marker-radius', text: 'Início', route: '/' },
            { icon: 'mdi-frequently-asked-questions', text: 'FAQ', route: '/faq' },
            { icon: 'mdi-information', text: 'Sobre Nós', route: '/about' },
        ],
        }
    }    
}
</script>