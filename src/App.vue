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
      <div class="flex-grow-1"></div>
      <v-btn v-if="fullscreenEnabled" icon @click.stop="toggleFullscreenBtn">
        <v-icon v-if="!isFullscreen">mdi-fullscreen</v-icon>
        <v-icon v-if="isFullscreen">mdi-fullscreen-exit</v-icon>
      </v-btn>
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
    log('props: ', props)
    log('context: ', context)
    let title = ref('nanoAPPs')
    let drawer = ref(false)
    let fullscreenEnabled = ref(screenfull.isEnabled)
    let isFullscreen = ref(screenfull.isEnabled && screenfull.isFullscreen)
    if (screenfull.isEnabled) {
      screenfull.on('change', () => {
        log('changed screenfull: ', screenfull.isEnabled && screenfull.isFullscreen ? 'Yes' : 'No')
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

    return {
      title,
      drawer,
      fullscreenEnabled,
      isFullscreen,
      links,
      onClickNavIconBtn() {
        drawer.value = !drawer.value
      },
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
    }
  },
})
</script>

<style lang="sass">
.footer-shadow
  box-shadow: 0 -3px 3px -2px rgba(0, 0, 0, 0.2), 0 -3px 4px 0 rgba(0, 0, 0, 0.14), 0 -1px 8px 0 rgba(0, 0, 0, 0.12)
  -webkit-box-shadow: 0 -3px 3px -2px rgba(0, 0, 0, 0.2), 0 -3px 4px 0 rgba(0, 0, 0, 0.14), 0 -1px 8px 0 rgba(0, 0, 0, 0.12)
</style>
