<template>
  <!--  aspect-9/16 -->
  <VueActions data="clothingDetailPage" class="grid bg-gray grid-rows-[620px,min-content,min-content,1fr] relative overflow-hidden overflow-y-auto">
    <header class="relative bg-white rounded-lg box-border flex justify-center overflow-hidden mx-4 my-2">
      <div class=" aspect-3/4">
        <v-swiper
          ref="swiper"
          class="bg-white h-full product-preview"
          :options="options"
          @touchmove.native.prevent
        >
          <v-swiper-slide
            v-for="src in infoData.videoList"
            :key="src"
          >
            <vc-plyr
              class="img"
              :src="src"
              :active="swiperIndex === 0"
              :options="optionsPlyr"
            />
          </v-swiper-slide>
          <v-swiper-slide
            v-for="src in infoData.imgList"
            :key="src"
          >
            <v-img
              v-actions:showPreview.click
              class="img"
              :src="getSmallImage(src, 'x')"
              height="100%"
              contain
              @click="showPreview = true"
            />
          </v-swiper-slide>
        </v-swiper>
      </div>
      <div
        v-if="infoData.imgList && infoData.imgList?.length"
        class="flex absolute bottom-0 right-2 z-10 justify-end p-2"
      >
        <div class="overflow-hidden bg-black bg-opacity-40 rounded">
          <vc-btn v-actions:slidePrev.click class="px-1 min-w-0 bg-transparent" tile dark @click="$headerSwiper.slidePrev()">
            <vc-icon>fas fa-chevron-left</vc-icon>
          </vc-btn>
          <span class="mx-1 text-white">{{ swiperIndex + 1 }}/{{ infoData.videoList ? infoData.imgList?.length + 1 : infoData.imgList?.length }}</span>
          <vc-btn v-actions:slideNext.click class="px-1 min-w-0 bg-transparent" tile dark @click="$headerSwiper.slideNext()">
            <vc-icon>fas fa-chevron-right</vc-icon>
          </vc-btn>
        </div>
      </div>
    </header>

    <!--    详情内容展示 -->
    <div class="bg-white h-min rounded-lg mx-4 my-2 py-3 px-6 box-border">
      <div class="flex justify-between w-full">
        <div class="text-2xl font-bold text-red-500">
          <span class="text-sm font-normal">
            ￥
          </span>
          {{ infoData.productPrice?.indexValue }}
          <span v-if="infoData.originalPrice?.indexValue" class="text-sm font-normal ml-1 line-through text-[#888888]">
            ￥{{ infoData.originalPrice?.indexValue }}
          </span>
        </div>
        <div class="text-[#888888] text-xl">
          库存：{{ infoData.productInventory?.indexValue || 0 }}
        </div>
      </div>
      <div>
        <v-chip
          v-for="txt in infoData.productLabel?.indexValue"
          :key="txt"
          color="#fc6d41"
          outlined
          label
          small
          class="mr-2 my-1"
        >
          {{ txt }}
        </v-chip>
      </div>
      <div class="text-2xl font-bold">
        {{ infoData.productName?.indexValue }}
      </div>
    </div>

    <div class="rounded-lg text-lg mx-4 my-2 box-border bg-white">
      <div class="px-8 py-4 flex items-center">
        <div class="text-[#888888] pr-3 whitespace-nowrap">
          {{ infoData.productNo?.indexDescrip }}
        </div>

        <div>{{ infoData.productNo?.indexValue }}</div>
      </div>
      <v-divider></v-divider>
      <div class="px-8 py-4 flex items-center">
        <div class=" text-[#888888] pr-3 whitespace-nowrap">
          {{ infoData.productFabric?.indexDescrip }}
        </div>
        <div>{{ infoData.productFabric?.indexValue }}</div>
      </div>
      <v-divider></v-divider>
      <div class="px-8 py-4 flex items-center">
        <div class=" text-[#888888] pr-3 whitespace-nowrap">
          {{ infoData.productTypeName?.indexDescrip }}
        </div>

        <div>{{ infoData.productTypeName?.indexValue }}</div>
      </div>
      <v-divider></v-divider>
      <div class="px-8 py-4 flex items-center">
        <div class=" text-[#888888] pr-3 whitespace-nowrap">
          {{ infoData.wearSellingPoint?.indexDescrip }}
        </div>
        <div v-html="infoData.wearSellingPoint?.indexValue"></div>
      </div>
      <v-divider></v-divider>
      <div class="px-8 py-4 flex items-center">
        <div class=" text-[#888888] pr-3 whitespace-nowrap">
          {{ infoData.styleInfo?.indexDescrip }}
        </div>
        <div>{{ infoData.styleInfo?.indexValue }}</div>
      </div>
    </div>

    <div v-if="infoData.detailsImgList?.length" class="flex flex-col bg-white mx-4 my-2 p-2 box-border rounded-lg overflow-x-hidden">
      <div
        v-for="del in infoData.detailsImgList"
        :key="del"
        class="mb-2"
      >
        <v-img
          class="img"
          :src="getSmallImage(del, 'x')"
          height="100%"
          contain
        />
      </div>
    </div>
    <Drawer v-if="!isDialog" ref="drawer" position="right" offset="55%" class="text-white flex flex-col items-center box-border rounded-l-md">
      <div class="py-1 px-4 text-center">
        <v-btn
          v-actions:asideBackToHome.click
          icon
          dark
          fab
          small
          @click="$router.back()"
        >
          <vc-icon>
            fas fa-angle-double-left
          </vc-icon>
        </v-btn>
        <div>返回</div>
      </div>
      <div class="border w-full"></div>
      <div class="py-1 px-4 text-center">
        <v-btn
          v-actions:asideToTop.click
          icon
          dark
          fab
          small
          @click="toTop"
        >
          <vc-icon>
            fas fa-angle-double-up
          </vc-icon>
        </v-btn>
        <div>TOP</div>
      </div>
    </Drawer>
    <ProductPreview v-model="showPreview" :index="swiperIndex" :list="infoData.imgList" />
  </VueActions>
