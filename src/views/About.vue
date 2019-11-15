<template>
  <div class="about">
    <h1>This is an about page</h1>
    <span>Width: {{ width }}</span
    ><br />
    <span>Height: {{ height }}</span>
  </div>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'
import { useWindowSize } from '@/utils/windowSize'
// Log
import { getLogger } from '@/services/logging'
const log = getLogger('About')

export default createComponent({
  name: 'about',
  setup(props, context) {
    log('props: ', props)
    log('context: ', context)
    const { width, height } = useWindowSize()

    return { width, height } // las props se pasan automáticamente, no es necesario devolverlas aquí.
  },
})
</script>

<style lang="sass" scoped>
.about
  width: 100%
  text-align: center
  font-family: 'Handlee', script !important
</style>
