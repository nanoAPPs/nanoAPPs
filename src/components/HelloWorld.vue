<template functional>
  <div class="hello">
    <h1>{{ props.msg }}</h1>
  </div>
</template>

<script lang="ts">
import { createComponent, ref } from '@vue/composition-api'

export default createComponent({
  name: 'HelloWorld',
  props: {
    msg: String,
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
