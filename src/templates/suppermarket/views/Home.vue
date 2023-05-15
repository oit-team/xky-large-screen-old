<template>
  <VueActions data="marketPage" class="aspect-9/16 overflow-hidden flex flex-col">
    <Banner />
    <main class="ml-5 flex flex-col flex-1 overflow-hidden">
      <div v-if="floorList.length > 0" class="w-80vw h-40vw border-[#F9F9FB] relative" @touchmove.native.prevent>
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
            :key="index"
            :class="nowFloor === index ? 'bg-white rounded text-black' : ''"
            class="px-2 text-white text-center font-bold bg-opacity-30 mr-2"
            @click="changeImage(item, index)"
          >
            {{ item.floorNum }}
          </div>
        </div>
      </div>
      <div v-else class="w-80vw h-40vw border-[#aaa] border-b relative mb-8 grid place-content-center text-2xl text-gray-600">
        暂无楼层信息
      </div>
      <div v-if="!loading && shopList.length > 0" class="w-80vw grid-cols-3 overflow-hidden flex mt-4">
        <v-item-group class="max-w-80vw inline-grid grid-rows-2 grid-flow-col gap-x-5 gap-y-8 py-4 px-2 items-center overflow-x-auto">
          <v-item v-for="item, index of shopList" :key="index">
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
            <v-img class="h-30px w-30px flex-grow-0" :src="item.imgUrl" />
            <div class="text-gray-500 text-sm flex-1">
              <div class="py-1 px-3 rounded w-full" style="text-align-last: justify">
                {{ item.dictitemDisplayName }}
                <div class="w-full"></div>
              </div>
            </div>
          </div>
        </v-item>
      </v-item-group>
      <div class="flex flex-col items-center pt-3 px-2">
        <v-btn
          outlined
          block
          class="mt-4"
          @click="back"
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
      this.getIndustryCategories()
    },
    changeTab(item, index) {
      this.nowIndex = index
      this.currentTabInfo = item
      this.getShopsList()
    },
    async getNavigationMap() {
      const res = await getNavigationMap({
        storeId: sessionStorage.getItem('brandId'),
      })
      this.floorList = res.body.floorMapList
      this.currentImgInfo = this.floorList[0]
      this.getIndustryCategories()
    },

    async getIndustryCategories() {
      const res = await getIndustryCategories({
        brandId: sessionStorage.getItem('brandId'),
        storeId: sessionStorage.getItem('brandId'),
        floorMapId: this.currentImgInfo.floorMapId,
      })
      this.industryCategoryList = [
        {
          industryCategory: '0',
          dictitemDisplayName: '全部',
          imgUrl: 'assets/img/jewellery/all.png',
        },
        ...res.body.industryCategoryList,
      ]
      this.currentTabInfo = this.industryCategoryList[0]
      this.nowIndex = 0
      this.getShopsList()
    },

    async getShopsList() {
      this.loading = true
      const res = await getShopsList({
        industryCategory: this.currentTabInfo.industryCategory,
        floorMapId: this.currentImgInfo.floorMapId,
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
  #app .v-application--wrap{
    overflow: auto;
    height: 100vh;
  }
  .v-btn--icon.v-size--small{
    width: 0.6vw;
    height: 0.6vw;
  }
  .v-carousel__controls__item .v-btn__content > i{
      font-size: 10px;
  }

  .swiper-pagination-bullet-active{
    background: #1E1E1E;
  }
}
.active{
  color: blue;
  background-color: rgba(229, 231, 235, var(--tw-bg-opacity));;
  font-weight: bold;
}
</style>
