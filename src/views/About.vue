<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'
// Log
import { getLogger } from '@/services/logging'
const log = getLogger('About')

export default createComponent({
  name: 'about',
  setup(props, context) {
    log('props:')
    log(props)
    log('context:')
    log(context)

    return {} // las props se pasan automáticamente, no es necesario devolverlas aquí.
  },
})
</script>

<style lang="sass" scoped>
.about
  width: 100%
  text-align: center
  font-family: 'Handlee', script !important
</style>
