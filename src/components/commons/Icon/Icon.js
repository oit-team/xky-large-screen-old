import { VIcon } from 'vuetify/lib/components'
import { convertToUnit } from '../../../utils/helper'

// @vue/component
export default {
  name: 'VcIcon',

  inheritAttrs: false,

  render(h) {
    const data = {
      props: {
        ...this.$attrs,
        size: convertToUnit(this.$attrs.size),
      },
    }

    return h(VIcon, data, this.$slots.default)
  },
}
