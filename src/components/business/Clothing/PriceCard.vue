<template>
  <div :style="styles" class="flex-shrink-0 flex flex-col">
    <v-card class="text-center flex flex-col flex-1" :min-height="cardHeight" elevation="0">
      <v-img
        class="flex-1"
        :src="_getSmallImage(item.resUrl)"
        :size="imgSize"
        :lazy-src="_getSmallImage(item.resUrl)"
        transition="none"
      />
      <div class="px-1">
        <div class="mt-2 text-xs font-bold truncate">{{ item.styleNo }}</div>
        <div class="mt-1 text-xs text-gray-500 truncate">{{ item.styleName }}</div>
        <div class="my-2 text-xs font-bold text-red-500">￥{{ item.stylePrice }}</div>
      </div>
    </v-card>
    <div class="text-center">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { convertToUnit, getSmallImage } from '@/utils/helper'

export default {
  name: 'ClothingPriceCard',

  props: {
    item: Object,
    height: [String, Number],
    width: [String, Number],
    imgSize: [String, Number],
    cardHeight: [String, Number],
  },

  computed: {
    styles() {
      return {
        minHeight: convertToUnit(this.height),
        width: convertToUnit(this.width),
      }
    },
  },

  methods: {
    _getSmallImage: getSmallImage,
  },
}
</script>
