<template>
  <div>
    <!-- 右侧列表 -->
    <Collocation ref="collocation" :right-list="rightList" @show-info="showInfo" />

    <!-- dialog展示不同行业详情信息 -->
    <GoodsInfo
      ref="info"
      :detail-dialog="detailDialog"
      @dialog-close="dialogClose"
    ></GoodsInfo>
    <!--    <CarouselInfo ref="info"> -->
    <!--      <div -->
    <!--        class="h-full flex items-center whitespace-nowrap" -->
    <!--        @click="toHome" -->
    <!--      > -->
    <!--        更多搭配 -->
    <!--        <vc-icon dark class="ml-2"> -->
    <!--          fas fa-angle-double-right -->
    <!--        </vc-icon> -->
    <!--      </div> -->
    <!--    </CarouselInfo> -->
  </div>
</template>

<script>
import Collocation from './Collocation.vue'
import GoodsInfo from '@/components/business/ProductPicker/GoodsInfo'
// import CarouselInfo from './CarouselInfo.vue'

export default {
  components: {
    Collocation,
    GoodsInfo,
    // CarouselInfo,
  },
  props: {
    options: Array,
    detailDialog: String,
    advertsStyleMap: Object,
    resources: Object,
    optionsIndex: Number,
  },
  data() {
    return {
      infoData: {},
      rightList: [],
      timer: null,
    }
  },
  computed: {
    goodsList() {
      return this.$store.state.shoppingCart.list
    },
  },
  watch: {
    options: 'changeList',
    optionsIndex: 'changeList',
  },
  methods: {
    showInfo(item) {
      this.$refs.info.open(item)
      this.$emit('lock')
    },
    changeList() {
      const goods = this.options[this.optionsIndex]?.goods
      const optionsItem = goods?.reduce((def, next) => [...def, this.advertsStyleMap[next]], [])
      this.rightList = optionsItem
    },
    lock() {
      this.$emit('lock')
    },
    dialogClose() {
      this.$emit('unlock')
      // 隐藏当前选中商品的 阴影 css
      this.$refs.collocation.reset()
    },
    toHome() {
      this.$refs.info.close()
      this.overlay = false
      this.lock()
      this.clearTime()
      this.$router.push({
        name: 'Home',
        query: {
          brandId: sessionStorage.getItem('brandId'),
          abilityId: sessionStorage.getItem('devId'),
          showBack: true,
        },
      })
    },
  },
}
</script>

<style>
</style>
