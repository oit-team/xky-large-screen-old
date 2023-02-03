<template>
  <div class="home">
    <header class="flex overflow-hidden bg-gray header">
      <div class="relative">
        <div>
          <v-swiper
            ref="swiper"
            class="bg-white product-preview"
            :options="options"
            @touchmove.native.prevent
          >
            <v-swiper-slide
              v-for="src in selectedItem.imgList"
              :key="src"
            >
              <v-img
                class="img"
                :src="getSmallImage(src, 'x')"
                height="100%"
                contain
                @click="zoomPreview()"
              />
            </v-swiper-slide>
          </v-swiper>
        </div>
        <div
          v-if="selectedItem.imgList && selectedItem.imgList.length"
          class="flex absolute bottom-0 z-10 justify-end p-2 w-full"
        >
          <div class="overflow-hidden bg-black bg-opacity-40 rounded">
            <vc-btn class="px-1 min-w-0 bg-transparent" tile dark @click="$headerSwiper.slidePrev()">
              <vc-icon>fas fa-chevron-left</vc-icon>
            </vc-btn>
            <span class="mx-1 text-white">{{ swiperIndex + 1 }}/{{ selectedItem.imgList.length }}</span>
            <vc-btn class="px-1 min-w-0 bg-transparent" tile dark @click="$headerSwiper.slideNext()">
              <vc-icon>fas fa-chevron-right</vc-icon>
            </vc-btn>
          </div>
        </div>
      </div>

      <div class="flex flex-1 gap-3 overflow-hidden flex-col mt-12 mb-3 px-6">
        <div class="flex items-center justify-between">
          <!--          <div class="h-10 text-2xl"> -->
          <!--            {{ selectedItem.productName.indexValue }} -->
          <!--          </div> -->
          <v-chip
            class="px-2 h-14 w-4/5 text-2xl text-white"
            label
            dark
          >
            <vc-icon class="mr-2">
              #
            </vc-icon>
            <span>{{ selectedItem.productName?.indexValue }}</span>
          </v-chip>

          <div class="text-red-500 text-2xl font-bold ml-2 mr-4">
            <span class="text-lg">￥</span>{{ selectedItem.productPrice?.indexValue || 0 }}
          </div>
        </div>

        <!--        详情 -->
        <div class="text-xl flex flex-col gap-3">
          <div><span class="text-lg text-[#888888]">{{ selectedItem.productNo?.indexDescrip }}：</span>{{ selectedItem.productNo?.indexValue || '暂无' }}</div>
          <div><span class="text-lg text-[#888888]">{{ selectedItem.productFabric?.indexDescrip }}：</span>{{ selectedItem.productFabric?.indexValue || '暂无' }}</div>
          <!--          <div class="flex items-center"> -->
          <!--            <span class="text-lg text-[#888888]">{{ selectedItem.productFabric?.indexDescrip }}：</span> -->
          <!--            &lt;!&ndash;            {{ selectedItem.productFabric?.indexValue || '暂无' }} &ndash;&gt; -->
          <!--            <div v-if="selectedItem.productFabric?.indexValue"> -->
          <!--              <v-chip -->
          <!--                v-for="(item, index) in selectedItem.productFabric?.indexValue" -->
          <!--                :key="index" -->
          <!--                color="#fc6d41" -->
          <!--                class="mr-1" -->
          <!--                label -->
          <!--                    outlined -->
          <!--              > -->
          <!--                {{ item }} -->
          <!--              </v-chip> -->
          <!--            </div> -->
          <!--            <div v-else> -->
          <!--              暂无 -->
          <!--            </div> -->
          <!--          </div> -->
          <div><span class="text-lg text-[#888888]">{{ selectedItem.productTypeName?.indexDescrip }}：</span>{{ selectedItem.productTypeName?.indexValue || '暂无' }}</div>
          <v-tooltip
            bottom
            max-width="300"
          >
            <template #activator="{ on, attrs }">
              <div
                class="truncate w-full"
                v-bind="attrs"
                @click="showTips = !showTips"
                v-on="on"
              >
                <span class="text-lg text-[#888888]">{{ selectedItem.productColoer?.indexDescrip }}：</span>
                {{ selectedItem.productColoer?.indexValue || '暂无' }}
              </div>
            </template>
            <span>{{ selectedItem.productColoer?.indexValue || '暂无' }}</span>
          </v-tooltip>
        </div>

        <!--        卡片 展示区 -->
        <div class="relative">
          <div class="absolute right-0 top-0 z-10">
            <v-btn text large @click="$router.push(`/template/clothing/detail/${selectedProduct.productId}`)">
              查看更多
              <vc-icon size="16">
                fas fa-angle-double-right
              </vc-icon>
            </v-btn>
          </div>
          <v-tabs v-model="tabItem" color="#000" background-color="#f2f2f2" slider-color="#d9d9d9">
            <v-tab class="text-xl">
              {{ selectedItem.wearSellingPoint?.indexDescrip }}
            </v-tab>
            <v-tab class="text-xl">
              {{ selectedItem.styleInfo?.indexDescrip }}
            </v-tab>
          </v-tabs>

          <v-card>
            <v-tabs-items v-model="tabItem" class="w-full h-220px">
              <v-tab-item class="p-2 w-full h-full flex items-center">
                <div v-if="selectedItem.wearSellingPoint?.indexValue" class="w-full h-full  overflow-hidden overflow-y-auto" v-html="selectedItem.wearSellingPoint?.indexValue">
                  <!--                  {{ selectedItem.wearSellingPoint?.indexValue }} -->
                </div>
                <div v-else class="w-full text-center">
                  暂无相关内容
                </div>
              </v-tab-item>

              <v-tab-item class="p-2 w-full h-full flex items-center">
                <div v-if="selectedItem.styleInfo?.indexValue" class="w-full h-full overflow-hidden overflow-y-auto" v-html="selectedItem.styleInfo?.indexValue">
                  <!--                  {{ selectedItem.styleInfo?.indexValue }} -->
                </div>
                <div v-else class="w-full text-center">
                  暂无相关内容
                </div>
              </v-tab-item>
            </v-tabs-items>
          </v-card>
        </div>
      </div>
    </header>

    <!--    分类 -->
    <section class="flex category overflow-hidden">
      <v-item-group v-model="withSelectedCategory" class="!flex items-center overflow-hidden overflow-x-auto !flex-1 p-4 mr-4">
        <v-item v-if="tab === TABS.COLLOCATION">
          <div class="p-4" @click="onClickAll">
            <vc-img
              class="rounded transition items-center bg-gray"
              :class="{ 'transform scale-125 elevation-5': withSelectedCategory === undefined }"
              src="assets/img/jewellery/all.png"
              size="60"
            />
            <div
              class="mt-2 text-xs text-center text-gray-400"
              :class="{ 'font-bold text-gray-900': withSelectedCategory === undefined }"
            >
              <div>全部</div>
              <div>{{ count }}样</div>
            </div>
          </div>
        </v-item>
        <v-item
          v-for="item of obsCategoryList"
          v-slot="{ active, toggle }"
          :key="item.typeId"
          :value="item.typeName"
        >
          <ClothingCategory
            :active="active"
            :item="item"
            @click="toggle"
          />
        </v-item>
      </v-item-group>

      <div class="!flex items-stretch p-4 pb-8 space-x-2">
        <vc-btn class="h-full text-left vertical-btn" dark @click="tab = TABS.COLLOCATION">
          <vc-icon class="mb-2">
            fas fa-user
          </vc-icon>
          <span class="flex-1 vertical-text">自助挑选</span>
        </vc-btn>
        <div class="relative">
          <v-badge
            class="z-10"
            :content="shoppingCartList.length || '0'"
            color="#c00000"
            offset-x="12"
            offset-y="12"
          >
            <vc-btn class="relative h-full text-left vertical-btn" @click="tab = TABS.SHOPPING_CART">
              <vc-icon class="mb-2">
                fas fa-shopping-cart
              </vc-icon>
              <span class="flex-1 vertical-text">感兴趣</span>
            </vc-btn>
          </v-badge>
          <div
            v-click-outside="() => changeBtn(false)"
            class="absolute left-0 -bottom-7 px-0"
          >
            <vc-btn
              class="mb-1"
              @click="showDialog"
            >
              <vc-icon size="16">
                fas fa-phone
              </vc-icon>
            </vc-btn>
            <vc-btn
              v-if="!deleteConfirm"
              text
              @click="changeBtn(true)"
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
              @click="removeFormCart()"
            >
              确定
            </vc-btn>
          </div>
        </div>
      </div>
    </section>

    <keep-alive>
      <section class="bg-gray flex overflow-hidden">
        <template v-if="tab === TABS.COLLOCATION">
          <div
            v-if="collocationList.length"
            ref="collocationList"
            class="h-full max-w-full inline-grid grid-rows-2 grid-flow-col gap-x-4 py-2 px-8 items-center overflow-x-auto"
            @scroll.passive="scroll"
          >
            <div
              v-for="item of collocationList"
              :key="item.productId"
            >
              <Collocation
                class="transition"
                :class="`elevation-${selectedProduct === item ? 5 : 0}`"
                :item="item"
                width="225"
              />

              <div class="w-full mt-1">
                <vc-btn v-if="!checkSelected(item)" block @click="addToCart(item)">
                  <vc-icon size="16" dark class="mr-1">
                    far fa-heart
                  </vc-icon>
                  感兴趣
                </vc-btn>
                <vc-btn v-else color="#4CAF50" dark block @click="removeFormCart(item)">
                  取消
                </vc-btn>
              </div>
            </div>
          </div>
          <div v-else class="flex-1 flex-center">
            <p class="text-xl">
              暂无信息
            </p>
          </div>
        </template>

        <template v-if="tab === TABS.SHOPPING_CART">
          <div
            ref="shoppingCartList"
            class="h-full max-w-full inline-grid grid-rows-2 grid-flow-col gap-x-4 py-2 px-8 items-center overflow-hidden overflow-x-auto"
          >
            <ClothingPriceCard
              v-for="item of shoppingCartListFiltered"
              :key="item.id"
              :item="item"
              width="210"
              height="400"
            >
              <vc-btn
                class="mt-2 bg-white"
                fab
                small
                color="error"
                text
                @click="removeFormCart(item)"
              >
                <vc-icon class="text-red-300" size="18">
                  fas fa-trash-alt
                </vc-icon>
              </vc-btn>
            </ClothingPriceCard>
          </div>
          <div v-if="!shoppingCartListFiltered.length" class="flex-col flex-1 flex-center">
            <p class="text-xl">
              未选择任何商品
            </p>
            <div>
              <vc-btn dark large @click="tab = TABS.COLLOCATION">
                去挑选
              </vc-btn>
            </div>
          </div>
        </template>
      </section>
    </keep-alive>

    <footer class="bg-black flex justify-center items-center">
      <div class="text-[#ffffff] w-[75%]">
        <div class="text-sm flex items-center">
          <div>
            <vc-img
              width="180px"
              height="180px"
              :src="brandInfo.brandLogo"
              class="border-white border-1 border-solid mr-16"
            ></vc-img>
          </div>
          <div class="flex flex-col gap-2">
            <div class="py-2 text-xl font-semibold">
              {{ brandInfo.brandName }}
            </div>
            <div>
              <span class="text-gray-400">联系电话：</span>{{ brandInfo.telepHone }}
            </div>
            <div>
              <span class="text-gray-400">联系地址：</span>{{ brandInfo.address }}
            </div>
            <div class="overFlow-3 flex">
              <span class="text-gray-400 whitespace-nowrap tracking-2em"> 文</span><span class="text-gray-400">化：</span>
              <div>
                {{ brandInfo.introduce }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>

    <ProductPreview v-model="showPreview" :index="swiperIndex" :list="selectedItem.imgList" />
    <!--    悬浮模块 -->
    <v-dialog
      v-model="dialog"
      persistent
      max-width="700px"
    >
      <v-card>
        <v-card-title>
          请留下您的联系方式，我们将联系您
        </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="andPhone"
            label="手机号"
            :rules="rules"
            hide-details="auto"
          ></v-text-field>
          <!--          自定义键盘 -->
          <div class="flex-center mt-8 mb-4">
            <div class="grid grid-cols-3 gap-2 w-1/2">
              <vc-btn @click="andPhone += '1'">
                1
              </vc-btn>
              <vc-btn @click="andPhone += '2'">
                2
              </vc-btn>
              <vc-btn @click="andPhone += '3'">
                3
              </vc-btn>
              <vc-btn @click="andPhone += '4'">
                4
              </vc-btn>
              <vc-btn @click="andPhone += '5'">
                5
              </vc-btn>
              <vc-btn @click="andPhone += '6'">
                6
              </vc-btn>
              <vc-btn @click="andPhone += '7'">
                7
              </vc-btn>
              <vc-btn @click="andPhone += '8'">
                8
              </vc-btn>
              <vc-btn @click="andPhone += '9'">
                9
              </vc-btn>
              <vc-btn @click="andPhone = andPhone.slice(0, andPhone.length - 1)">
                <vc-icon>
                  fas fa-backspace
                </vc-icon>
              </vc-btn>
              <vc-btn @click="andPhone += '0'">
                0
              </vc-btn>
              <vc-btn @click="subPhone">
                确认
              </vc-btn>
            </div>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="dialogClose"
          >
            关闭
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { chunk, isEmpty, keyBy } from 'lodash'
import { mapState } from 'vuex'
import { enterShopPage } from '@/api/frame'
import {
  getBrandNameCard,
  getProductAll,
  getProductById,
  getProductParent,
  insertGoodsPhoneRelation,
} from '@/api/product'
import ClothingCategory from '@/components/business/Clothing/Category.vue'
import Collocation from '@/components/business/Clothing/Collocation.vue'
import ClothingPriceCard from '@/components/business/Clothing/PriceCard.vue'
import ProductPreview from '@/components/business/ProductPreview/ProductPreview.vue'
import Message from '@/components/commons/Message'
import { getSmallImage } from '@/utils/helper'

const TABS = {
  COLLOCATION: 0,
  SHOPPING_CART: 1,
}

const scrollRecord = {
  collocationList: 0,
  shoppingCartList: 0,
}

let promise = null
let timer = null

export default {
  name: 'Jewellery',

  components: {
    ClothingPriceCard,
    ClothingCategory,
    Collocation,
    ProductPreview,
  },

  data() {
    this.TABS = TABS
    this.options = {}
    this.$headerSwiper = null
    return {
      tab: TABS.COLLOCATION,
      swiperIndex: 0,
      collocationListCache: {},
      loading: false,
      page: 1,
      deleteConfirm: false,
      categoryList: [],
      selectedCategory: undefined, // 当前选中分类名称
      selectedCartCategory: undefined,
      showPreview: false,
      brandInfo: {}, // 品牌详情
      selectedItem: {},
      tabItem: 0,
      dialog: false, // 显示输入手机号的 dialog
      andPhone: '',
      count: 0,
      rules: [
        value => !!value || '必填项',
        value => (value && value.length === 11) || '只支持11位字符',
      ],
      showTips: false, // 显示隐藏商品详情中的颜色
    }
  },

  computed: {
    // selectedProduct - 当前选中的商品对象
    ...mapState(['selectedProduct']),
    ...mapState('shoppingCart', {
      shoppingCartList: 'list',
    }),
    collocationListChunked() {
      return chunk(this.collocationList, 2)
    },
    shoppingCartListChunked() {
      return chunk(this.shoppingCartListFiltered, 2)
    },
    shoppingCartListFiltered() {
      const data = this.shoppingCartList.filter(item => item.productTypeName === this.selectedCartCategory)
      if (data.length)
        return data

      return this.shoppingCartList
    },
    withSelectedCategory: {
      set(value) {
        if (this.tab === TABS.COLLOCATION)
          this.selectedCategory = value

        if (this.tab === TABS.SHOPPING_CART)
          this.selectedCartCategory = value
      },
      get() {
        if (this.tab === TABS.COLLOCATION)
          return this.selectedCategory

        if (this.tab === TABS.SHOPPING_CART)
          return this.selectedCartCategory

        return ''
      },
    },
    collocationList: {
      set(value) {
        this.$set(this.collocationListCache, this.selectedCategory, value)
      },
      get() {
        return this.collocationListCache[this.selectedCategory] || []
      },
    },
    // 分类列表
    obsCategoryList() {
      switch (this.tab) {
        case TABS.COLLOCATION:
          return this.categoryList
        case TABS.SHOPPING_CART:
          return this.shoppingCartCategory
        default:
          return []
      }
    },
    categoryMap() {
      return keyBy(this.categoryList, 'typeName')
    },
    shoppingCartCategory() {
      return this.shoppingCartList.reduce((prev, item) => {
        if (prev[item.productTypeName]) {
          prev[item.productTypeName].productNum++
        } else {
          prev[item.productTypeName] = {
            categoryMap: item.productTypeName,
            ...this.categoryMap[item.productTypeName],
            productNum: 1,
          }
        }
        return prev
      }, {})
    },
    collLabels() {
      return this.selectedProduct.collLabel?.replaceAll('，', ',').split(',')
    },
  },

  watch: {
    selectedCategory() {
      this.page = 1
      this.loading = false
      clearTimeout(timer)
      this.loadData()
      this.saveScrollRecord(0)
      this.setScrollRecord()
    },
    tab() {
      this.saveScrollRecord()
      this.setScrollRecord()
    },
    // 当前选择商品 this.selectedProduct
    selectedProduct() {
      // 当前商品发生改变 顶部详情的轮播组件的index要归零
      this.swiperIndex = 0
      this.$headerSwiper.activeIndex = 0
      this.getProductById(this.selectedProduct.productId)
    },
  },

  created() {
    this.setSwiperOptions()
    this.getBrandNameCard()
  },

  mounted() {
    this.$headerSwiper = this.$refs.swiper?.$swiper
    this.getCategory()
    this.loadData()
  },

  activated() {
    this.setScrollRecord()

    const { query } = this.$route
    enterShopPage({
      devId: query.devId,
      brandId: query.brandId,
    })
  },

  deactivated() {
    this.saveScrollRecord()
  },

  methods: {
    getSmallImage,
    setSwiperOptions() {
      // 轮播图片集合
      this.options = {
        on: {
          slideChange: () => {
            this.swiperIndex = this.$headerSwiper.realIndex
          },
        },
      }
    },
    addToCart(item) {
      this.$store.commit('shoppingCart/add', item)
    },
    hasCart(item) {
      return this.shoppingCartList.some(someItem => someItem.id === item.id)
    },
    removeFormCart(item) {
      if (item) {
        this.$store.commit('shoppingCart/remove', item)
      } else {
        this.$store.commit('shoppingCart/clear')
        this.deleteConfirm = false
      }
    },
    loadData() {
      if (this.loading)
        return
      this.loading = true

      const getData = () => getProductAll({
        pageNum: this.page,
        pageSize: 30,
        brandId: sessionStorage.getItem('brandId'),
        productType: this.selectedCategory,
      })

      promise = getData()
      const current = promise

      promise.then((res) => {
        // 对比promise是否是当前的
        if (promise !== current)
          return
        const collocationList = res.body.resultList
        if (collocationList.length) {
          this.collocationList = this.page === 1
            ? collocationList
            : this.collocationList.concat(...collocationList)
          this.page++

          // 选中的商品
          if (isEmpty(this.$store.state.selectedProduct))
            this.$store.commit('selectProduct', this.collocationList[0])
        }
      })
        .finally(() => {
          // 延迟一会，避免频繁请求
          timer = setTimeout(() => {
            this.loading = false
          }, 1000)
        })
    },
    // 获取当前选择商品详情
    async getProductById(id) {
      const res = await getProductById({
        productId: id,
        brandId: sessionStorage.getItem('brandId'),
      })
      this.selectedItem = res.body
      this.$nextTick(() => {
        this.$headerSwiper = this.$refs.swiper?.$swiper
      })
    },
    // 获取品牌详情
    async getBrandNameCard() {
      const res = await getBrandNameCard({
        brandId: sessionStorage.getItem('brandId'),
      })
      this.brandInfo = res.body
    },
    // 获取一级分类
    async getCategory() {
      const res = await getProductParent({
        brandId: sessionStorage.getItem('brandId'),
      })
      this.categoryList = res.body.resultList
      this.categoryList.forEach((item) => {
        this.count += item.productNum
      })
    },
    // 点击手机号按钮  显示关联手机号对话框
    showDialog() {
      if (!this.$store.state.shoppingCart.list?.length) {
        Message.error('请选择感兴趣的商品')
        return false
      }
      this.dialog = true
    },
    // 填写手机号  点击提交
    async subPhone() {
      if (this.andPhone === '' || this.andPhone.length !== 11) {
        Message.error('请输入正确手机号')
        return false
      }
      const list = this.$store.state.shoppingCart.list
      const productIds = list.reduce((def, item) => {
        def.push(item.productId)
        return def
      }, [])
      await insertGoodsPhoneRelation({
        productIds: productIds.join(','),
        brandId: sessionStorage.getItem('brandId'),
        phone: this.andPhone,
      })
      Message.success('已通知工作人员，请找工作人员确认。')
      this.dialog = false
      this.andPhone = ''
      this.tab = TABS.COLLOCATION
      this.$store.commit('shoppingCart/clear')
    },
    // 点击全部分类
    onClickAll() {
      this.withSelectedCategory = undefined
      this.loadData()
    },
    // 判断当前项 是否已经添加到购物车
    checkSelected(item) {
      const list = this.$store.state.shoppingCart.list
      return list.find(e => e.productId === item.productId)
    },
    // 关闭dialog
    dialogClose() {
      this.dialog = false
      this.andPhone = ''
    },
    scroll(e) {
      const {
        clientWidth,
        scrollLeft,
        scrollWidth,
      } = e.target

      if (scrollWidth - clientWidth - scrollLeft < 500)
        this.loadData()
    },
    changeBtn(value) {
      this.deleteConfirm = value
    },
    zoomPreview() {
      this.showPreview = true
      // this.$router.push({
      //   name: 'Carousel',
      //   params: { preview: true },
      // })
    },
    saveScrollRecord(scrollLeft) {
      if (this.$refs.shoppingCartList)
        scrollRecord.shoppingCartList = scrollLeft ?? this.$refs.shoppingCartList.scrollLeft

      if (this.$refs.collocationList)
        scrollRecord.collocationList = scrollLeft ?? this.$refs.collocationList.scrollLeft
    },
    setScrollRecord() {
      this.loading = true
      this.$nextTick(() => {
        if (this.$refs.shoppingCartList)
          this.$refs.shoppingCartList.scrollLeft = scrollRecord.shoppingCartList

        if (this.$refs.collocationList)
          this.$refs.collocationList.scrollLeft = scrollRecord.collocationList

        setTimeout(() => {
          this.loading = false
        })
      })
    },
  },
}
</script>

<style lang="scss" scoped>
$screen-width: 1080px;
$screen-height: 1920px;

$header-height: 620px;
$category-height: 200px;
$footer: 250px;

$chip-white-space: unset;
//$chip-content-display: inherit;

$product-preview-width: $header-height / 4 * 3;

.home {
  width: $screen-width;
  height: $screen-height;
  aspect-ratio: 9/16;
  display: grid;
  grid-template-rows: $header-height $category-height 1fr $footer;

  .header {
    height: $header-height;

    .product-preview {
      flex-shrink: 0;
      width: $product-preview-width;
      height: $header-height;
    }
    .v-chip{
      white-space: $chip-white-space;
    }
    .v-tab{
      border: 1px solid #d9d9d9;
    }
    .v-tab--active{
      background-color: #e1e1e1;
    }
    :deep(.v-tabs-slider-wrapper){
      display: none;
    }
  }

  .overFlow-3{
    overflow: hidden;
    text-overflow: ellipsis;
    display:-webkit-box;
    -webkit-box-orient:vertical;
    -webkit-line-clamp:3;
  }
  .category {
    height: $category-height;
  }
  .product-list {
    @apply flex-1 bg-gray;
  }

  :deep(.vertical-btn) {
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

.description {
  display: -webkit-box;
  overflow: hidden;
  max-height: calc(1.75rem * 3);
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
.flex-center{
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
