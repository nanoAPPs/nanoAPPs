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

    <v-app-bar color="primary" dark dense app>
      <v-app-bar-nav-icon @click.stop="onClickNavIconBtn" />
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <div class="flex-grow-1"></div>
      <v-btn v-if="fullscreenEnabled" icon @click.stop="toggleFullscreenBtn">
        <v-icon v-if="!isFullscreen">mdi-fullscreen</v-icon>
        <v-icon v-if="isFullscreen">mdi-fullscreen-exit</v-icon>
      </v-btn>
    </v-app-bar>

    <v-system-bar v-if="updateAvailable" color="warning" fixed window app class="center">
      <div class="flex">
        <v-icon>mdi-alert</v-icon>
        <span>Please, restart to load new version of the APP.</span>
      </div>
    </v-system-bar>

    <v-content>
      <v-container class="fill-height" fluid>
        <router-view />
      </v-container>
    </v-content>
    <v-footer color="primary" dark app class="footer-shadow">
      <span class="font-weight-light">v.{{ version }}</span>
      <div class="flex-grow-1"></div>
      <span class="font-weight-light">{{ $vuetify.breakpoint.name }}</span>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { createComponent, ref } from '@vue/composition-api'
import screenfull from 'screenfull'
import { Screenfull } from 'screenfull'
// Log
import { getLogger } from '@/services/logging'
const log = getLogger('App')

export default createComponent({
  props: {
    source: String,
  },
  setup(props, context) {
    let version = ref('0.1.19')
    let title = ref('nanoAPPs')
    let drawer = ref(false)
    let fullscreenEnabled = ref(screenfull.isEnabled)
    let isFullscreen = ref(screenfull.isEnabled && screenfull.isFullscreen)
    let updateAvailable = ref(false)

    if (screenfull.isEnabled) {
      screenfull.on('change', () => {
        isFullscreen.value = screenfull.isEnabled && screenfull.isFullscreen
      })
    }

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

    window.nanoapps_pwa_updated = function() {
      // vetur reporta un error en la línea anterior, pero Typescript compila
      updateAvailable.value = true
    }

    return {
      title,
      drawer,
      version,
      links,
      onClickNavIconBtn() {
        drawer.value = !drawer.value
      },
      fullscreenEnabled,
      isFullscreen,
      toggleFullscreenBtn() {
        var elem = document.documentElement
        if (screenfull.isEnabled) {
          if (!screenfull.isFullscreen) {
            screenfull.request(elem)
          } else {
            screenfull.exit()
          }
        }
      },
      updateAvailable,
    }
  },
})
</script>

<style lang="sass">
.v-system-bar.center
  text-align: center
.footer-shadow
  box-shadow: 0 -3px 3px -2px rgba(0, 0, 0, 0.2), 0 -3px 4px 0 rgba(0, 0, 0, 0.14), 0 -1px 8px 0 rgba(0, 0, 0, 0.12)
  -webkit-box-shadow: 0 -3px 3px -2px rgba(0, 0, 0, 0.2), 0 -3px 4px 0 rgba(0, 0, 0, 0.14), 0 -1px 8px 0 rgba(0, 0, 0, 0.12)
</style>
