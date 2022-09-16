<template>
  <v-card
    v-ripple="false"
    class="overflow-hidden"
    :height="height"
    :width="width"
    @click="preview"
  >
    <div class="flex relative z-10 flex-col text-center bg-white h-full">
      <div>
        <v-img
          height="280"
          :src="getSmallImage(item.imgResources[0])"
          :lazy-src="getSmallImage(item.imgResources[0])"
        />
      </div>
      <div class="px-2 text-xs font-bold truncate leading-6">
        {{ item.collName }}
      </div>
      <div class="flex-1 grid grid-cols-3 gap-2 p-2">
        <v-img
          v-for="(productItem, index) of product"
          :key="`${productItem.id}-${index}`"
          :src="productItem.resUrl"
          :lazy-src="productItem.resUrl"
        />
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

</style>
