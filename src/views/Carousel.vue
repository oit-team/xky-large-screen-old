<template>
  <div class="carousel-wrap">
    <PageCarousel
      v-if="!showEmpty"
      ref="carousel"
      :options="options"
      :resources="resources"
      @change="changeIndex"
      @click.stop
    />
    <!--    @close="close" -->
    <div
      v-else
      class="w-full h-full flex justify-center items-center text-7xl"
    >
      暂无内容
    </div>
    <Footer :info="brandInfo" class="carousel-footer z-100" />

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

    <v-overlay
      v-actions:guideDialog.click
      :value="guideDialog"
      z-index="70"
      @click="guideDialog = false"
    >
      <div class="grid grid-cols-[repeat(2,200px)] grid-rows-[250px] gap-6 -mt-[15vh] text-center">
        <div
          v-actions:toLucky.click
          class="bg-black bg-opacity-50 rounded-xl grid place-content-center gap-5"
          @click="toLucky"
        >
          <vc-img src="/assets/img/guide/0.png" size="130px"></vc-img>
          <div>趣味抽奖</div>
        </div>
        <!--        <div -->
        <!--          v-actions:open.click -->
        <!--          class="bg-black bg-opacity-50 rounded-xl grid place-content-center gap-5" -->
        <!--          @click="open" -->
        <!--        > -->
        <!--          <vc-img src="/assets/img/guide/1.png" size="130px"></vc-img> -->
        <!--          <div>趣味搭配</div> -->
        <!--        </div> -->
        <div
          v-actions:toHome.click
          class="bg-black bg-opacity-50 rounded-xl grid place-content-center gap-5"
          @click="toHome"
        >
          <vc-img src="/assets/img/guide/2.png" size="130px"></vc-img>
          <div>{{ industryName }}</div>
        </div>
      </div>
    </v-overlay>

    <Permission ref="permission" title="授权许可" content="智能搭配需启用拍摄功能<br />仅用于搭配,不做其他用途" @unlock="unlock" @accept="sendCommandToDevice()" />
  </div>
</template>

<script>
import { sendCommandToDevice } from '@/api/common'
import { enterCarouselPage } from '@/api/frame'
import { getAdvertsInfo, getIndustryExtend } from '@/api/product'
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
    brandInfo: {},
    brandType: null, // 1 商场 0 店铺
    industryName: '',
  }),
  created() {
    // this.getData()
    window.OnHumanDetectResult = (status) => {
      if (this.$refs.carousel.lockSwiper || this.$refs.permission.dialog) return

      this.status = status
      switch (+status) {
        case DETECT_STATUS.NOBODY:
        case DETECT_STATUS.DISTANCE:
          this.guideDialog = false
          break
        case DETECT_STATUS.PROXIMITY:
          this.guideDialog = true
          // this.getIndustryExtend()
          break
      }
    }
    window.OnTabFocus = () => {
      this.unlock()
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
    // 获取动态行业名称
    async getIndustryExtend() {
      const res = await getIndustryExtend({
        brandId: sessionStorage.getItem('brandId'),
      })
      this.industryName = JSON.parse(res.body.industryExtend).largeScreen.name
    },
    async getAdvertsInfo() {
      const res = await getAdvertsInfo(sessionStorage.getItem('devId'))
      this.showEmpty = false
      this.brandType = res.body.brandType
      this.brandInfo = res.body.businessCard
      this.detailPage = res.body.detailPage
      const {
        rotationRules,
        resEntityMap,
        advertsStyleMap,
      } = res.body.advertsRes
      this.options = JSON.parse(rotationRules)
      this.resources = resEntityMap
      this.advertsStyleMap = advertsStyleMap
      this.getIndustryExtend()
      this.$refs.picker.changeList()
      this.unlock()
    },
    // 用不到
    // close: debounce(function () {
    //   const disabledBack = Number(this.$route.query.disabledBack)
    //   !disabledBack && this.$router.back()
    // }, 500, {
    //   leading: true,
    //   trailing: false,
    // }),
    // 轮播图改变 - index
    changeIndex(index) {
      this.optionsIndex = index
    },
    lock() {
      this.$refs.carousel?.lock()
      this.$refs.carousel?.currentPlayer?.pause()
    },
    unlock() {
      this.$refs.carousel?.unlock()
      this.$refs.carousel?.currentPlayer?.play()
    },
    toLucky() {
      this.lock()
      this.$router.push(`/lucky?t=${Date.now()}`)
    },
    async sendCommandToDevice() {
      this.lock()
      this.$refs.permission.close()
      await sendCommandToDevice({
        devId: sessionStorage.getItem('devId'),
        cmd: 8,
      })
    },
    open() {
      this.guideDialog = false
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
