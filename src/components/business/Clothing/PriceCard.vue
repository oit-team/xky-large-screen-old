<template>
  <div>
    <v-card class="text-center flex flex-col" :height="cardHeight">
      <v-img src="https://picsum.photos/145"/>
      <div class="px-1">
        <div class="mt-2 text-xs font-bold truncate">XZGIAY116AW</div>
        <div class="mt-1 text-xs text-gray-500 truncate">100%美利奴羊毛美利奴羊毛美利奴羊毛</div>
        <div class="my-2 text-xs font-bold text-red-500">￥4399</div>
      </div>
    </v-card>
    <div class="text-center">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ClothingPriceCard',

  props: {
    cardHeight: [String, Number],
  },
}
</script>
