<template>
  <div class="aspect-9/16 overflow-hidden bg-gray-100">
    <swiper class="swiper mr-5" :options="swiperOption" @touchmove.native.prevent>
      <swiper-slide v-for="(chunk, index) of listChunk" :key="index">
        <div class="grid grid-cols-3 gap-5 h-full px-1">
          <div
            v-for="(item, i) of chunk"
            :key="i"
            class="product-item flex flex-col"
            :data-product-id="item.productId"
          >
            <v-card class="py-3 px-4 h-4/5 flex flex-col">
              <div class="aspect-4/5 overflow-hidden">
                <img :src="item.imgUrl" class="h-full w-full" />
              </div>
              <div class="py-2 text-center font-bold">
                {{ item.productName }}{{ index }}
              </div>
              <div class="text-sm text-gray-500 flex-1">
                {{ item.personalSignature }}
              </div>
              <div class="text-center text-red-500">
                ￥{{ item.productPrice }}
              </div>
            </v-card>
            <div class="grid place-content-center flex-1">
              <v-btn icon>
                <v-icon>fas fa-heart</v-icon>
              </v-btn>
            </div>
          </div>
        </div>
      </swiper-slide>
    </swiper>
    <div class="absolute left-0 top-1/5 w-150px">
      <div class="max-h-650px divide-y overflow-y-auto bg-white rounded-r-md">
        <div v-for="i of 10" :key="i" class="h-150px flex flex-col pt-2">
          <div class="h-3/5 overflow-hidden">
            <v-img src="https://picsum.photos/100" class="aspect-square h-full mx-auto" />
          </div>
          <div class="text-gray-500 flex flex-col items-center justify-center flex-1">
            <div class="text-sm">
              测试
            </div>
            <div>40位</div>
          </div>
        </div>
      </div>
      <div class="flex items-stretch justify-center pt-4 pb-8 space-x-2">
        <div class="relative">
          <vc-btn class="h-full text-left vertical-btn" dark>
            <vc-icon class="mb-2">
              fas fa-heart
            </vc-icon>
            <span class="flex-1 vertical-text">我感兴趣</span>
            <div class="rounded-circle w-20px leading-20px bg-red-500 text-center mt-2">
              1
            </div>
          </vc-btn>
          <div
            class="absolute left-0 -bottom-7 px-0"
          >
            <vc-btn
              v-if="!deleteConfirm"
              text
            >
              <vc-icon size="16" color="#d9d9d9">
                fas fa-trash-alt
              </vc-icon>
            </vc-btn>
            <vc-btn
              v-else
              class="px-0 w-full"
              text
              color="error"
            >
              确定
            </vc-btn>
          </div>
        </div>
        <vc-btn class="h-auto text-left vertical-btn">
          <vc-icon class="mb-2">
            fas fa-shopping-cart
          </vc-icon>
          <span class="flex-1 vertical-text">我的试穿</span>
        </vc-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import { chunk, throttle } from 'lodash'
import { getProductAll } from '@/api/product'

export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  data() {
    return {
      swiperOption: {
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        direction: 'vertical',
        slidesPerView: 3,
        loop: true,
        on: {
          click: throttle(this.clickItem, 300, { leading: true, trailing: false }),
        },
      },
      list: [],
      deleteConfirm: false,
    }
  },
  computed: {
    listChunk() {
      return chunk(this.list, 3)
    },
  },
  created() {
    this.getProductAll()
  },
  methods: {
    async getProductAll() {
      const res = await getProductAll({
        brandId: sessionStorage.getItem('brandId'),
        pageSize: 999,
        pageNum: 1,
      })
      this.list = res.body.resultList
    },
    clickItem(e) {
      const item = e.target.closest('.product-item')
      if (!item) return
      const productId = item.dataset.productId
      this.$router.push(`/template/education/detail/${productId}`)
    },
  },
}
</script>

<style lang="scss">
.swiper {
  width: 80vw;
  height: 100%;
}

.vertical-btn {
  flex-direction: column;
  padding: 10px !important;

  .v-btn__content {
    flex-direction: inherit;
  }

  .vertical-text {
    text-align: center;
    writing-mode: vertical-lr;
  }
}
</style>
