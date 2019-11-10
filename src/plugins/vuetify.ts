import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        primary: '#137bbd',
        secondary: '#00c000',
        accent: '#f00000', // '#82B1FF',
        error: '#db2828',
        info: '#31ccec',
        success: '#21ba45',
        warning: '#f2c037',
      },
    },
  },
  icons: {
    iconfont: 'mdi',
  },
})
