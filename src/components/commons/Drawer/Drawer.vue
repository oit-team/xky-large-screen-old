<template>
  <div class="vc-drawer fixed z-100 bg-black bg-opacity-50 text-white" :style="styles">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    position: String,
    offset: String,
  },

  computed: {
    styles() {
      return {
        top: this.offset,
        left: this.position === 'left' ? 0 : 'auto',
        right: this.position === 'right' ? 0 : 'auto',
      }
    },
  },
}
</script>

<style lang="scss">
</style>
