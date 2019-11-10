<template>
  <v-app id="nanoapps">
    <v-navigation-drawer v-model="drawer" app>
      <v-list dense>
        <v-list-item v-for="(link, i) in links" :key="i" :to="link.to">
          <v-list-item-action>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content v-text="link.text" />
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar color="primary" dark app>
      <v-app-bar-nav-icon @click.stop="onClickNavIconBtn" />
      <v-toolbar-title>{{ title }}</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container class="fill-height" fluid>
        <router-view />
      </v-container>
    </v-content>
    <v-footer color="primary" dark app class="footer-shadow">
      <span class="font-weight-light">
        &nbsp;&nbsp;&nbsp;&copy;
        {{ new Date().getFullYear() }}
        nanoAPPs, made with
        <v-icon size="17">mdi-heart</v-icon>&nbsp;for better apps
      </span>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { createComponent, ref } from '@vue/composition-api'

export default createComponent({
  props: {
    source: String,
  },
  setup(props, context) {
    console.log('props:')
    console.log(props)
    console.log('context:')
    console.log(context)
    let title = ref('nanoAPPs')
    let drawer = ref(false)
    let links = ref([
      {
        to: '/',
        icon: 'mdi-home',
        text: 'Inicio',
      },
      {
        to: '/about',
        icon: 'mdi-information-outline',
        text: 'Acerca de nanoAPPs',
      },
    ])

    return {
      title,
      drawer,
      links,
      onClickNavIconBtn() {
        drawer.value = !drawer.value
      },
    }
  },
})
</script>

<style lang="scss">
.v-application {
  font-family: 'Muli', sans-serif !important;
}
.footer-shadow {
  box-shadow: 0 -3px 3px -2px rgba(0, 0, 0, 0.2), 0 -3px 4px 0 rgba(0, 0, 0, 0.14), 0 -1px 8px 0 rgba(0, 0, 0, 0.12);
  -webkit-box-shadow: 0 -3px 3px -2px rgba(0, 0, 0, 0.2), 0 -3px 4px 0 rgba(0, 0, 0, 0.14),
    0 -1px 8px 0 rgba(0, 0, 0, 0.12);
}
</style>
