<template>
  <v-container class="fill-height" fluid>
    <div class="home">
      <img alt="nanoAPPs logo" src="@/assets/img/logo.png" />
      <HelloWorld msg="Welcome to nanoAPPs" />
    </div>
  </v-container>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'
import HelloWorld from '@/components/HelloWorld.vue'
// Log
import { getLogger } from '@/services/logging'
const log = getLogger('Home')

export default createComponent({
  name: 'home',
  components: {
    HelloWorld,
  },
  setup(props, context) {
    return {} // las props se pasan automáticamente, no es necesario devolverlas aquí.
  },
})
</script>

<style lang="sass" scoped>
.home
  width: 100%
  text-align: center
</style>
