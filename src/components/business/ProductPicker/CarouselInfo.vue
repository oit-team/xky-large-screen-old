<template>
  <Drawer ref="drawer" position="left" offset="47%" class="rounded-r-3xl drawerW2 z-61 p-6 pb-0 box-border w-[87vw] text-white">
    <div class="w-full flex relative">
      <!--      左侧大图 -->
      <div class="rounded-xl bg-white h-full">
        <v-img
          width="400px"
          height="500px"
          class="rounded-lg bg-white"
          :src="getSmallImage(currentImg, 'x')"
        ></v-img>
      </div>
      <!--      右侧详情 -->
      <div class="ml-4 flex-1 flex flex-col h-[500px] w-full overflow-hidden">
        <!--          顶部商品名称 -->
        <div class="relative flex justify-between items-center mb-2">
          <div class="w-3/5">
            <div class="text-2xl mb-4 truncate">
              {{ infoData.styleName }}
            </div>
            <div class="text-sm">
              {{ infoData.styleNo }}
            </div>
          </div>
          <div class="text-3xl font-bold">
            ￥{{ infoData.stylePrice }}
          </div>
        </div>
        <!--       标签 -->
        <div v-if="infoData.styleLabel !== '暂无'" class="my-2 flex w-full overflow-x-auto">
          <v-chip
            v-for="(item, index) in labelList"
            :key="index"
            class="text-lg mr-2 h-6 text-black"
            label
            color="#ffffff"
          >
            <span>{{ item }}</span>
          </v-chip>
        </div>

        <!--        颜色 型号等等 -->
        <div class="w-full overflow-x-auto mt-2 flex items-center text-lg">
          <div class="whitespace-nowrap">
            {{ infoData.styleColor }}
          </div>
          <!--          <v-divider vertical></v-divider> -->
          <div class="border-r-1 h-2 mx-5"></div>
          <div class="whitespace-nowrap">
            {{ infoData.styleFlowerPattern }}
          </div>
          <div class="border-r-1 h-2 mx-5"></div>
          <div class="whitespace-nowrap">
            {{ infoData.styleFabric }}
          </div>
          <div class="border-r-1 h-2 mx-5"></div>
          <div class="whitespace-nowrap">
            {{ infoData.styleFabric }}
          </div>
        </div>

        <div class="my-4 box-border overflow-y-auto flex-shrink-0 flex-1 text-sm">
          <div v-if="infoData.designSellingPoint" class="mb-2 ul_list" v-html="infoData.designSellingPoint">
          </div>

          <div v-if="infoData.sellingPointFabric" class="mb-2 ul_list" v-html="infoData.sellingPointFabric">
          </div>

          <div v-if="infoData.wearSellingPoint" class=" ul_list" v-html="infoData.wearSellingPoint">
          </div>
        </div>

        <!--        尺码 -->
        <div class="flex w-full overflow-x-auto items-center text-lg">
          <div
            v-for="(item, index) in infoData.styleSize"
            :key="index"
            class="mr-2"
          >
            <v-btn variant="outlined" color="#fff">
              {{ item }}
            </v-btn>
          </div>
        </div>
      </div>
    </div>
    <div class="flex justify-between items-center h-[8vh] w-full overflow-hidden box-border">
      <div class="w-full flex items-center overflow-hidden overflow-x-auto">
        <div
          v-for="(item, index) in infoData.stylePicture"
          :key="index"
          class="rounded-lg mr-2 bg-black"
          @click="currentIndex = index"
        >
          <v-img
            width="80"
            height="100"
            class="rounded-lg bg-white box-border"
            :class="currentIndex === index ? 'boxShadow' : 'opacity-80'"
            :src="getSmallImage(item, 's')"
          ></v-img>
        </div>
      </div>
      <slot></slot>
    </div>
  </Drawer>
</template>

<script>
import { getStyleinfo } from '@/api/product'
import Drawer from '@/components/commons/Drawer'
import { getSmallImage } from '@/utils/helper'

export default {
  components: {
    Drawer,
  },
  data() {
    return {
      infoData: {},
      currentImg: '',
      currentIndex: 0,
      labelList: [],
    }
  },
  computed: {
  },
  watch: {
    currentIndex() {
      this.currentImg = this.infoData.stylePicture[this.currentIndex]
    },
  },
  methods: {
    getSmallImage,
    async open(index) {
      const res = await getStyleinfo({
        styleId: index,
      })
      this.infoData = res.body
      this.currentImg = res.body.stylePicture[0]
      this.labelList = res.body.styleLabel.replaceAll('，', ',').split(',')
      // this.infoData = JSON.parse(JSON.stringify(item))
      // // this.infoData.sellingPointFabric = this.infoData.sellingPointFabric.replaceAll('，', ',').split('；')
      this.$refs.drawer.open()
    },
    close() {
      this.$refs.drawer.close()
      this.currentIndex = 0
    },
  },
}
</script>

<style lang="scss" scoped>
.min-h-inherit{
  min-height: inherit;
}
.boxShadow{
  box-shadow: 0 2px 12px 0 #5e8cfd;
}
//:deep(ul){
//  list-style: inside !important;
//}
//:deep(ol){
//  list-style: decimal !important;
//}
//:deep(ul){
//}
:deep{
  .v-chip{
    display: inline-table;
  }
  ul{
    padding: 0;
    list-style: inside !important;
  }
  ol{
    list-style: decimal !important;
  }
}
</style>
