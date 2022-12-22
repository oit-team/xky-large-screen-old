<template>
  <div class="!flex flex-col items-center justify-center clothing-category" @click="$emit('click')">
    <vc-img
      class="rounded transition items-center"
      :class="{ 'transform scale-125': active }"
      :src="item.typeImg"
      :lazy-src="item.typeImg"
      size="60"
    />
    <div
      class="mt-2 text-xs text-center text-gray-400"
      :class="{ 'font-bold text-gray-900': active }"
    >
      <div>{{ item.typeName }}</div>
      <div>{{ item.productNum || 0 }}样</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ClothingCategory',

  props: {
    item: Object,
    active: Boolean,
  },
}
</script>

<style scoped>
.clothing-category {
  min-width: 80px;
}
</style>
