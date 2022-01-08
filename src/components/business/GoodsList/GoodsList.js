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
  }),

  computed: {
    clothingList() {
      return chunk(
        Array
          .from({ length: 30 })
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
        renderSlide: this.genSlideContent,
        addSlidesBefore: 6,
        addSlidesAfter: 6,
      },
      on: {
        // TODO 自由模式下滚动结束对齐到第一列
        transitionEnd: () => {
        },
      },
    }
  },

  methods: {
    genGoodsList() {
      return this.$createElement(Swiper, {
        class: 'flex-1',
        props: {
          options: this.options,
        },
      }, this.genSlideContent())
    },
    genSlideContent(slide, index) {
      const { $vuetify } = this

      const Slide = Vue.extend({
        created() {
          // 问题: 图标无法正常显示
          // 定位到问题是$vuetify成了一个组件，具体原因未知
          // 暂时选择直接修改值来解决
          this.$vuetify = $vuetify
        },
        render: () => {
          const item = this.$createElement(ClothingPriceCard, {
            class: 'mb-4',
          }, [
            this.genTrashBtn(this.$createElement),
          ])

          return this.$createElement('div', {
            class: 'swiper-slide flex flex-col',
          }, [
            item,
            item,
          ])
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
  },

  render() {
    return this.genGoodsList()
  },
}
