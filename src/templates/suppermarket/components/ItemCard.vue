<template>
  <v-card
    v-ripple="false"
    class="market-item h-85% flex flex-col border-none overflow-hidden"
  >
    <!-- 单项卡片 -->
    <div class="flex-1 relative bg-gray overflow-hidden">
      <swiper class="h-90" :options="swiperOption" @touchmove.native.prevent>
        <swiper-slide v-for="(item, index) of shopItem?.top5" :key="index">
          <div class="w-full h-full flex items-center">
            <img class="w-full" :src="item?.imgUrl" contain />
          </div>
        </swiper-slide>
        <div
          v-show="shopItem?.top5.length > 1"
          slot="pagination"
          class="swiper-pagination"
        />
      </swiper>
      <div class="relative flex flex-col bg-white px-2 py-4 border-box">
        <div class="absolute -top-9 right-0 bg-black bg-opacity-20 p-2 z-100 text-white">
          {{ shopItem.floorNum }}-{{ shopItem.houseNum }}
        </div>
        <div class="flex justify-between items-start">
          <div class="overflow-hidden">
            <div class="text-sm font-bold truncate ">
              {{ shopItem.shopName }}
            </div>
            <div class="w-2/3 my-2 border border-[#3692D2]"></div>
          </div>
          <div class="flex items-center text-xs flex-shrink-0">
            <div class="ml-auto text-xs" @click="goDifferenceIndustryList(shopItem)">
              了解更多
            </div>
            <v-icon class="text-sm ml-1">
              fas fa-angle-double-right
            </v-icon>
          </div>
        </div>
        <div>
          <div class="flex items-center mb-1">
            <img class="w-3 h-3 mr-2" src="@/asset/image/phone.png">
            <span class="text-xs">{{ shopItem.telephone }}</span>
          </div>
          <div class="flex items-center overflow-hidden">
            <img class="w-3 h-3 mr-2" src="@/asset/image/location.png">
            <div class="overflow-clip text-xs truncate">
              {{ shopItem.shopAddress }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </v-card>
</template>

<script>
import 'swiper/css/swiper.css'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
export default {
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {
    shopItem: Object,
  },
  data() {
    return {
    }
  },
  computed: {
    swiperOption() {
      return {
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        loop: this.shopItem?.top5.length > 1,
        pagination: {
          el: '.swiper-pagination',
        },
      }
    },
  },
  created() {
  },
  mounted() {
  },
  methods: {
    goDifferenceIndustryList(item) {
      this.$router.push({
        path: `/template/${item.dictitemDisplayName}`,
        query: {
          brandId: item.brandId,
          devId: sessionStorage.getItem('devId'),
          showBack: true,
        },
      })
    },
  },
}
</script>

