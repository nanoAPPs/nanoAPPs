import Vue from 'vue'
import VueCompositionApi from '@vue/composition-api'
import { router } from '@/services/router'
import { store } from '@/services/store'
// To test database works:
import { database } from '@/services/database'
import vuetify from '@/plugins/vuetify'
import { setVueRuntime } from '@/utils/vueRuntime'
// Application import
import App from '@/App.vue'
// ServiceWorker
import '@/registerServiceWorker'
// Fonts & Styles
import '@/assets/font/muli-font.css'
import '@/assets/font/chilanka-font.css'
import '@mdi/font/css/materialdesignicons.css'
import '@/styles/main.sass'

// Log
import { getLogger } from '@/services/logging'
const log = getLogger('main')

// Don't warn about using the dev version of Vue in development.
Vue.config.productionTip = process.env.NODE_ENV === 'production'

log('main', 'Start Vue App v.' + process.env.VUE_APP_VERSION)

Vue.use(VueCompositionApi)

const vm = new Vue({
  router,
  store: store.original,
  vuetify,
  render: h => h(App),
})
setVueRuntime(vm)
vm.$mount('#app')

// To test database works:
async function startApp() {
  log('startApp', "Let's go!")
  // Initialize System module
  // store.registerModule(system.name, system.store)
  // router.addRoutes(system.routes)
  // await store.dispatch(system.name + '/initialize', null, { root: true })

  try {
    log('startApp', 'Opening database...')
    const promise = database.open('nanoAPPs-DB')
    log('startApp', 'waiting for database...')
    // wait for database
    const db = await promise
    log('startApp', 'Database opened!')
    log('startApp', await db.name)
  } catch (error) {
    log('startApp', 'Error opening Database!', error)
  }
}
