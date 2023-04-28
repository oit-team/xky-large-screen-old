<template>
  <VueActions data="educationDetailPage" class="grid grid-rows-[560px,1fr,auto] aspect-9/16 overflow-hidden">
    <header>
      <Banner />
      <div class="mx-6 flex h-[450px]">
        <div>
          <div class="relative aspect-3/4 h-[450px]">
            <v-swiper
              ref="swiper"
              class="bg-gray rounded-md aspect-3/4 h-full"
              :options="options"
              @touchmove.native.prevent
            >
              <v-swiper-slide
                v-for="src of data.imgList"
                :key="src"
              >
                <v-img
                  v-actions:preview.click
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
                <vc-btn v-actions:slidePrev.click class="px-1 min-w-0 bg-transparent" tile dark @click="() => $headerSwiper.slidePrev()">
                  <vc-icon>fas fa-chevron-left</vc-icon>
                </vc-btn>
                <span class="mx-1 text-white">{{ swiperIndex + 1 }}/{{ data.imgList?.length }}</span>
                <vc-btn v-actions:slideNext.click class="px-1 min-w-0 bg-transparent" tile dark @click="() => $headerSwiper.slideNext()">
                  <vc-icon>fas fa-chevron-right</vc-icon>
                </vc-btn>
              </div>
            </div>
          </div>
        </div>
        <div class="flex-1 flex overflow-hidden flex-col mt-2 ml-2 px-6">
          <div class="flex flex-col">
            <div class="text-3xl py-1 font-semibold">
              {{ getValue('productName') }}
            </div>
            <div class="w-[40px] h-[5px] my-2 rounded-md bg-black border-black"></div>
          </div>
          <div class="w-full flex items-center">
            <div class="text-red-500">
              ￥
              <span class="text-2xl">
                {{ getValue('productPrice') }}
              </span>
            </div>
            <div class="flex items-center ml-8">
              推荐指数：
              <v-rating
                v-model="cateringRate"
                background-color="#eee"
                color="#f44336"
                hover
                length="5"
                readonly
                size="14"
              ></v-rating>
            </div>
          </div>
          <div class="text-xl flex-1 pt-1 pb-4 flex-col gap-4 overflow-y-auto">
            <p class="mb-[6px]">
              <span class="text-gray-500 mr-4">{{ getLabel('meatAndVegetable') }}</span>{{ getValue('meatAndVegetable', '暂无') }}
            </p>
            <p class="mb-[6px]">
              <span class="text-gray-500 mr-4">{{ getLabel('productFlavor') }}</span>{{ getValue('productFlavor', '暂无') }}
            </p>
            <p class="flex mb-[6px]">
              <span class="whitespace-nowrap text-gray-500 mr-4">{{ getLabel('productTypeName') }}</span><span v-html="getValue('productTypeName', '暂无')"></span>
            </p>
            <p class="flex mb-[6px]">
              <span class="whitespace-nowrap text-gray-500 mr-4">{{ getLabel('productName') }}</span><span v-html="getValue('productName', '暂无')"></span>
            </p>
            <p class="flex mb-[6px]">
              <span class="whitespace-nowrap text-gray-500 mr-4"> {{ getLabel('productMaterials') }}</span><span v-html="getValue('productMaterials', '暂无')"></span>
            </p>
          </div>
          <div class="flex gap-4 justify-start mt-6">
            <v-btn
              v-actions:getInterested.click
              elevation="2"
              outlined
              @click="getInterested()"
            >
              <v-icon class="text-xs pr-2">
                {{ isInterested ? 'fas fa-star' : 'far fa-star' }}
              </v-icon>
              我想吃
            </v-btn>
            <v-btn
              elevation="2"
              outlined
              @click="keyboardDialog = true, phone = ''"
            >
              <v-icon class="text-xs pr-2">
                fas fa-phone-volume
              </v-icon>
              <span class="font-medium">联系我们</span>
            </v-btn>
            <v-btn
              v-if="!isDialog"
              v-actions:backToHome.click
              depressed
              elevation="2"
              outlined
              @click="back"
            >
              <v-icon class="text-xs pr-2">
                fas fa-angle-double-left
              </v-icon>
              返回
            </v-btn>
            <v-btn
              v-else
              v-actions:backToHome.click
              depressed
              elevation="2"
              outlined
              @click="$emit('more')"
            >
              了解更多
            </v-btn>
          </div>
        </div>
      </div>
    </header>
    <div class="h-full m-2 mx-6 pt-2 flex flex-col overflow-y-auto">
      <div class="max-h-full flex flex-col my-4 overflow-hidden">
        <div class="text-3xl flex items-center justify-center font-bold px-2 py-2 goodAtStyle">
          <div v-for="item in goodAtInfo" :key="item" class="goodAtItemStyle px-8 border-r border-black">
            {{ item }}
          </div>
        </div>
        <!-- 案例与课程 -->
        <div class="overflow-y-auto">
          <div class="pt-6 my-2 border-t border-gray-400">
            <div class="text-3xl border-l-10 font-bold border-black px-4 py-1">
              制作步骤
            </div>
            <div>
              <div v-if="data.detailsImgList?.length" class="flex-1 overflow-hidden flex">
                <v-item-group class="h-full max-w-full inline-grid grid-rows-1 grid-flow-col gap-x-4 py-4 px-2 items-center overflow-x-auto">
                  <v-item v-for="item of data.detailsImgList" v-slot="{ active, toggle }" :key="item">
                    <v-card v-actions:clickCourseItem.click class="rounded-xl shadow-none overflow-hidden w-300px" :class="active" @click="toggle(), preview(item)">
                      <v-img :src="item" class="h-full aspect-4/5"></v-img>
                      <!--                      <div class="bg-white w-full"> -->
                      <!--                        <div class="text-center w-full"> -->
                      <!--                          第一步 -->
                      <!--                        </div> -->
                      <!--                        <div> -->
                      <!--                          {{ item }} -->
                      <!--                        </div> -->
                      <!--                      </div> -->
                    </v-card>
                  </v-item>
                </v-item-group>
              </div>
              <div v-else class="flex-1 grid place-content-center text-2xl p-4 text-gray-600">
                敬请期待...
              </div>
            </div>
          </div>
          <!-- 精彩瞬间 -->
          <div class="pt-6 my-2 border-t border-gray-400">
            <div class="text-3xl border-l-10 font-bold border-black px-4 py-1">
              直击现场
            </div>
            <div>
              <div v-if="data.videoList?.length" class="flex-1 overflow-hidden flex">
                <v-item-group class="h-full max-w-full inline-grid grid-rows-1 grid-flow-col gap-x-4 py-4 px-2 items-center overflow-x-auto">
                  <v-item v-for="item of data.videoList" v-slot="{ active, toggle }" :key="item">
                    <v-card v-actions:clickSplendidMomentItem.click class="rounded-xl shadow-none overflow-hidden relative w-300px" :class="active" @click="toggle(), preview(item)">
                      <v-img :src="getVideoFrame(item)" class="h-full aspect-4/5"></v-img>
                      <v-icon class="absolute top-1/2 left-1/2 z-10 text-white text-5xl transform -translate-x-1/2 -translate-y-1/2">
                        fas fa-play
                      </v-icon>
                    </v-card>
                  </v-item>
                </v-item-group>
              </div>
              <div v-else class="flex-1 grid place-content-center text-2xl p-4 text-gray-600">
                敬请期待...
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- dialog时候页面去掉footer -->
    <Footer v-if="!isDialog" />
    <Preview ref="preview" />
    <v-dialog
      v-model="keyboardDialog"
      width="700px"
    >
      <v-card>
        <v-card-title>请留下您的联系方式，我们将联系您</v-card-title>
        <div class="px-4 pb-4">
          <v-text-field
            v-model="phone"
            label="手机号"
            readonly
            :rules="phoneRules"
          ></v-text-field>
          <Keyboard v-model="phone" v-actions:submitPhone.click class="w-4/5 mx-auto" @confirm="submitPhone()" />
        </div>
      </v-card>
    </v-dialog>
  </VueActions>
