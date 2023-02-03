<template>
  <footer class="h-20vh bg-black grid place-content-center text-white">
    <div class="flex items-center max-w-4/5 mx-auto">
      <img :src="brandInfo.brandLogo" class="w-180px h-180px">
      <div class="ml-4 flex flex-col gap-2">
        <div class="text-3xl">
          {{ brandInfo.brandName }}
        </div>
        <div>{{ brandInfo.telepHone }}</div>
        <div>{{ brandInfo.address }}</div>
        <div>{{ brandInfo.introduce }}</div>
      </div>
    </div>
  </footer>
</template>

<script>
import { getBrandNameCard } from '@/api/product'

export default {
  data: () => ({
    brandInfo: Object,
  }),

  created() {
    this.getBrandNameCard()
  },

  methods: {
    async getBrandNameCard() {
      const res = await getBrandNameCard({
        brandId: sessionStorage.getItem('brandId'),
      })
      this.brandInfo = res.body
    },
  },
}
</script>
