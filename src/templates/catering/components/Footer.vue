<template>
  <footer class="py-2vh grid grid-cols-1 place-content-center text-white footer bg-gradient-to-t from-[#000000] to-transparent">
    <div class="flex items-center max-w-4/5 mx-auto">
      <v-img :src="footer.brandLogo" class="w-180px h-180px flex-grow-0" />
      <div class="ml-8 flex flex-col gap-2">
        <div class="text-3xl">
          {{ footer.brandName }}
        </div>
        <div>联系电话：{{ footer.telepHone }}</div>
        <div>联系地址：{{ footer.address }}</div>
        <div>{{ footer.introduce }}</div>
      </div>
    </div>
  </footer>
</template>

<script>
import { getBrandNameCard } from '@/api/product'

export default {
  props: {
    info: Object,
  },
  data: () => ({
    footer: {},
  }),
  watch: {
    info() {
      this.footer = this.info
    },
  },
  created() {
    this.getBrandNameCard()
  },

  methods: {
    async getBrandNameCard() {
      if (this.info) return
      const res = await getBrandNameCard({
        brandId: sessionStorage.getItem('brandId'),
      })
      this.footer = res.body
    },
  },
}
</script>

<style scoped>
</style>
