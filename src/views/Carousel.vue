<template>
  <div class="about">
    <v-btn @click="() => $refs.carousel.show = true">打开</v-btn>
    <page-carousel ref="carousel"/>
  </div>
</template>

<script>
import PageCarousel from '@/components/business/Carousel'

export default {
  components: {
    PageCarousel,
  },
}
</script>
