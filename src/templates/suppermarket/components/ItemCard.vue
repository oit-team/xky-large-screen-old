<template>
  <v-card
    v-ripple="false"
    class="market-item h-87% flex flex-col border-none overflow-hidden"
  >
    <!-- 单项卡片 -->
    <div class="flex-1 relative bg-gray overflow-hidden" @click="$emit('click', item)">
      <v-carousel
        cycle
        height="300"
        hide-delimiters
      >
        <v-carousel-item
          v-for="item in shopItem.top5"
          :key="item.id"
          :src="item.imgUrl"
          contain
        >
        </v-carousel-item>
      </v-carousel>
      <div class="relative flex flex-col bg-white px-2 py-4 border-box">
        <div class="absolute -top-9 right-0 bg-black bg-opacity-20 p-2 z-100 text-white">
          {{ shopItem.floorNum }}-{{ shopItem.houseNum }}
        </div>
        <div class="flex justify-between items-center">
          <div class="overflow-hidden">
            <div class="text-sm font-bold truncate ">
              {{ shopItem.shopName }}
            </div>
          </div>
          <div class="flex items-center text-xs flex-shrink-0">
            <div class="ml-auto text-xs">
              了解更多
            </div>
            <v-icon class="text-sm ml-1">
              fas fa-angle-double-right
            </v-icon>
          </div>
        </div>
        <div class="w-1/3 my-2 border border-[#3692D2]"></div>
        <div>
          <div class="flex items-center mb-1">
            <svg class="w-3 h-3 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!-- ! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M280 0C408.1 0 512 103.9 512 232c0 13.3-10.7 24-24 24s-24-10.7-24-24c0-101.6-82.4-184-184-184c-13.3 0-24-10.7-24-24s10.7-24 24-24zm8 192a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm-32-72c0-13.3 10.7-24 24-24c75.1 0 136 60.9 136 136c0 13.3-10.7 24-24 24s-24-10.7-24-24c0-48.6-39.4-88-88-88c-13.3 0-24-10.7-24-24zM117.5 1.4c19.4-5.3 39.7 4.6 47.4 23.2l40 96c6.8 16.3 2.1 35.2-11.6 46.3L144 207.3c33.3 70.4 90.3 127.4 160.7 160.7L345 318.7c11.2-13.7 30-18.4 46.3-11.6l96 40c18.6 7.7 28.5 28 23.2 47.4l-24 88C481.8 499.9 466 512 448 512C200.6 512 0 311.4 0 64C0 46 12.1 30.2 29.5 25.4l88-24z" /></svg>
            <span class="text-xs">{{ shopItem.telephone }}</span>
          </div>
          <!-- <div class="flex items-start overflow-hidden">
            <v-icon class="text-sm ml-1 mr-2">
              fa-solid fa-user
            </v-icon>
            <div class="overflow-clip text-xs truncate">
              {{ shopItem.industryName }}
            </div>
          </div> -->
          <div class="flex items-center overflow-hidden">
            <svg class="w-3 h-3 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!-- ! Font Awesome Pro 6.4.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" /></svg>
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
  },
}
</script>

