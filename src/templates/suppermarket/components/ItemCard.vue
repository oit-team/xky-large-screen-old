<template>
  <v-card
    v-ripple="false"
    class="market-item h-87% flex flex-col border-none overflow-hidden"
  >
    <!-- 单项卡片 -->
    <div class="flex-1 relative bg-gray overflow-hidden">
      <v-carousel
        cycle
        hide-delimiter-background
        :show-arrows="false"
        height="320"
      >
        <v-carousel-item
          v-for="item, index in shopItem?.top5"
          :key="index"
          :src="item?.imgUrl"
          contain
        >
        </v-carousel-item>
      </v-carousel>
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
export default {
  props: {
    shopItem: Object,
  },
  data() {
    return {
    }
  },
  computed: {
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

