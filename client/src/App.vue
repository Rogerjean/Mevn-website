<template>
<v-app id='inspire'>
<v-navigation-drawer fixed v-model='drawer' app>
  <v-list dense>
    <router-link :to="{ name: 'Home' }" class='side_bar_link'>
      <v-list-item>
        <v-list-item-action>
          <v-icon>{{ home }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>Home</v-list-item-content>
      </v-list-item>
    </router-link>
    <router-link :to="{ name: 'Contact' }" class='side_bar_link'>
      <v-list-item>
        <v-list-item-action>
          <v-icon>{{ contact_mail }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>Contact</v-list-item-content>
      </v-list-item>
    </router-link>
  </v-list>
</v-navigation-drawer>
<v-app-bar color='indigo' dark fixed app>
  <v-app-bar-nav-icon @click.stop='drawer = !drawer'></v-app-bar-nav-icon>
  <v-toolbar-title>Home</v-toolbar-title>
  <v-spacer></v-spacer>
  <v-toolbar-items class='hidden-sm-and-down'>
    <v-btn text :to="{ name: 'AddMovie' }">Add Movie</v-btn>
  </v-toolbar-items>
</v-app-bar>
<v-content>
  <v-container fluid>
    <div id='app'>
      <router-view/>
    </div>
  </v-container>
</v-content>
<v-footer color='indigo' app>
  <span class='white--text'>&copy; 2019</span>
</v-footer>
</v-app>
</template>

<script>
import './assets/stylesheets/main.sass';
// eslint-disable-next-line
import { mdiHome, mdiContactMail } from '@mdi/js';

export default {
  name: 'App',
  data: () => ({
    home: mdiHome,
    contact_mail: mdiContactMail,
    drawer: null,
  }),
  props: {
    source: String,
  },
};
</script>
