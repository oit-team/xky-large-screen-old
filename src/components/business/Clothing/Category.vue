<template>
  <div class="flex flex-col flex-center clothing-category" @click="$emit('click')">
    <div>
      <vc-img
        class="rounded transition"
        :class="{'transform scale-125': active}"
        :src="item.imgUrl"
        :lazy-src="item.imgUrl"
        size="60"
      />
    </div>
    <div
      class="mt-2 text-xs text-center text-gray-400"
      :class="{'font-bold text-gray-900': active}"
    >
      <div>{{ item.styleName }}</div>
      <div class="transform scale-90">{{ item.totalNum }}套</div>
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
