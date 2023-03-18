<template>
  <v-card
    v-ripple="false"
    v-actions:detailPreview.click
    class="overflow-hidden"
    :height="height"
    :width="width"
    @click="preview"
  >
    <div class="flex relative z-10 flex-col text-center bg-white h-full">
      <div>
        <v-img
          height="260"
          :src="getSmallImage(item.imgUrl)"
          :lazy-src="getSmallImage(item.imgUrl)"
        />
      </div>
      <div class="mt-1 px-3 text-xs text-gray-700 truncate-2 h-2rem">
        {{ item.productName }}
      </div>
      <div class="flex my-1 items-center justify-center">
        <div class="text-base font-bold text-red-500">
          <span class="text-xs font-normal">￥</span>{{ item.productPrice || '0' }}
        </div>
        <div v-if="Number(item.originalPrice) > 0" class="text-xs font-normal ml-1 line-through text-[#888888]">
          ￥{{ item.originalPrice || 0 }}
        </div>
      </div>
      <div class="mb-1 h-1.25em">
        <div v-if="item.productLabel && JSON.parse(item.productLabel)">
          <v-chip
            v-for="ele in JSON.parse(item.productLabel)"
            :key="ele"
            class="mr-1"
            color="#fc6d41"
            label
            outlined
            x-small
          >
            {{ ele }}
          </v-chip>
        </div>
      </div>
    </div>
  </v-card>
</template>

<script>
import store from '@/store'
import { getSmallImage } from '@/utils/helper'

export default {
  name: 'Collocation',

  props: {
    height: [String, Number],
    width: [String, Number],
    item: Object,
  },

  computed: {
    product() {
      return [...this.item.commoditys].splice(0, 3)
    },
  },

  methods: {
    preview() {
      store.commit('selectProduct', this.item)
    },
    getSmallImage,
  },
}
</script>

<style scoped>
.aspect-ratio-square {
  aspect-ratio: 1/1;
}
.truncate-2{
  overflow: hidden;
  text-overflow: ellipsis;
  display:-webkit-box;
  -webkit-box-orient:vertical;
  -webkit-line-clamp:2;
}
</style>
