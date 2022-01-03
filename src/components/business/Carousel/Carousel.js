import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import { VFadeTransition } from 'vuetify/lib/components'

import Image from './types/Image'
import Video from './types/Video'

import './Carousel.scss'
import 'swiper/css/swiper.css'

const r = []

for (let i = 0, l = 4; i < l; i++) {
  r.push({
    id: i,
    src: `http://res.gaodanyi.com:8102/upload/gdy/dp/gdy00${i + 1}.MP4`,
  })
}

const c = []
for (let i = 0, l = 4; i < l; i++) {
  if (i % 2 === 0) {
    c.push({
      items: [
        {
          src: `http://res.gaodanyi.com:8102/upload/gdy/dp/gdy00${i + 1}.MP4`,
          type: 'video',
          fit: 'cover',
          // poster: 'http://res.gaodanyi.com:8102/upload/gdy/dp/gdy002.png',
        },
        {
          src: `http://res.gaodanyi.com:8102/upload/gdy/dp/gdy00${i + 1}.png`,
          type: 'image',
          fit: 'cover',
        },
      ],
      divide: '80%',
      duration: 0,
    })
  } else {
    c.push({
      items: [
        {
          src: `http://res.gaodanyi.com:8102/upload/gdy/dp/gdy00${i}.png`,
          type: 'image',
          fit: 'cover',
        },
        {
          src: `http://res.gaodanyi.com:8102/upload/gdy/dp/gdy00${i + 1}.MP4`,
          type: 'video',
          // poster: 'http://res.gaodanyi.com:8102/upload/gdy/dp/gdy002.png',
          fit: 'contain',
        },
      ],
      divide: '250px',
      duration: 3000,
    })
  }
}

/**
 * TODO :
 * 1.定义每个项目的填充模式 object-fit
 */
export default {
  name: 'page-carousel',

  provide() {
    return {
      carousel: this,
    }
  },

  data: () => ({
    data: {
      carousel: c,
      resouces: r,
    },
    realIndex: 0,
    show: true,
  }),

  mounted() {
    this.$swiper = this.$refs.swiper.$swiper
  },

  methods: {
    genSwiper() {
      return this.$createElement(Swiper, {
        ref: 'swiper',
        class: 'page-carousel',
        props: {
          options: {
            // loop: true,
          },
        },
        on: {
          slideChangeTransitionEnd: () => {
            this.realIndex = this.$swiper.realIndex
          },
        },
        directives: [{
          name: 'show',
          value: this.show,
        }],
      }, this.genSwiperSlide())
    },
    genSwiperSlide() {
      // eslint-disable-next-line arrow-body-style
      return this.data.carousel.map((config, index) => {
        return this.$createElement(SwiperSlide, {
          class: 'page-carousel__wrapper',
          style: {
            '--slide-first-child-flex': `0 0 ${config.divide}`,
          },
        }, this.genContainer(config, index))
      })
    },
    genContainer(config, index) {
      const refKey = `slide${index}`

      const itemsRender = config.items.map(item => {
        let component = null

        switch (item.type) {
          case 'image':
            component = Image
            break
          case 'video':
            component = Video
            break
          default:
            return undefined
        }

        return this.$createElement(component, {
          ref: refKey,
          refInFor: true,
          props: {
            index,
            realIndex: this.realIndex,
            item,
            config,
            resouces: this.data.resouces,
          },
          on: {
            next: () => {
              const allReady = this.$refs[refKey].every(blockItem => blockItem.readyNext)
              // 前往下一个轮播内容，如果没有下一个，则回到第一个
              if (allReady && !this.$swiper.slideNext()) this.$swiper.slideTo(0)
            },
            close: () => {
              this.show = false
            },
          },
        }, item.type)
      })

      return itemsRender
    },
    slideNext() {
      this.$swiper.slideNext()
    },
  },

  render(h) {
    return h(VFadeTransition, [this.genSwiper()])
  },
}
