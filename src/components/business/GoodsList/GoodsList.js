import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import Vue from 'vue'
import { VIcon } from 'vuetify/lib/components'
import { chunk } from 'lodash'
import ClothingPriceCard from '../Clothing/PriceCard.vue'

// @vue/component
export default {
  components: {
    VIcon,
  },

  data: () => ({
    options: {},
    len: 19,
  }),

  computed: {
    clothingList() {
      return chunk(
        Array
          .from({ length: this.len })
          .map((v, i) => i),
        2,
      )
    },
  },

  created() {
    this.options = {
      freeMode: true,
      shortSwipes: false,
      slidesPerView: 5.5,
      spaceBetween: 30,
      momentumRatio: 3,
      momentumVelocityRatio: 1.5,
      virtual: {
        slides: this.clothingList,
        renderSlide: this.genSlideContent.bind(this),
        addSlidesBefore: 6,
        addSlidesAfter: 6,
      },
      on: {
        // TODO 自由模式下滚动结束对齐到第一列
        transitionEnd: () => {
        },
        slideChange: (e) => {
          console.log(e)
          if (!this.$swiper) return
          // this.len += 15
          // 问题：当slide里只有一个项目时，即使后续添加了新项，也不会刷新
          // 解决：清理最后一个slide缓存，使其重新加载
          const last = Object.keys(this.$swiper.virtual.cache).at(-1)
          const lastSlide = this.$swiper.virtual.cache[last]?.[0]
          if (lastSlide?.__vue__?.$children?.length === 1) {
            this.$swiper.virtual.removeSlide(this.clothingList.length - 1)
            delete this.$swiper.virtual.cache[last]
          }

          this.$swiper.virtual.slides = this.clothingList
        },
      },
    }
  },

  mounted() {
    this.$swiper = this.$refs.swiper.$swiper
  },

  methods: {
    genGoodsList() {
      return this.$createElement(Swiper, {
        ref: 'swiper',
        class: 'flex-1 px-8',
        props: {
          options: this.options,
        },
      }, [this.$createElement('div', { class: 'absolute left-full z-20' }, '测试')])
    },
    genSlideContent(slide, index) {
      if (!slide) return undefined
      const { $vuetify } = this

      const Slide = Vue.extend({
        created() {
          // 问题: 图标无法正常显示
          // 定位到问题是$vuetify成了一个组件，具体原因未知
          // 暂时选择直接修改值来解决
          this.$vuetify = $vuetify
        },
        // eslint-disable-next-line arrow-body-style
        render: () => {
          const child = slide.map(i => this.$createElement(ClothingPriceCard, {
            class: 'mb-4',
          }, [
            // this.$createElement('div', i),
            this.genTrashBtn(this.$createElement),
          ]))
          return this.$createElement('div', {
            class: 'swiper-slide flex flex-col',
          }, child)
        },
      })
      return new Slide().$mount().$el
    },
    genTrashBtn(h) {
      return (
        <vc-btn class="mt-2 bg-white" fab small>
          <vc-icon size="18" color="#d9d9d9">fas fa-trash-alt</vc-icon>
        </vc-btn>
      )
    },
    loadData() {

    },
  },

  render() {
    return this.genGoodsList()
  },
}
