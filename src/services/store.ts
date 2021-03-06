import Vue from 'vue'
import Vuex from 'vuex'
import { createDirectStore } from 'direct-vuex'

Vue.use(Vuex)

const { store, rootActionContext, moduleActionContext } = createDirectStore({
  strict: process.env.NODE_ENV !== 'production',
  state: {
    appVersion: process.env.VUE_APP_VERSION || '_DEV_',
  },
  mutations: {},
  actions: {},
  modules: {},
} as const)

// Export the direct-store instead of the classic Vuex store.
// The following exports will be used to enable types in the implementation of actions.
export { store, rootActionContext, moduleActionContext }

// The following lines enable types in the injected store '$store'.
export type AppStore = typeof store

declare module 'vuex' {
  interface Store<S> {
    direct: AppStore
  }
}
