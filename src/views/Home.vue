<template>
  <div class="flex flex-col h-full home">
    <header class="flex overflow-hidden header bg-gray">
      <div class="relative">
        <v-img
          class="img"
          src="http://res.gaodanyi.com:8102/upload/gdy/dp/gdy002.png"
          width="420px"
          height="100%"
        />
        <div class="flex absolute bottom-0 justify-between p-2 w-full">
          <div class="overflow-hidden bg-black bg-opacity-40 rounded">
            <vc-btn class="px-2 min-w-0 bg-transparent" tile dark>
              <v-icon>fas fa-chevron-left</v-icon>
            </vc-btn>
            <span class="text-white">1/4</span>
            <vc-btn class="px-2 min-w-0 bg-transparent" tile dark>
              <v-icon>fas fa-chevron-right</v-icon>
            </vc-btn>
          </div>
          <div>
            <vc-btn class="bg-black bg-opacity-40" dark>试试看</vc-btn>
          </div>
        </div>
      </div>

      <div class="flex flex-col mx-8 mt-12 mb-6">
        <div class="space-x-8">
          <v-chip class="px-6 h-10 text-2xl text-white" label dark>
            <v-icon class="mr-2">#</v-icon>
            <span>日常通勤</span>
          </v-chip>
          <v-chip class="px-6 h-10 text-2xl text-white" label dark>
            <v-icon class="mr-2">#</v-icon>
            <span>日常休闲</span>
          </v-chip>
        </div>

        <p class="flex-1 mt-12 mb-10 text-xl">
          N.Paia冬日鹅绒精选羽绒不是越厚越好，蓬松又有型才是别致创
          意，肌理将面料分割成不同层面，充绒后与自然光泽、空间、廓
          形产生互动，仿佛艺术雕刻。
        </p>

        <div class="grid grid-cols-4 gap-3">
          <clothing-price-card card-height="235px">
            <vc-btn class="mt-2" block>试试看</vc-btn>
          </clothing-price-card>
        </div>
      </div>
    </header>

    <main class="flex flex-col flex-1">
      <section class="flex p-8 pt-4 category">
        <div class="grid flex-1 grid-cols-10 gap-3">
          <clothing-category v-for="i of 7" :key="i"/>
        </div>
        <!--        <div class="flex justify-around">-->
        <!--          <vc-btn class="text-left" large dark>-->
        <!--            <div class="flex flex-col">-->
        <!--              <v-icon class="mr-2">fas fa-user</v-icon>-->
        <!--              <span class="flex-1">自助挑选</span>-->
        <!--            </div>-->
        <!--          </vc-btn>-->
        <!--          <vc-btn class="text-left" large>-->
        <!--            <v-icon class="mr-2">fas fa-shopping-cart</v-icon>-->
        <!--            <span class="flex-1">试试看</span>-->
        <!--            <v-badge inline content="6" color="#c00000"/>-->
        <!--          </vc-btn>-->
        <!--        </div>-->
        <div class="flex items-stretch space-x-2">
          <vc-btn class="h-full text-left vertical-btn" dark @click="test">
            <v-icon class="mb-2">fas fa-user</v-icon>
            <span class="flex-1 vertical-text">自助挑选</span>
          </vc-btn>
          <div class="relative">
            <v-badge class="z-10 h-full" content="6" color="#c00000" offset-x="12" offset-y="12">
              <vc-btn class="relative h-full text-left vertical-btn" @click="test">
                <v-icon class="mb-2">fas fa-shopping-cart</v-icon>
                <span class="flex-1 vertical-text">我的试穿</span>
              </vc-btn>
            </v-badge>
            <vc-btn
              class="absolute left-0 -bottom-7 px-0"
              text
            >
              <v-icon small color="#d9d9d9">fas fa-trash-alt</v-icon>
            </vc-btn>
          </div>
          <!--          <vc-btn class="h-full text-left vertical-btn" color="error" text>-->
          <!--            <v-icon class="mb-2">fas fa-trash-alt</v-icon>-->
          <!--            <span class="flex-1 vertical-text">清空</span>-->
          <!--          </vc-btn>-->
        </div>
      </section>
      <section class="flex overflow-auto flex-1 pt-6 bg-gray">
        <!--        <div>-->
        <!--          <div class="flex clothing-list">-->
        <!--            <clothing-price-card-->
        <!--              v-for="item of clothingList[0]"-->
        <!--              :key="item"-->
        <!--              class="clothing-item"-->
        <!--              card-height="260px"-->
        <!--            >-->
        <!--              <vc-btn class="mt-2 bg-white" fab small>-->
        <!--                <v-icon size="18" color="#d9d9d9">fas fa-trash-alt</v-icon>-->
        <!--              </vc-btn>-->
        <!--            </clothing-price-card>-->
        <!--          </div>-->
        <!--          <div class="flex">-->
        <!--            <clothing-price-card-->
        <!--              v-for="item of clothingList[1]"-->
        <!--              :key="item"-->
        <!--              class="clothing-item"-->
        <!--              card-height="260px"-->
        <!--            >-->
        <!--              <vc-btn class="mt-2 bg-white" fab small>-->
        <!--                <v-icon size="18" color="#d9d9d9">fas fa-trash-alt</v-icon>-->
        <!--              </vc-btn>-->
        <!--            </clothing-price-card>-->
        <!--          </div>-->
        <!--        </div>-->
        <!--        <v-swiper class="swiper flex-1" :options="swiperOption">-->
        <!--          <template v-for="(i, index) of clothingList">-->
        <!--            <v-swiper-slide :key="index">-->
        <!--              <clothing-price-card-->
        <!--                class="clothing-item"-->
        <!--                card-height="260px"-->
        <!--              >-->
        <!--                <vc-btn class="mt-2 bg-white" fab small>-->
        <!--                  <v-icon size="18" color="#d9d9d9">fas fa-trash-alt</v-icon>-->
        <!--                </vc-btn>-->
        <!--              </clothing-price-card>-->
        <!--            </v-swiper-slide>-->
        <!--          </template>-->
        <!--        </v-swiper>-->
        <goods-list/>
      </section>
    </main>

    <footer class="mt-4">
      <v-img src="https://picsum.photos/1125/450" height="450"/>
    </footer>
  </div>
</template>

<script>
import ClothingPriceCard from '@/components/business/Clothing/PriceCard.vue'
import ClothingCategory from '@/components/business/Clothing/Category.vue'
import { getProductList } from '@/api/product'
import GoodsList from '@/components/business/GoodsList/GoodsList'

export default {
  name: 'Home',

  components: {
    ClothingPriceCard,
    ClothingCategory,
    GoodsList,
  },

  data: () => ({}),

  created() {
  },

  methods: {
    test() {
      getProductList({
        pageNum: 1,
        pageSize: 20,
        brandId: '143',
        styleCategory: '连衣裙',
      })
        .then(res => {
          console.log(res)
        })
    },
  },
}
</script>

<style lang="scss" scoped>
.home {
  flex: 1 0 0;

  .header {
    height: 630px;
  }

  .category {
    height: 190px;
  }

  .clothing-list {
  }

  .clothing-item {
    width: 160px;
    height: 325px;
    margin: 0 5px;
  }

  ::v-deep .vertical-btn {
    flex-direction: column;
    padding: 10px 0;

    .v-btn__content {
      flex-direction: inherit;
    }

    .vertical-text {
      text-align: center;
      writing-mode: vertical-lr;
    }
  }
}
</style>
