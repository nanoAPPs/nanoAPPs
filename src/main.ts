import Vue from 'vue'
import VueCompositionApi from '@vue/composition-api'
import hooks from '@u3u/vue-hooks'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'

Vue.config.productionTip = false

Vue.use(hooks)
Vue.use(VueCompositionApi)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app')