</template>

<script>
import { getProductById } from '../../../api/product'
import ProductPreview from '../../../components/business/ProductPreview/ProductPreview.vue'
import VcPlyr from '../../../components/commons/Plyr/Plyr.vue'
import { getSmallImage } from '@/utils/helper'
import Drawer from '@/components/commons/Drawer'

export default {
  components: { VcPlyr, ProductPreview, Drawer },
  props: {
    productId: Number,
    isDialog: Boolean,
  },
  data() {
    this.options = {}
    this.$headerSwiper = null
    return {
      infoData: {},
      showPreview: false,
      swiperIndex: 0,
      optionsPlyr: {
        autoplay: true,
        fullscreen: {
          enabled: true,
        },
        keyboard: {
          focused: false,
        },
        controls: ['play', 'progress', 'play-large', 'fullscreen'],
        hideControls: false,
        clickToPlay: true,
      },
    }
  },
  created() {
    this.currentProductId = this.productId || this.$route.params.productId
    this.setSwiperOptions()
    this.getProductById()
  },
  mounted() {
    this.$nextTick(() => {
      this.$headerSwiper = this.$refs.swiper?.$swiper
    })
  },
  methods: {
    getSmallImage,
    setSwiperOptions() {
      // 轮播图片集合
      this.options = {
        // loop: true,
        // slidesPerview: 'auto',
        // loopedSlides: -1,
        on: {
          slideChange: () => {
            this.swiperIndex = this.$headerSwiper.realIndex
          },
        },
      }
    },
    async getProductById() {
      const res = await getProductById({
        productId: this.currentProductId,
        brandId: sessionStorage.getItem('brandId'),
      })
      this.infoData = res.body
    },
    toTop() {
      window.scrollTo(0, 0)
    },
  },
}
</script>

<style lang="scss" scoped>
$screen-width: 1080px;
$screen-height: 1920px;

$header-height: 620px;
$category-height: 200px;
$footer: 250px;

$chip-white-space: unset;
//$chip-content-display: inherit;

$product-preview-width: $header-height / 4 * 3;

.home {
  width: $screen-width;
  height: $screen-height;
  aspect-ratio: 9/16;
  display: grid;
  grid-template-rows: $header-height $category-height 1fr $footer;

  .header {
    height: $header-height;

    .product-preview {
      flex-shrink: 0;
      width: $product-preview-width;
      height: $header-height;
    }

    .v-chip {
      white-space: $chip-white-space;
    }

    .v-tab {
      border: 1px solid #d9d9d9;
    }

    .v-tab--active {
      background-color: #e1e1e1;
    }

    :deep(.v-tabs-slider-wrapper) {
      display: none;
    }
  }
}
</style>
