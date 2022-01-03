import { VImg } from 'vuetify/lib/components'
import Measurable from '@/mixins/Measurable'

// @vue/component
export default {
  name: 'VcImg',

  extends: VImg,

  mixins: [Measurable],

  render(h) {
    return VImg.options.render.call(this, h)
  },
}
