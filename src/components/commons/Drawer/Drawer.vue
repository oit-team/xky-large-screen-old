<template>
  <div
    class="vc-drawer fixed z-100 bg-black text-white"
    :class="position === 'left' ?  'bg-opacity-50' : 'bg-opacity-20'"
    :style="styles"
    v-if="show"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    position: String,
    offset: String,
  },

  data() {
    return {
      show: true,
    }
  },

  computed: {
    styles() {
      return {
        bottom: this.offset,
        left: this.position === 'left' ? 0 : 'auto',
        right: this.position === 'right' ? 0 : 'auto',
      }
    },
  },

  methods: {
    open() {
      this.show = true
    },
    close() {
      this.show = false
    },
  },
}
</script>

<style lang="scss">
</style>
