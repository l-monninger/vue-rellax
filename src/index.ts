import Rellax, { RellaxInstance } from 'rellax'
import { VNode, DirectiveHook, Plugin, App } from 'vue'

/**
 * created - new! This is called before the element's attributes or event listeners are applied.
 * bind → beforeMount
 * inserted → mounted
 * beforeUpdate: new! This is called before the element itself is updated, much like the component lifecycle hooks.
 * update → removed! There were too many similarities to updated, so this is redundant. Please use updated instead.
 * componentUpdated → updated
 * beforeUnmount: new! Similar to component lifecycle hooks, this will be called right before an element is unmounted.
 * unbind -> unmounted
 */

let _Vue : App; // tslint:disable-line variable-name

const instanceMap = new WeakMap<HTMLElement, RellaxInstance>()

const inserted: DirectiveHook = (el, { value }, vm) => {

  console.log("Installing Rellax on an element.", el, value);

  if (value === false) {
    return
  }

  instanceMap.set(el, new Rellax(el, value));

  
}

const destroy = (el: HTMLElement) => {
  const instance = instanceMap.get(el)
  if (!instance) {
    return
  }
  instance.destroy()
}

const unbind: DirectiveHook = (el) => {
  destroy(el)
}

const update: DirectiveHook = (el, { value }, vm) => {
  console.log("Updating el...", el, value);
  destroy(el)
  if (value === false) {
    return
  }
  instanceMap.set(el, new Rellax(el, value))
}

const install: Plugin = (InjectedVue) => {

  _Vue = InjectedVue

  _Vue.directive('rellax', {
    mounted : inserted,
    updated : update,
    unmounted : unbind,
  })


}

const plugin: Plugin = {
  install,
}

export default plugin
