<template>
  <div class="carousel-wrap">
    <page-carousel
      ref="carousel"
      :options="options"
      :resources="resources"
      @close="close"
      @click.stop
    />
  </div>
</template>

<script>
import PageCarousel from '@/components/business/Carousel'
import { getAdvertsInfo } from '@/api/product'
import { debounce } from 'lodash'
import { enterCarouselPage } from '../api/frame'

export default {
  name: 'PageCarouselWarp',

  components: {
    PageCarousel,
  },

  data: () => ({
    options: [],
    resources: {},
  }),

  activated() {
    if (this.$route.params.preview) {
      const { imgResources } = this.$store.state.selectedProduct
      this.resources = {}
      this.options = imgResources.map(src => ({
        divide: '100%',
        disabledNext: true,
        items: [{
          src,
          type: 'image',
          fit: 'cover',
        }],
      }))
    } else {
      this.getAdvertsInfo()

      const { query } = this.$route
      enterCarouselPage({
        devId: query.devId,
        brandId: query.brandId,
      })
    }
  },

  methods: {
    async getAdvertsInfo() {
      const res = await getAdvertsInfo(localStorage.getItem('devId'))
      const {
        rotationRules,
        resEntityMap,
      } = res.body.advertsRes

      this.options = JSON.parse(rotationRules)
      this.resources = resEntityMap
    },
    close: debounce(function () {
      const disabledBack = Number(this.$route.query.disabledBack)
      !disabledBack && this.$router.back()
    }, 500, {
      leading: true,
      trailing: false,
    }),
  },
}
</script>

<style>
.carousel-wrap {
  position: fixed;
  z-index: 60;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}
</style>
