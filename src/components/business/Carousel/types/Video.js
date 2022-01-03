import Vue from 'vue'

import Plyr from 'plyr'
import 'plyr/dist/plyr.css'

import { VBtn } from 'vuetify/lib/components'
import mixin from './mixin'

// 双击判定时间(ms)
const INTERVAL = 300

const debugState = (index, state) => console.debug(`[${index}] 播放状态 ==> ${state}`)

export default {
  name: 'video-type',

  mixins: [mixin],

  data() {
    this.timer = null
    this.timestamp = 0
    return {}
  },

  watch: {
    active(value) {
      // 切换播放
      this.player.togglePlay(value)
      // 重置播放
      if (!value) {
        this.stopPlay()
      }
    },
    'carousel.show': function (value) {
      if (value) {
        this.active && this.player.play()
      } else {
        setTimeout(() => this.stopPlay(), 500)
      }
    },
  },

  created() {
  },

  mounted() {
    this.player = new Plyr(this.$el, {
      // controls: this.genControls(),
      // autoplay: true,
      // loop: {
      //   active: true,
      // },
      fullscreen: {
        enabled: false,
      },
      keyboard: {
        focused: false,
      },
      controls: ['progress', 'play-large'],
      hideControls: false,
      clickToPlay: false,
    })

    this.hideControls()
    this.bindPlyrListeners()
    // 自动播放
    this.active && this.player.play()
  },

  deactivated() {
    this.player.destroy()
  },

  methods: {
    genVideo() {
      return this.$createElement('video', {
        attrs: {
          // src: 'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-576p.mp4',
          // src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
          src: this.resouces[this.index].src,
          'data-poster': this.item.poster,
        },
        class: 'vc-plyr__video',
        style: {
          '--slide-object-fit': this.item.fit,
        },
        on: {
          click: this.handleClick,
        },
      })
    },
    genControls() {
      const Controls = Vue.extend({
        render: h => h('div', {
          class: 'vc-plyr__controls',
        }, [
          h(VBtn, '测试'),
        ]),
      })

      return new Controls().$mount().$el
    },
    bindPlyrListeners() {
      const showControls = this.showControls.bind(this)
      const hideControls = this.hideControls.bind(this)

      this.player.on('pause', () => {
        debugState(this.index, 'pause')
        showControls()
      })
      this.player.on('stalled', () => {
        debugState(this.index, 'stalled')
        showControls()
      })
      this.player.on('playing', () => {
        debugState(this.index, 'playing')
        hideControls()
      })
      this.player.on('ended', () => {
        debugState(this.index, 'ended')
        hideControls()
        this.slideNext()
      })
    },
    handleClick() {
      // 验证单击还是双击
      if (Date.now() - this.timestamp < INTERVAL) {
        clearTimeout(this.timer)
        this.timestamp = 0

        this.player.togglePlay()
      } else {
        this.timestamp = Date.now()
        this.timer = setTimeout(() => {
          this.$emit('close')
        }, INTERVAL)
      }
    },
    hideControls() {
      this.player.toggleControls(false)
    },
    showControls() {
      this.player.toggleControls(true)
    },
    stopPlay() {
      this.player.stop()
      this.readyNext = false
      setTimeout(() => this.hideControls())
    },
    slideNext() {
      this.readyNext = true
      this.$emit('next')
    },
  },

  render() {
    return this.genVideo()
  },
}
