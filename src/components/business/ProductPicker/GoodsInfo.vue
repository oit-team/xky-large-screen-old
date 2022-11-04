<template>
  <Drawer ref="drawer" position="left" offset="50%" class="rounded-r-3xl drawerW z-61">
    <div class="w-full p-3 leading-15">
      <div class="info-item flex">
        <div class="lable w-32 text-center">
          类别
        </div>
        <div class="lable w-3/5">
          {{ infoData.styleCategory }}
        </div>
      </div>
      <div class="info-item flex">
        <div class="lable w-32 text-center">
          颜色
        </div>
        <div class="lable w-3/5">
          {{ infoData.styleColor }}
        </div>
      </div>
      <div class="info-item flex">
        <div class="lable w-32 text-center">
          材质
        </div>
        <div class="lable w-3/5">
          {{ infoData.styleFabric }}
        </div>
      </div>
      <div class="info-item flex">
        <div class="lable w-32 text-center">
          廓形
        </div>
        <div class="lable w-3/5">
          {{ infoData.styleFlowerPattern }}
        </div>
      </div>
      <div class="info-item flex">
        <div class="lable w-32 text-center">
          场合
        </div>
        <div class="lable w-3/5">
          {{ infoData.styleInfo }}
        </div>
      </div>
      <div class="info-item flex">
        <div class="lable w-32 text-center">
          标签
        </div>
        <div class="lable w-3/5">
          {{ infoData.styleLabel }}
        </div>
      </div>
    </div>
  </Drawer>
</template>

<script>
import Drawer from '@/components/commons/Drawer'

export default {
  components: {
    Drawer,
  },
  props: {
    infoData: Object,
  },
  methods: {
    open() {
      this.$refs.drawer.open()
    },
    close() {
      this.$refs.drawer.close()
    },
  },
}
</script>

<style scoped>
.drawerW{
  width: 50vw;
}
</style>
