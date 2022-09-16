import { VImg } from 'vuetify/lib/components'

import mixin from './mixin'

export default {
  name: 'image-type',

  mixins: [mixin],

  data() {
    this.timer = null
    return {}
  },

  watch: {
    'active': {
      handler(value) {
        if (value) {
          this.slideNext()
        } else {
          this.readyNext = false
          clearTimeout(this.timer)
        }
      },
      immediate: true,
    },
    'carousel.show': function (value) {
      if (value) {
        this.active && this.slideNext()
      } else {
        this.readyNext = false
        clearTimeout(this.timer)
      }
    },
  },

  methods: {
    slideNext() {
      this.timer = setTimeout(() => {
        this.readyNext = true
        this.$emit('next')
      }, this.config.duration || 5000)
    },
  },

  render(h) {
    const {
      src,
      fit,
    } = this.item

    return h(VImg, {
      props: {
        src,
        lazySrc: src,
      },
      style: {
        '--slide-object-fit': fit,
      },
      on: {
        click: () => this.$emit('close'),
      },
    })
  },
}
