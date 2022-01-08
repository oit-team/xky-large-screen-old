import { VBtn } from 'vuetify/lib/components'

const { props } = VBtn.options

// @vue/component
export default {
  name: 'VcBtn',

  extends: VBtn,

  props: {
    // 默认显示凹陷
    // eslint-disable-next-line vue/require-prop-types
    depressed: {
      ...props.depressed,
      default: true,
    },
  },
}
