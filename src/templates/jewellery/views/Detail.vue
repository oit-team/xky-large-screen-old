<template>
  <div class="grid bg-gray grid-rows-[620px,min-content,min-content,1fr] aspect-9/16 relative">
    <header class="relative bg-white rounded-lg box-border flex justify-center overflow-hidden mx-4 my-2">
      <div class=" aspect-3/4">
        <v-swiper
          ref="swiper"
          class="bg-white h-full product-preview"
          loop
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
              :options="optionsPlyr"
            />
          </v-swiper-slide>
          <v-swiper-slide
            v-for="src in infoData.imgList"
            :key="src"
          >
            <v-img
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
        class="flex absolute bottom-0 z-10 justify-end p-2 w-full"
      >
        <div class="overflow-hidden bg-black bg-opacity-40 rounded">
          <vc-btn class="px-1 min-w-0 bg-transparent" tile dark @click="$headerSwiper.slidePrev()">
            <vc-icon>fas fa-chevron-left</vc-icon>
          </vc-btn>
          <span class="mx-1 text-white">{{ swiperIndex + 1 }}/{{ infoData.videoList ? infoData.imgList?.length + 1 : infoData.imgList?.length }}</span>
          <vc-btn class="px-1 min-w-0 bg-transparent" tile dark @click="$headerSwiper.slideNext()">
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
        <div v-if="infoData.productInventory?.indexValue" class="text-[#888888] text-xl">
          库存：{{ infoData.productInventory?.indexValue }}
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
      <div class="px-8 py-4 flex ">
        <div class="text-[#888888] pr-3 w-3em">
          {{ infoData.productNo?.indexDescrip }}
        </div>
        <div class="w-4/5">
          {{ infoData.productNo?.indexValue || '暂无' }}
        </div>
      </div>
      <v-divider></v-divider>
      <div class="px-8 py-4 flex ">
        <div class=" text-[#888888] pr-3 w-3em">
          {{ infoData.productFabric?.indexDescrip }}
        </div>
        <div class="w-4/5">
          {{ infoData.productFabric?.indexValue || '暂无' }}
        </div>
      </div>
      <v-divider></v-divider>
      <div class="px-8 py-4 flex ">
        <div class=" text-[#888888] pr-3 w-3em">
          {{ infoData.productTypeName?.indexDescrip }}
        </div>
        <div class="w-4/5">
          {{ infoData.productTypeName?.indexValue || '暂无' }}
        </div>
      </div>
      <v-divider></v-divider>
      <div class="px-8 py-4 flex ">
        <div class="text-[#888888] pr-3 w-3em">
          {{ infoData.productSource?.indexDescrip }}
        </div>
        <div class="w-4/5" v-html="infoData.productSource?.indexValue || '暂无'"></div>
      </div>
      <v-divider></v-divider>
      <div class="px-8 py-4 flex ">
        <div class=" text-[#888888] pr-3 w-3em">
          {{ infoData.productPrecautions?.indexDescrip }}
        </div>
        <div class="w-4/5" v-html="infoData.productPrecautions?.indexValue || '暂无'"></div>
      </div>
    </div>

    <div v-if="infoData.detailsImgList?.length" class="flex flex-col bg-white mx-4 my-2 p-2 box-border rounded-lg">
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
    <Drawer ref="drawer" position="right" offset="55%" class="text-white flex flex-col items-center py-2 box-border rounded-l-md">
      <v-btn block dark text @click="$router.back()">
        返回
      </v-btn>
      <div class="border w-full"></div>
      <v-btn
        icon
        dark
        fab
        small
        class="mt-2"
        @click="toTop"
      >
        <vc-icon>
          fas fa-angle-double-up
        </vc-icon>
      </v-btn>
    </Drawer>
    <ProductPreview v-model="showPreview" :index="swiperIndex" :list="infoData.imgList" />
  </div>
</template>

<script>
import { getProductById } from '../../../api/product'
import ProductPreview from '../../../components/business/ProductPreview/ProductPreview.vue'
import VcPlyr from '../../../components/commons/Plyr/Plyr.vue'
import Drawer from '../../../components/commons/Drawer'
import { getSmallImage } from '../../../utils/helper'

export default {
  components: { VcPlyr, ProductPreview, Drawer },
  data() {
    this.options = {}
    this.$headerSwiper = null
    return {
      productId: '',
      infoData: {},
      showPreview: false,
      swiperIndex: 0,
      optionsPlyr: {
        autoplay: true,
        fullscreen: {
          enabled: true,
          fallback: true,
          iosNative: true,
          container: null,
        },
        keyboard: {
          focused: false,
        },
        controls: ['progress', 'play-large'],
        // controls: ['progress', 'play-large', 'fullscreen'],
        hideControls: true,
        clickToPlay: true,
      },
    }
  },
  created() {
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
        on: {
          slideChange: () => {
            this.swiperIndex = this.$headerSwiper.realIndex
          },
        },
      }
    },
    async getProductById() {
      const res = await getProductById({
        productId: this.$route.params.productId,
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
