export { default as AppConverter } from '../..\\components\\AppConverter\\AppConverter.vue'
export { default as AppConverterAddTypes } from '../..\\components\\AppConverter\\converter-add.types.ts'
export { default as AppConverterModeTypes } from '../..\\components\\AppConverter\\converter-mode.types.ts'
export { default as AppConverterSettingsTypes } from '../..\\components\\AppConverter\\converter-settings.types.ts'
export { default as AppHeader } from '../..\\components\\AppHeader\\AppHeader.vue'
export { default as AppHeaderAuthModal } from '../..\\components\\AppHeader\\AppHeaderAuthModal.vue'
export { default as AppHeaderAuthFormTypes } from '../..\\components\\AppHeader\\auth-form.types.ts'
export { default as AppHeaderAuthModalState } from '../..\\components\\AppHeader\\auth-modal.state.ts'
export { default as AppNotification } from '../..\\components\\AppNotification\\AppNotification.vue'

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
