import Vue from 'vue'
import VueCompositionApi from '@vue/composition-api'
import hooks from '@u3u/vue-hooks'
import router from '@/services/router'
import store from '@/services/store'
import vuetify from './plugins/vuetify'
// Application import
import App from '@/App.vue'
// ServiceWorker
import '@/registerServiceWorker'
// Fonts & Styles
import '@/assets/font/muli-font.css'
import '@/assets/font/handlee-font.css'
import '@mdi/font/css/materialdesignicons.css'
import '@/styles/main.sass'

// Log
import { getLogger } from '@/services/logging'
const log = getLogger('main')

// Don't warn about using the dev version of Vue in development.
Vue.config.productionTip = process.env.NODE_ENV === 'production'

log('main', 'Start Vue App')

Vue.use(hooks)
Vue.use(VueCompositionApi)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app')
