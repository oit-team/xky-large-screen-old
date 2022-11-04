<template>
  <div>
    <Collocation ref="collocation" :right-list="rightList" @show-info="showInfo" @show-fitting="showFitting" @lock="lock" />
    <v-overlay
      :opacity="opacity"
      z-index="60"
      :value="overlay"
      ref="overlay"
      @click="closeOverlay"
    >
    </v-overlay>

    <SelectGoods ref="fitting" :goods-list="goodsList"></SelectGoods>
    <GoodsInfo ref="info" :info-data="infoData"></GoodsInfo>
  </div>
</template>

<script>
import Collocation from './Collocation.vue'
import GoodsInfo from '@/components/business/ProductPicker/GoodsInfo'
import SelectGoods from '@/components/business/ProductPicker/SelectGoods'
import Message from '@/components/commons/Message'

export default {
  components: {
    Collocation,
    SelectGoods,
    GoodsInfo,
  },
  props: {
    options: Array,
    advertsStyleMap: Object,
    resources: Object,
    optionsIndex: Number,
  },
  data() {
    return {
      infoData: {},
      rightList: [],
      opacity: 0,
      overlay: false,
      timer: null,
    }
  },
  computed: {
    goodsList() {
      return this.$store.state.shoppingCart.list
    },
  },
  watch: {
    rightList: {
      deep: true,
      handler() {
        if (this.rightList.length === 0) {
          this.$refs.collocation.close()
          this.$refs.fitting.close()
          this.$refs.info.close()
        } else {
          this.$refs.collocation.open()
        }
      },
    },
    options: 'changeList',
    optionsIndex: 'changeList',
  },
  mounted() {
    this.$refs.fitting.close()
    this.$refs.info.close()
  },
  methods: {
    showInfo(item) {
      clearTimeout(this.timer)
      this.infoData = item
      this.$refs.fitting.close()
      this.$refs.info.open()
      this.overlay = true
      this.$emit('lock')
      this.timer = setTimeout(() => {
        this.closeOverlay()
      }, 60000)
    },
    showFitting() {
      clearTimeout(this.timer)
      this.$refs.info.close()
      this.$refs.fitting.open()
      this.overlay = true
      this.$emit('lock')
      this.timer = setTimeout(() => {
        this.closeOverlay()
      }, 60000)
    },
    changeList() {
      const goods = this.options[this.optionsIndex].goods
      const optionsItem = goods.reduce((def, next) => [...def, this.advertsStyleMap[next]], [])
      this.rightList = optionsItem
    },
    lock() {
      this.$emit('lock')
      this.timer = setTimeout(() => {
        this.$emit('unlock')
      }, 60000)
    },
    closeOverlay() {
      this.overlay = false
      this.$emit('unlock')
      this.$refs.fitting.close()
      this.$refs.info.close()
      this.$refs.collocation.reset()
    },
  },
}
</script>

<style>
</style>
