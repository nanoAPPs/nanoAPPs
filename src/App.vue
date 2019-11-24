<template>
  <v-app id="nanoapps">
    <v-navigation-drawer v-model="drawerToggle" mobile-break-point="991" enable-resize-watcher app>
      <v-list id="app_drawer_title" dense>
        <v-list-item color="primary">
          <div class="title-header">
            <v-avatar class="title-image" size="60">
              <v-img src="@/assets/img/avatar-logo.png" eager />
            </v-avatar>
          </div>
          <div class="title-text">
            nanoAPPs
          </div>
        </v-list-item>
      </v-list>
      <v-list dense>
        <v-list-item v-for="(link, i) in links" :key="i" :to="link.to">
          <v-list-item-action>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content v-text="link.text" />
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar color="primary" dense dark app>
      <v-app-bar-nav-icon @click.stop="drawerToggle = !drawerToggle" />
      <v-toolbar-title>{{ route.meta.title }}</v-toolbar-title>
      <div class="flex-grow-1"></div>
      <v-btn v-if="fullscreenEnabled" icon @click.stop="toggleFullscreenBtn">
        <v-icon v-if="!isFullscreen">mdi-fullscreen</v-icon>
        <v-icon v-if="isFullscreen">mdi-fullscreen-exit</v-icon>
      </v-btn>
    </v-app-bar>

    <v-system-bar
      v-if="updateAvailable"
      @click.stop="loadUpdatedApp"
      color="warning lighten-1"
      class="black--text"
      fixed
      window
      app
    >
      <div class="flex">
        <v-icon>mdi-alert</v-icon>
        <!--<span>Please, restart to load new version of the APP.</span>-->
        <span>New version available, touch here to apply.</span>
      </div>
    </v-system-bar>

    <v-content>
      <router-view />
    </v-content>
    <v-footer color="primary" class="footer-shadow" dark app>
      <span class="font-weight-light">v.{{ version }}</span>
      <div class="flex-grow-1"></div>
      <div class="status-icons">
        <v-icon v-if="!isOnline">mdi-cloud-off-outline</v-icon>
        <v-icon v-if="isOnline">mdi-cloud-outline</v-icon>
      </div>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { createComponent, ref, onMounted, onUnmounted } from '@vue/composition-api'
import screenfull from 'screenfull'
import { Screenfull } from 'screenfull'
import store from '@/services/store'
import { useRouter } from '@/services/router'
import { mainMenu } from '@/services/mainMenu'
// Log
import { getLogger } from '@/services/logging'
const log = getLogger('App')

export default createComponent({
  props: {
    source: String,
  },
  setup(props, context) {
    const version = ref(store.state.appVersion)
    const { route } = useRouter()
    const drawerToggle = ref(false)
    const fullscreenEnabled = ref(screenfull.isEnabled)
    const isFullscreen = ref(screenfull.isEnabled && screenfull.isFullscreen)
    const updateAvailable = ref(false)
    const isOnline = ref(false)

    const windowResized = () => {
      log('windowResized: ' + window.innerWidth)
    }

    const onlineStatusUpdated = () => {
      isOnline.value = navigator.onLine
    }

    window.addEventListener('resize', windowResized)
    window.addEventListener('offline', onlineStatusUpdated)
    window.addEventListener('online', onlineStatusUpdated)

    onMounted(() => {
      if (window.innerWidth >= 991) {
        drawerToggle.value = true
      }
      onlineStatusUpdated()
    })

    onUnmounted(() => {
      window.removeEventListener('resize', windowResized)
      window.removeEventListener('offline', onlineStatusUpdated)
      window.removeEventListener('online', onlineStatusUpdated)
    })

    if (screenfull.isEnabled) {
      screenfull.on('change', () => {
        isFullscreen.value = screenfull.isEnabled && screenfull.isFullscreen
      })
    }

    let links = ref(mainMenu)

    var registration: ServiceWorkerRegistration
    window.nanoapps_pwa_updated = function(reg) {
      log('Update available')
      updateAvailable.value = true
      registration = reg
    }
    var updateLoadRequested = false
    const loadUpdatedApp = () => {
      if (updateLoadRequested) return
      updateLoadRequested = true
      if (!registration.waiting) return
      registration.waiting.postMessage({ type: 'SKIP_WAITING' })
    }
    // When the user asks to refresh the UI, we'll need to reload the window
    var refreshing = false
    navigator.serviceWorker.addEventListener('controllerchange', function(event) {
      if (refreshing) return // prevent infinite refresh loop when you use "Update on Reload" in Dev. Tools
      refreshing = true
      log('SW Controller loaded')
      window.location.reload()
    })

    return {
      route,
      drawerToggle,
      version,
      links,
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
      loadUpdatedApp,
      isOnline,
    }
  },
})
</script>

<style lang="sass" scoped>
#app_drawer_title
  padding: 0
#app_drawer_title
  .v-list-item
    padding: 0
    display: block
  .title-header
    display: block
    float: left
    width: 100%
    height: 48px
    background-color: var(--v-primary-base)
  .title-text
    display: block
    float: left
    width: 100%
    padding-top: 4px
    padding-bottom: 5px
    color: black
    font-weight: bold
    margin-left: 75px
  .title-image
    position: relative
    top: 25px
    margin-left: 10px
.v-system-bar
  text-align: center
  cursor: pointer
.v-footer
  font-size: 13px
  .status-icons
    height: 20px
    .v-icon
      font-size: 20px
.footer-shadow
  box-shadow: 0 -3px 3px -2px rgba(0, 0, 0, 0.2), 0 -3px 4px 0 rgba(0, 0, 0, 0.14), 0 -1px 8px 0 rgba(0, 0, 0, 0.12)
  -webkit-box-shadow: 0 -3px 3px -2px rgba(0, 0, 0, 0.2), 0 -3px 4px 0 rgba(0, 0, 0, 0.14), 0 -1px 8px 0 rgba(0, 0, 0, 0.12)
</style>
