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

    <Footer class="carousel-footer z-100 bg-opacity-30" />

    <ProductPicker
      ref="picker"
      :options="options"
      :detail-dialog="detailPage"
      :resources="resources"
      :adverts-style-map="advertsStyleMap"
      :options-index="optionsIndex"
      @lock="lock"
      @unlock="unlock"
    />

    <v-overlay :value="guideDialog" z-index="70" @click="guideDialog = false">
      <div class="grid grid-cols-[repeat(3,200px)] grid-rows-[250px] gap-6 -mt-[15vh] text-center">
        <div
          class="bg-black bg-opacity-50 rounded-xl grid place-content-center gap-5"
          @click="$router.push('/lucky')"
        >
          <vc-img src="/assets/img/guide/0.png" size="100px"></vc-img>
          <div>趣味抽奖</div>
        </div>
        <div
          class="bg-black bg-opacity-50 rounded-xl grid place-content-center gap-5"
          @click="open"
        >
          <vc-img src="/assets/img/guide/1.png" size="100px"></vc-img>
          <div>趣味搭配</div>
        </div>
        <div
          class="bg-black bg-opacity-50 rounded-xl grid place-content-center gap-5"
          @click="toHome"
        >
          <vc-img src="/assets/img/guide/2.png" size="100px"></vc-img>
          <div>了解更多</div>
        </div>
      </div>
    </v-overlay>

    <!--    <Permission ref="permission" @accept="sendCommandToDevice()" /> -->
    <Permission ref="permission" title="授权许可" content="智能搭配需启用拍摄功能<br />仅用于搭配,不做其他用途" @unlock="unlock" @accept="sendCommandToDevice()" />
  </div>
</template>

<script>
import { debounce } from 'lodash'
import { sendCommandToDevice } from '@/api/common'
import { enterCarouselPage } from '@/api/frame'
import { getAdvertsInfo } from '@/api/product'
import PageCarousel from '@/components/business/Carousel'
import Permission from '@/components/business/Permission.vue'
import ProductPicker from '@/components/business/ProductPicker'
import Footer from '@/templates/education/components/Footer.vue'

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
  components: {
    PageCarousel,
    ProductPicker,
    Footer,
    Permission,
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
    detailPage: '',
  }),
  created() {
    this.getData()
    this.unlock()

    window.OnHumanDetectResult = (status) => {
      if (this.$refs.carousel.lockSwiper || this.$refs.permission.accredit) return

      this.status = status
      switch (+status) {
        case DETECT_STATUS.NOBODY:
        case DETECT_STATUS.DISTANCE:
          this.guideDialog = false
          break
        case DETECT_STATUS.PROXIMITY:
        case DETECT_STATUS.WATCHING:
          this.guideDialog = true
          break
      }
    }
    window.OnTabFocus = () => {
      this.unlock()
    }
  },
  activated() {
    this.getData()
    this.unlock()
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
      this.detailPage = res.body.detailPage
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
      this.$refs.carousel?.lock()
      this.$refs.carousel?.currentPlayer?.pause()
    },
    unlock() {
      this.$refs.carousel?.unlock()
      this.$refs.carousel?.currentPlayer?.play()
    },
    async sendCommandToDevice() {
      await sendCommandToDevice({
        devId: sessionStorage.getItem('devId'),
        cmd: 8,
      })
    },
    open() {
      this.lock()
      this.$refs.permission.open()
    },
    toHome() {
      this.lock()
      this.$refs.permission.close()
      this.$router.push({
        path: `/template/${this.detailPage}`,
        query: {
          brandId: sessionStorage.getItem('brandId'),
          devId: sessionStorage.getItem('devId'),
          showBack: true,
        },
      })
    },
  },
}
</script>

<style lang="scss">
.carousel-wrap {
  position: fixed;
  z-index: 60;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;

  .carousel-footer{
    position: fixed;
    bottom: 0;
    display: flex;
    width: 100%;
    height: 12%;
  }
}
</style>
