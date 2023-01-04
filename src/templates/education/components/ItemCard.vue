<template>
  <v-card
    v-ripple="false"
    class="product-item py-3 px-4 h-4/5 flex flex-col text-center"
    :data-product-id="item.productId"
    @click="$emit('click', item)"
  >
    <div class="aspect-4/5 overflow-hidden">
      <img :src="item.imgUrl" class="h-full w-full" />
    </div>
    <div class="pt-2 font-bold">
      <span>{{ item.productName }}</span>
      <span class="text-xs">{{ item.productFabric ? `（${item.productFabric}）` : '' }}</span>
    </div>
    <div class="pt-1">
      {{ item.productTypeName }}
    </div>
    <div class="text-sm text-gray-500 flex-1 pt-2">
      {{ item.personalSignature }}
    </div>
    <div class="text-center text-red-500">
      ￥{{ item.productPrice }}
    </div>
  </v-card>
</template>

<script>
export default {
  props: {
    item: Object,
  },
}
</script>
