<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="75%"
      @click:outside="closedialog"
    >
      <div v-if="dialog" class="h-[75vh] bg-white" @touchstart="onTouchstart">
        <Fitness v-if="detailDialog === 'education'" ref="education" :product-id="productId" :is-dialog="isDialog"></Fitness>
        <Clothing v-if="detailDialog === 'clothing'" ref="clothing" :product-id="productId" :is-dialog="isDialog"></Clothing>
        <Jewellery v-if="detailDialog === 'jewellery'" ref="jewellery" :product-id="productId" :is-dialog="isDialog"></Jewellery>
      </div>
    </v-dialog>
  </div>
</template>

<script>
import Fitness from '@/templates/education/views/Detail.vue'
import Clothing from '@/templates/clothing/views/Detail.vue'
import Jewellery from '@/templates/jewellery/views/Detail.vue'

const AWAY_TIME = 30000 // 30s
let timer = null

export default {
  components: {
    Fitness,
    Clothing,
    Jewellery,
  },
  props: {
    detailDialog: String,
  },
  data() {
    return {
      isDialog: true, // 详情是否是通过dialog展示的
      dialog: false,
      productId: null,
      dialogType: '', // 所属行业类型
      infoData: {},
    }
  },
  methods: {
    open(data) {
      this.dialog = true
      this.infoData = data
      this.productId = this.infoData.id
      this.onTouchstart()
    },
    // 点击dialog容器之外触发关闭
    closedialog() {
      this.dialog = false
      this.$emit('dialog-close')
    },
    onTouchstart() {
      clearTimeout(timer)
      timer = setTimeout(() => {
        this.$emit('away')
      }, AWAY_TIME)
    },
  },
}
</script>

<style lang="scss" scoped>
::v-deep{
  .v-dialog:not([v-dialog--fullscreen]) {
    max-height: 75%;
    margin-top: -15%;
  }
}
</style>
