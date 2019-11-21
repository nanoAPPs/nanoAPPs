<template>
  <v-container>
    <v-row align="start">
      <v-col cols="12">
        <h2>This is an example page</h2>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api'
// Log
import { getLogger } from '@/services/logging'
const log = getLogger('_template_')

export default createComponent({
  name: '_template_',
  setup(props, context) {
    log('props: ', props)
    log('context: ', context)

    return {} // las props se pasan automáticamente, no es necesario devolverlas aquí.
  },
})
</script>

<style lang="sass" scoped>
._template_
  width: 100%
  text-align: center
  font-family: 'Handlee', script !important
</style>
