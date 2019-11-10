import Vue from 'vue'
import VueCompositionApi from '@vue/composition-api'
import hooks from '@u3u/vue-hooks'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
// Application import
import App from '@/App.vue'
// ServiceWorker
import '@/registerServiceWorker'
// Fonts & Styles
import '@/assets/font/muli-font.css'
import '@/assets/font/handlee-font.css'
import '@mdi/font/css/materialdesignicons.css'
import '@/styles/main.scss'

Vue.config.productionTip = false

Vue.use(hooks)
Vue.use(VueCompositionApi)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app')
