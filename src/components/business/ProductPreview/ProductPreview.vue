<template>
  <v-fade-transition>
    <div v-show="value" class="product-preview" @click="$emit('input', !value)">
      <swiper ref="swiper" :options="swiperOption" @touchmove.native.prevent>
        <swiper-slide v-for="item of $store.state.selectedProduct.imgResources" :key="item">
          <v-img :src="item" height="100%"/>
        </swiper-slide>

        <div
          v-show="$store.state.selectedProduct.imgResources.length > 1"
          slot="pagination"
          class="swiper-pagination"
        ></div>
      </swiper>
    </div>
  </v-fade-transition>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

export default {
  name: 'ProductPreview',

  components: {
    Swiper,
    SwiperSlide,
  },

  props: {
    value: Boolean,
    index: Number,
    list: Array,
  },

  watch: {
    value() {
      this.$nextTick(() => {
        this.value && this.$refs.swiper.$swiper.slideTo(this.index, 0)
      })
    },
  },

  created() {
    this.swiperOption = {
      pagination: {
        el: '.swiper-pagination',
      },
    }
  },
}
</script>

<style scoped lang="scss">
.product-preview {
  position: fixed;
  z-index: 100;
  width: 100vw;
  background-color: #ffffff;
  aspect-ratio: 9/16;

  .swiper-container {
    height: 100%;

    .swiper-pagination {
      bottom: 100px;
    }

    ::v-deep .swiper-pagination-bullet {
      width: 24px;
      height: 24px;
    }

    ::v-deep .swiper-pagination-bullet-active {
      --swiper-pagination-color: black;
    }
  }
}
</style>
