<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'

export default createComponent({
  name: 'about',
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
.about {
  width: 100%;
  text-align: center;
  font-family: 'Handlee', script !important;
}
</style>
