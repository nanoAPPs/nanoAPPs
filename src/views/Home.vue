<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'
import HelloWorld from '@/components/HelloWorld.vue'

export default createComponent({
  name: 'home',
  components: {
    HelloWorld,
  },
  setup(props, context) {
    console.log('props:')
    console.log(props)
    console.log('context:')
    console.log(context)

    return {} // las props se pasan automáticamente, no es necesario devolverlas aquí.
  },
})
</script>
