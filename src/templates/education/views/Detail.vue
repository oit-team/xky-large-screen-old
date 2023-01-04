<template>
  <div class="grid grid-rows-[620px,1fr,400px] aspect-9/16">
    <header class="flex overflow-hidden bg-gray">
      <div class="relative aspect-3/4">
        <v-swiper
          ref="swiper"
          class="bg-white h-full"
          :options="options"
          @touchmove.native.prevent
        >
          <v-swiper-slide
            v-for="src of data.imgList"
            :key="src"
          >
            <v-img
              class="img"
              :src="getSmallImage(src, 'x')"
              height="100%"
              contain
              @click="preview(src)"
            />
          </v-swiper-slide>
        </v-swiper>
        <div
          v-if="data.imgList?.length"
          class="flex absolute bottom-0 z-10 justify-end p-2 w-full"
        >
          <div class="overflow-hidden bg-black bg-opacity-40 rounded">
            <vc-btn class="px-1 min-w-0 bg-transparent" tile dark @click="() => $headerSwiper.slidePrev()">
              <vc-icon>fas fa-chevron-left</vc-icon>
            </vc-btn>
            <span class="mx-1 text-white">{{ swiperIndex + 1 }}/{{ data.imgList?.length }}</span>
            <vc-btn class="px-1 min-w-0 bg-transparent" tile dark @click="() => $headerSwiper.slideNext()">
              <vc-icon>fas fa-chevron-right</vc-icon>
            </vc-btn>
          </div>
        </div>
      </div>

      <div class="flex-1 flex overflow-hidden flex-col mt-12 px-6">
        <div class="flex gap-6 items-center">
          <v-chip
            class="px-6 h-10 text-2xl text-white"
            label
            dark
          >
            <vc-icon class="mr-2">
              #
            </vc-icon>
            <span>{{ getValue('productName') }}</span>
          </v-chip>
          <span class="text-lg">{{ getValue('productFabric') }}</span>
          <span class="text-red-500 font-bold text-lg">￥{{ getValue('productPrice') }}</span>
        </div>

        <div class="text-xl py-6 flex-col gap-4">
          <p>{{ getLabel('contactPhone') }}：{{ getValue('contactPhone') }}</p>
          <p>{{ getLabel('productTypeName') }}：{{ getValue('productTypeName') }}</p>
        </div>

        <div class="flex-1 bg-white rounded-lg p-4">
          {{ getValue('detailedIntroduction', '暂无介绍') }}
        </div>
      </div>
    </header>
    <div class="bg-gray pt-6 flex flex-col overflow-hidden">
      <div class="text-2xl flex items-center justify-center">
        <div class="flex items-center gap-3 font-bold">
          <div class="border-t border-2px border-gray-500 w-100px"></div>
          <div class="border-t border-2px border-gray-500 w-100px order-2"></div>
          精彩瞬间
        </div>
        <v-btn class="absolute right-6" @click="$router.back()">
          返回
        </v-btn>
      </div>
      <div v-if="data.videoList?.length || data.detailsImgList?.length" class="flex-1 overflow-hidden flex">
        <v-item-group class="h-full max-w-full inline-grid grid-rows-2 grid-flow-col gap-x-4 py-2 px-8 items-center overflow-x-auto">
          <v-item v-for="item of data.videoList" v-slot="{ active, toggle }" :key="item">
            <v-card class="p-3 rounded-xl shadow-none overflow-hidden relative w-300px" :class="active" @click="toggle(), preview(item)">
              <v-img :src="getVideoFrame(item)" class="h-full aspect-4/5"></v-img>
              <v-icon class="absolute top-1/2 left-1/2 z-10 text-white text-5xl transform -translate-x-1/2 -translate-y-1/2">
                fas fa-play
              </v-icon>
            </v-card>
          </v-item>
          <v-item v-for="item of data.detailsImgList" v-slot="{ active, toggle }" :key="item">
            <v-card class="p-3 rounded-xl shadow-none overflow-hidden w-300px" :class="active" @click="toggle(), preview(item)">
              <v-img :src="item" class="h-full aspect-4/5"></v-img>
            </v-card>
          </v-item>
        </v-item-group>
      </div>
      <div v-else class="flex-1 grid place-content-center text-3xl">
        暂无数据
      </div>
    </div>

    <footer class="bg-black flex justify-center items-center">
      <div class="text-white  w-3/5">
        <div class="py-2 text-xl font-semibold">
          {{ brandInfo.brandName }}
        </div>
        <div class="text-sm flex items-center">
          <div>
            <vc-img
              width="120"
              height="120"
              :src="brandInfo.brandLogo"
              class="border-white border-1 border-solid mr-2"
            ></vc-img>
          </div>
          <div>
            <p>
              联系电话：{{ brandInfo.telepHone }}
            </p>
            <p>
              联系地址：{{ brandInfo.address }}
            </p>
            <div class="overFlow-3">
              文化：{{ brandInfo.introduce }}
            </div>
          </div>
        </div>
      </div>
    </footer>

    <Preview ref="preview" />
  </div>
</template>

<script>
import Preview from '../components/Preview.vue'
import { getBrandNameCard, getProductById } from '@/api/product'
import { getSmallImage, getVideoFrame } from '@/utils/helper'

export default {
  components: { Preview },
  data() {
    return {
      swiperIndex: 0,
      previewDialog: false,
      previewList: [],
      options: {
        on: {
          slideChange: () => {
            this.swiperIndex = this.$headerSwiper.realIndex
          },
        },
      },
      selectedProduct: {},
      data: {},
      brandInfo: {},
    }
  },
  created() {
    this.getProductById()
    this.getBrandNameCard()
  },
  mounted() {
    this.$headerSwiper = this.$refs.swiper?.$swiper
  },
  methods: {
    getVideoFrame,
    getSmallImage,
    async getProductById() {
      const res = await getProductById({
        productId: this.$route.params.productId,
        brandId: sessionStorage.getItem('brandId'),
      })
      this.data = res.body
    },
    async getBrandNameCard() {
      const res = await getBrandNameCard({
        brandId: sessionStorage.getItem('brandId'),
      })
      this.brandInfo = res.body
    },
    getValue(key, def) {
      return this.data[key]?.indexValue ?? def
    },
    getLabel(key) {
      return this.data[key]?.indexDescrip
    },
    preview(src) {
      this.$refs.preview.preview([src])
    },
  },
}
</script>
