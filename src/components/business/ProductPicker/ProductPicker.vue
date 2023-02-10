<template>
  <div>
    <!-- 右侧列表 -->
    <Collocation ref="collocation" :right-list="rightList" @show-info="showInfo" />

    <!-- dialog展示不同行业详情信息 -->
    <GoodsInfo
      ref="info"
      :detail-dialog="detailDialog"
      @dialog-close="dialogClose"
      @away="onAway"
    ></GoodsInfo>
  </div>
</template>

<script>
import Collocation from './Collocation.vue'
import GoodsInfo from '@/components/business/ProductPicker/GoodsInfo'

export default {
  components: {
    Collocation,
    GoodsInfo,
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
  methods: {
    showInfo(item) {
      clearTimeout(this.timer)
      this.$refs.info.open(item)
      this.$emit('lock')
    },
    changeList() {
      const goods = this.options[this.optionsIndex].goods
      const optionsItem = goods?.reduce((def, next) => [...def, this.advertsStyleMap[next]], [])
      this.rightList = optionsItem
    },
    lock() {
      this.$emit('lock')
    },
    dialogClose() {
      this.$emit('unlock')
      this.$refs.collocation.reset()
    },
    onAway() {
      this.$refs.info.closedialog()
    },
  },
}
</script>

<style>
</style>
