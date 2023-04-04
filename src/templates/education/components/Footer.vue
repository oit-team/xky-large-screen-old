<template>
  <footer class="py-2vh grid grid-cols-1 place-content-center text-white footer bg-gradient-to-t from-[#000000] to-transparent">
    <div class="flex items-center max-w-4/5 mx-auto">
      <v-img :src="info.brandLogo" class="w-180px h-180px flex-grow-0" />
      <div class="ml-8 flex flex-col gap-2">
        <div class="text-3xl">
          {{ info.brandName }}
        </div>
        <div>联系电话：{{ info.telepHone }}</div>
        <div>联系地址：{{ info.address }}</div>
        <div>{{ info.introduce }}</div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  props: {
    info: Object,
  },
  created() {
    // this.getBrandNameCard()
  },

  methods: {
  },
}
</script>

<style scoped>
</style>
