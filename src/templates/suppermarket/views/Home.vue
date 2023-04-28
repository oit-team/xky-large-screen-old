<template>
  <VueActions data="marketPage" class="aspect-9/16 overflow-hidden flex flex-col">
    <Banner />
    <main class="ml-5 flex flex-col flex-1 overflow-hidden">
      <div class="w-80vw h-40vw border-[#F9F9FB] relative mb-8">
        <img
          class="w-full h-full"
          :src="currentImgInfo.mapUrl"
          @click="previewImg(currentImgInfo.mapUrl)"
        />
        <div class="absolute top-6 right-0">
          <div class="text-5xl">
            {{ currentImgInfo.floorNum }}
          </div>
          <div class="h-6px bg-[#BD1B16] rounded-full w-15 mt-2"></div>
        </div>
        <div class="flex w-full absolute bottom-0 left-0 p-1 border bg-black bg-opacity-30">
          <div
            v-for="item, index in floorList"
            :key="item.floorMapId"
            :class="nowFloor === index ? 'bg-white rounded text-black' : ''"
            class="px-2 text-white text-center font-bold bg-opacity-30 mr-2"
            @click="changeImage(item, index)"
          >
            {{ item.floorNum }}
          </div>
        </div>
      </div>
      <div v-if="!loading && shopList.length > 0" class="flex-1 w-80vw grid-cols-3 overflow-hidden flex">
        <v-item-group class="h-full max-w-80vw inline-grid grid-rows-2 grid-flow-col gap-x-5 py-4 px-2 items-center overflow-x-auto">
          <v-item v-for="item of shopList" :key="item.floorMapId">
            <ItemCard class="rounded shadow-lg shadow-none overflow-hidden w-270px" :shop-item="item" />
          </v-item>
        </v-item-group>
      </div>
      <div v-else class="max-w-80vw flex-1 grid place-content-center text-2xl p-4 text-gray-600">
        敬请期待...
      </div>
    </main>

    <Footer class="z-100 w-full" />
    <Preview ref="previewRef" />

    <!-- 右侧导航栏 -->
    <div class="absolute right-0 top-1/3 w-150px">
      <v-item-group v-model="selectedType" class="flex flex-col gap-2 bg-white rounded-r-md" mandatory>
        <v-item v-for="item, index of industryCategoryList" :key="index" :value="item.dictitemDisplayName">
          <div
            class="flex rounded-l-lg p-2"
            :class="nowIndex === index ? 'active' : ''"
            @click="changeTab(item, index)"
          >
            <div class="text-gray-500 text-sm flex-1">
              <div class="py-1 px-3 rounded w-full" style="text-align-last: justify">
                {{ item.dictitemDisplayName }}
                <div class="w-full"></div>
              </div>
            </div>
          </div>
        </v-item>
      </v-item-group>

      <div class="flex flex-col items-center pt-6 px-5">
        <v-btn
          variant="tonal"
          block
          class="mt-4"
          @click="back()"
        >
          <v-icon class="text-xs pr-2">
            fas fa-angle-double-left
          </v-icon>
          返回
        </v-btn>
      </div>
    </div>
  </VueActions>
</template>

<script>
import Banner from '../components/Banner.vue'
import Footer from '../../education/components/Footer.vue'
import Preview from '../components/Preview.vue'
import ItemCard from '../components/ItemCard.vue'
import { getIndustryCategories, getNavigationMap, getShopsList } from '@/api/market'

const timer = null
export default {
  name: 'Home',
  components: {
    Banner,
    Footer,
    ItemCard,
    Preview,
  },
  data() {
    return {
      loading: false,
      nowFloor: 0,
      nowIndex: 0,
      currentImgInfo: {}, // 当前选择第一个图片的信息info
      currentTabInfo: {},
      selectedType: undefined,
      floorList: [],
      industryCategoryList: [],
      shopList: [],
    }
  },
  created() {
    this.getNavigationMap()
  },
  mounted() {
  },
  methods: {
    back() {
      this.$router.back()
    },
    setTime() {
      clearTimeout(timer)
    },
    // 点击楼层图片预览大图
    previewImg(src) {
      this.$refs.previewRef.preview([src])
    },
    // 切换楼层图片
    changeImage(item, index) {
      this.nowFloor = index
      this.currentImgInfo = item
      this.getShopsList(item, '')
    },
    changeTab(item, index) {
      this.nowIndex = index
      this.currentTabInfo = item
      this.getShopsList('', item)
    },
    async getNavigationMap() {
      const res = await getNavigationMap({
        storeId: 316,
      })
      this.floorList = res.body.floorMapList
      this.currentImgInfo = this.floorList[0]
      this.getIndustryCategories()
    },

    async getIndustryCategories() {
      const res = await getIndustryCategories({
        storeId: 316,
        floorMapId: this.currentImgInfo.floorMapId,
      })
      this.industryCategoryList = res.body.industryCategoryList
      this.currentTabInfo = res.body.industryCategoryList[0]
      this.getShopsList('', this.currentTabInfo)
    },

    async getShopsList(floorItem, tabItem) {
      this.loading = true
      const res = await getShopsList({
        industryCategory: tabItem ? tabItem.industryCategory : this.currentTabInfo.industryCategory,
        floorMapId: floorItem ? floorItem.floorMapId : this.currentImgInfo.floorMapId,
      }).finally(() => {
        setTimeout(() => this.loading = false)
      })
      this.shopList = res.body.shopList
    },
  },
}
</script>

<style lang='scss' scoped>
::v-deep{
  .v-application--wrap{
    overflow: auto;
    height: 100vh;
  }

}
.active{
  color: blue;
  background-color: rgba(229, 231, 235, var(--tw-bg-opacity));;
  font-weight: bold;
}
</style>
