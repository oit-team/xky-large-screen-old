<template>
  <div>
    <swiper>
      <swiper-slide>
        <video ref="video" class="h-full w-full" src="http://res.gaodanyi.com:8102/upload/gdy/dp/gdy001.MP4"></video>
      </swiper-slide>
      <swiper-slide>
        <v-img src="http://picsum.photos/900"/>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import Plyr from 'plyr'
import 'plyr/dist/plyr.css'

export default {
  name: 'Video',

  components: {
    Swiper,
    SwiperSlide,
  },

  mounted() {
    this.player = new Plyr(this.$refs.video, {
      // 自动播放
      autoplay: this.autoplay,
      // loop: {
      //   active: true,
      // },
      fullscreen: {
        enabled: false,
      },
      keyboard: {
        focused: false,
      },
      // controls: ['progress', 'play-large'],
      // hideControls: false,
      clickToPlay: false,
    })
  },
}
</script>

<style scoped>

</style>
