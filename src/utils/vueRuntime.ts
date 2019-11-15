import Vue from 'vue'

interface VueRuntime {
  vm?: Vue
}

const runtime: VueRuntime = {}

export function setVueRuntime(vm: Vue) {
  if (typeof vm.$options.setup === 'function') {
    runtime.vm = vm
  }
}

export function getVueRuntime(): Vue {
  if (runtime.vm) return runtime.vm
  throw new ReferenceError('Not found vue instance.')
}
