<template>
  <div class="aspect-9/16 overflow-hidden bg-gray-100">
    <swiper v-if="!loading && list.length && tab === TABS.LIST" class="swiper mr-5" :options="swiperOption" @touchmove.native.prevent>
      <swiper-slide v-for="(chunk, index) of listChunk" :key="index">
        <div class="grid grid-cols-3 gap-5 h-full px-1">
          <div
            v-for="(item, i) of chunk"
            :key="i"
            class="flex flex-col"
          >
            <ItemCard :item="item"></ItemCard>
            <div class="grid place-content-center flex-1">
              <v-btn icon :class="{ 'text-red-500': hasItem(item.productId) }" @click="toggleItem(item.productId, item)">
                <v-icon>fas fa-heart</v-icon>
              </v-btn>
            </div>
          </div>
        </div>
      </swiper-slide>
    </swiper>

    <div v-if="selectedCount" class="w-80vw ml-auto mr-5 grid grid-cols-3 grid-rows-[33%] gap-5 h-full px-1">
      <ItemCard
        v-for="item of selectedMap"
        :key="item.productId"
        :item="item"
        @click="$router.push(`/template/education/detail/${item.productId}`)"
      ></ItemCard>
    </div>

    <div class="grid place-content-center h-full">
      <div v-if="loading" class="w-40vw">
        <div class="text-3xl mb-2 text-center">
          正在加载...
        </div>
        <v-progress-linear
          indeterminate
          rounded
          height="6"
        ></v-progress-linear>
      </div>
      <div v-if="!loading && ((tab === TABS.LIST && !list.length) || (tab === TABS.SHOPPING_CART && !selectedCount))">
        <div class="text-4xl mb-2 text-center">
          暂无数据
        </div>
      </div>
    </div>

    <div class="absolute left-0 top-1/5 w-150px">
      <v-item-group v-model="selectedType" class="max-h-650px divide-y overflow-y-auto bg-white rounded-r-md" mandatory>
        <v-item v-for="item of typeList" v-slot="{ active, toggle }" :key="item.typeId" :value="item.key ?? item.typeName">
          <div
            class="h-150px flex flex-col pt-2"
            :class="{ '': active }"
            @click="toggle"
          >
            <div class="h-3/5 overflow-hidden">
              <v-img :src="item.typeImg" class="aspect-square h-full mx-auto bg-gray-100 rounded" />
            </div>
            <div class="text-gray-500 flex flex-col items-center justify-center flex-1">
              <div class="text-sm">
                {{ item.typeName }}
              </div>
              <div>{{ item.productNum }}位</div>
            </div>
          </div>
        </v-item>
      </v-item-group>
      <div class="flex items-stretch justify-center pt-4 pb-8 space-x-2 h-210px">
        <div class="relative flex flex-col gap-2">
          <v-badge
            class="z-10 flex-1"
            :content="Object.keys(selectedMap).length || '0'"
            color="#c00000"
            offset-x="12"
            offset-y="12"
          >
            <vc-btn class="h-full relative text-left vertical-btn" dark @click="tab = TABS.SHOPPING_CART">
              <vc-icon class="mb-2">
                fas fa-shopping-cart
              </vc-icon>
              <span class="flex-1 vertical-text">感兴趣</span>
            </vc-btn>
          </v-badge>
          <vc-btn>
            <vc-icon size="16" color="#fff">
              fas fa-phone
            </vc-icon>
          </vc-btn>
          <div
            v-click-outside="() => deleteConfirm = false"
            class="absolute left-0 -bottom-7 px-0"
          >
            <vc-btn
              v-if="!deleteConfirm"
              text
              @click="deleteConfirm = true"
            >
              <vc-icon size="16" color="#d9d9d9">
                fas fa-trash-alt
              </vc-icon>
            </vc-btn>
            <vc-btn
              v-else
              class="px-0 w-full"
              text
              color="error"
              @click="clearItem()"
            >
              确定
            </vc-btn>
          </div>
        </div>
        <vc-btn class="h-auto text-left vertical-btn" @click="tab = TABS.LIST">
          <vc-icon class="mb-2">
            fas fa-shopping-cart
          </vc-icon>
          <span class="flex-1 vertical-text">我的试穿</span>
        </vc-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import { chunk, throttle } from 'lodash'
import ItemCard from '../components/ItemCard'
import { getProductAll, getProductParent } from '@/api/product'

const TABS = {
  LIST: 0,
  SHOPPING_CART: 1,
}

export default {
  components: {
    Swiper,
    SwiperSlide,
    ItemCard,
  },
  data() {
    return {
      TABS,
      deleteConfirm: false,
      loading: false,
      tab: TABS.LIST,
      list: [],
      typeList: [],
      selectedType: undefined,
      selectedMap: {},
    }
  },
  computed: {
    swiperOption() {
      return {
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
        direction: 'vertical',
        slidesPerView: 3,
        loop: this.list.length > 9,
        on: {
          click: throttle(this.clickItem, 300, { leading: true, trailing: false }),
        },
      }
    },
    listChunk() {
      return chunk(this.list, 3)
    },
    selectedCount() {
      return Object.keys(this.selectedMap).length
    },
  },
  watch: {
    selectedType: 'getProductAll',
  },
  created() {
    this.getProductParent()
    this.getProductAll()
  },
  methods: {
    async getProductAll() {
      this.loading = true
      const res = await getProductAll({
        brandId: sessionStorage.getItem('brandId'),
        pageSize: 999,
        pageNum: 1,
        productType: this.selectedType,
      }).finally(() => {
        // 延迟结束loading
        setTimeout(() => this.loading = false)
      })

      this.list = res.body.resultList
    },
    clickItem(e) {
      const item = e.target.closest('.product-item')
      if (!item) return
      const productId = item.dataset.productId
      this.$router.push(`/template/education/detail/${productId}`)
    },
    async getProductParent() {
      const res = await getProductParent({
        brandId: sessionStorage.getItem('brandId'),
      })
      this.typeList = [
        {
          key: '',
          typeName: '全部',
          productNum: res.body.resultList.reduce((acc, cur) => acc + cur.productNum, 0),
        },
        ...res.body.resultList,
      ]
    },
    addItem(id, item) {
      this.$set(this.selectedMap, id, item)
    },
    removeItem(id) {
      this.$delete(this.selectedMap, id)
    },
    toggleItem(id, item) {
      if (this.selectedMap[id]) {
        this.removeItem(id)
      } else {
        this.addItem(id, item)
      }
    },
    hasItem(id) {
      return !!this.selectedMap[id]
    },
    clearItem() {
      this.selectedMap = {}
    },
  },
}
</script>

<style lang="scss">
.swiper {
  width: 80vw;
  height: 100%;
}

.vertical-btn {
  flex-direction: column;
  padding: 10px !important;

  .v-btn__content {
    flex-direction: inherit;
  }

  .vertical-text {
    text-align: center;
    writing-mode: vertical-lr;
  }
}
</style>
