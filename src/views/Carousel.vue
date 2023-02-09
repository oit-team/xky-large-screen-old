<template>
  <div class="carousel-wrap">
    <PageCarousel
      v-if="!showEmpty"
      ref="carousel"
      :options="options"
      :resources="resources"
      @change="changeIndex"
      @close="close"
      @click.stop
    />
    <div
      v-else
      class="w-full h-full flex justify-center items-center text-7xl"
    >
      暂无内容
    </div>
    <ProductPicker
      ref="picker"
      :options="options"
      :detail-dialog="detailDialog"
      :resources="resources"
      :adverts-style-map="advertsStyleMap"
      :options-index="optionsIndex"
      @lock="lock"
      @unlock="unlock"
    />

    <v-overlay :value="guideDialog" z-index="60" @click="guideDialog = false">
      <div class="grid grid-cols-[repeat(3,200px)] grid-rows-[250px] gap-6 -mt-20">
        <div
          class="bg-black bg-opacity-50 rounded-xl grid place-content-center gap-5"
          @click="$router.push('/lucky')"
        >
          <vc-img src="/assets/img/guide/0.png" size="100px"></vc-img>
          <div>趣味抽奖</div>
        </div>
        <div class="bg-black bg-opacity-50 rounded-xl grid place-content-center gap-5">
          <vc-img src="/assets/img/guide/1.png" size="100px"></vc-img>
          <div>趣味搭配</div>
        </div>
        <div class="bg-black bg-opacity-50 rounded-xl grid place-content-center gap-5">
          <vc-img src="/assets/img/guide/2.png" size="100px"></vc-img>
          <div>了解更多</div>
        </div>
      </div>
    </v-overlay>
  </div>
</template>

<script>
import { debounce } from 'lodash'
import { enterCarouselPage } from '@/api/frame'
import { getAdvertsInfo } from '@/api/product'
import PageCarousel from '@/components/business/Carousel'
import ProductPicker from '@/components/business/ProductPicker'

const DETECT_STATUS = {
  // 没有人
  NOBODY: 0,
  // 有人但比较远
  DISTANCE: 1,
  // 检查到人(在屏幕前)
  PROXIMITY: 2,
  // 检查到人持续在屏幕前8s时长
  WATCHING: 3,
}

export default {

  // name: 'PageCarouselWarp',

  components: {
    PageCarousel,
    ProductPicker,
  },
  data: () => ({
    guideDialog: false,
    status: DETECT_STATUS.NOBODY,
    options: [],
    resources: {},
    advertsStyleMap: {},
    optionsIndex: 0,
    showOverlay: true,
    opacity: 0.6,
    showEmpty: true,
    detailDialog: '',
  }),
  created() {
    this.getData()

    window.OnHumanDetectResult = (status) => {
      this.status = status
      switch (+status) {
        case DETECT_STATUS.NOBODY:
          this.guideDialog = false
          break
        case DETECT_STATUS.DISTANCE:
        case DETECT_STATUS.PROXIMITY:
        case DETECT_STATUS.WATCHING:
          this.guideDialog = true
          break
      }
    }
  },
  activated() {
    this.getData()
  },
  methods: {
    getData() {
      if (this.$route.params.preview) {
        const { imgResources } = this.$store.state.selectedProduct
        this.resources = {}
        this.options = imgResources.map(src => ({
          divide: '100%',
          disabledNext: true,
          items: [{
            src,
            type: 'image',
            fit: 'cover',
          }],
        }))
      } else {
        this.getAdvertsInfo()

        const { query } = this.$route
        enterCarouselPage({
          devId: query.devId,
          brandId: query.brandId,
        })
      }
    },
    async getAdvertsInfo() {
      const res = await getAdvertsInfo(sessionStorage.getItem('devId'))
      this.showEmpty = false
      this.detailDialog = res.body.detailPage
      const {
        rotationRules,
        resEntityMap,
        advertsStyleMap,
      } = res.body.advertsRes
      this.options = JSON.parse(rotationRules)
      this.resources = resEntityMap
      this.advertsStyleMap = advertsStyleMap
    },
    close: debounce(function () {
      const disabledBack = Number(this.$route.query.disabledBack)
      !disabledBack && this.$router.back()
    }, 500, {
      leading: true,
      trailing: false,
    }),
    // 轮播图改变 - index
    changeIndex(index) {
      this.optionsIndex = index
      this.$refs.picker.changeList()
    },
    lock() {
      this.$refs.carousel.lock()
      this.$refs.carousel.currentPlayer?.pause()
    },
    unlock() {
      this.$refs.carousel.unlock()
      this.$refs.carousel.currentPlayer?.play()
    },
  },
}
</script>

<style>
.carousel-wrap {
  position: fixed;
  z-index: 60;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}
</style>