</template>

<script>
import Banner from '../components/Banner.vue'
import Footer from '../components/Footer.vue'
import Keyboard from '../components/Keyboard'
import Preview from '../components/Preview.vue'
import * as events from '../enums/events'
import { getSmallImage, getVideoFrame } from '@/utils/helper'
import { getBrandNameCard, getProductById, insertGoodsPhoneRelation } from '@/api/product'

let timer = null
export default {
  components: { Preview, Banner, Footer, Keyboard },
  props: {
    productId: Number,
    isDialog: Boolean,
  },
  data() {
    return {
      swiperIndex: 0,
      previewDialog: false,
      keyboardDialog: false,
      isInterested: false,
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
      goodAtInfo: [],
      phone: '',
      phoneRules: [
        value => !!value || '请输入手机号',
        value => (value && value.length === 11) || '请输入正确的手机号',
      ],
      currentProductId: null,
      cateringRate: 4,
    }
  },
  created() {
    this.currentProductId = this.productId || this.$route.params.productId
    this.isInterested = !!+this.$route.query.active
    this.getProductById()
    this.getBrandNameCard()
  },

  mounted() {
    this.$headerSwiper = this.$refs.swiper?.$swiper
    if (!this.isDialog) this.setTime()
  },

  methods: {
    getVideoFrame,
    getSmallImage,
    async getProductById() {
      const res = await getProductById({
        productId: this.currentProductId,
        brandId: sessionStorage.getItem('brandId'),
      })
      this.data = res.body
      this.goodAtInfo = this.getValue('productTypeName').split(',')
    },
    async getBrandNameCard() {
      const res = await getBrandNameCard({
        brandId: sessionStorage.getItem('brandId'),
      })
      this.brandInfo = res.body
    },
    async getInterested() {
      if (!this.isDialog) this.setTime()
      this.isInterested = !this.isInterested
      this.$root.$emit(events.TOGGLE_ACTIVE, this.currentProductId)
    },
    async submitPhone() {
      if (!this.isDialog) this.setTime()
      if (this.phone === '' || this.phone.length !== 11) {
        this.$message.error('请输入正确手机号')
        return false
      }

      if (!this.isInterested) return this.$message.error('未选择感兴趣内容')

      await insertGoodsPhoneRelation({
        productIds: this.currentProductId,
        brandId: sessionStorage.getItem('brandId'),
        devId: sessionStorage.getItem('devId'),
        phone: this.phone,
      })
      this.keyboardDialog = false
      this.phone = ''
      this.$message.success('已通知工作人员')
    },
    getValue(key, def) {
      return this.data[key]?.indexValue ?? def
    },
    getLabel(key) {
      return this.data[key]?.indexDescrip
    },
    preview(src) {
      if (!this.isDialog) this.setTime()
      this.$refs.preview.preview([src])
    },
    back() {
      this.$router.back()
      clearTimeout(timer)
    },
    setTime() {
      clearTimeout(timer)
      timer = setTimeout(() => {
        this.$router.push({
          path: '/carousel',
          query: {
            brandId: sessionStorage.getItem('brandId'),
            devId: sessionStorage.getItem('devId'),
          },
        })
      }, 60000)
    },
  },
}
</script>

<style lang="scss" scoped>
.goodAtStyle :last-child{
  border: 0px;
}
</style>
