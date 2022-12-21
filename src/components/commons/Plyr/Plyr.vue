<template>
  <video ref="video" class="h-full w-full" :src="src" />
</template>

<script>
import Plyr from 'plyr'
import 'plyr/dist/plyr.css'

export default {
  name: 'VcPlyr',

  props: {
    src: String,
    options: Object,
  },

  mounted() {
    this.player = new Plyr(this.$refs.video, this.options)
  },
}
</script>
