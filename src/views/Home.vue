<template>
  <div class="home">
    <img alt="nanoAPPs logo" src="@/assets/img/logo.png" />
    <HelloWorld msg="Welcome to nanoAPPs" />
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

<style lang="scss" scoped>
.home {
  width: 100%;
  text-align: center;
}
</style>
