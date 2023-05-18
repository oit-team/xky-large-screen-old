<template>
  <VueActions data="educationPage" class="aspect-9/16 overflow-hidden flex flex-col">
    <Banner />

    <main class="flex flex-col flex-1 overflow-hidden">
      <swiper v-if="!loading && list.length && tab === TABS.LIST" class="h-full w-80vw ml-5" :options="swiperOption" @touchmove.native.prevent>
        <swiper-slide v-for="(chunk, index) of listChunk" :key="index">
          <div class="grid grid-cols-3 gap-5 h-full">
            <div
              v-for="(item, i) of chunk"
              :key="i"
              class="flex flex-col overflow-hidden"
            >
              <!-- 列表单个感兴趣卡片 -->
              <ItemCard :item="item" :active="hasItem(item.productId)"></ItemCard>
            </div>
          </div>
        </swiper-slide>
      </swiper>

      <!-- 点击查看所有感兴趣 -->
      <div v-if="tab === TABS.SHOPPING_CART && selectedCount" class="w-80vw ml-5 grid grid-cols-3 grid-rows-[repeat(auto-fill,33%)] gap-x-5 flex-1">
        <div
          v-for="item of selectedMap"
          :key="item.productId"
          class="flex flex-col"
        >
          <ItemCard
            class="h-4/5"
            :item="item"
            :active="hasItem(item.productId)"
            @click="toDetail(item.productId)"
            @toggle="toggleItem"
          ></ItemCard>
        </div>
      </div>

      <template>
        <div v-if="loading && tab === TABS.LIST" class="grid place-content-center flex-1">
          <div class="w-40vw">
            <div class="text-3xl mb-2 text-center">
              正在加载...
            </div>
            <v-progress-linear
              indeterminate
              rounded
              height="6"
            ></v-progress-linear>
          </div>
        </div>
        <div v-if="!loading && ((tab === TABS.LIST && !list.length) || (tab === TABS.SHOPPING_CART && !selectedCount))" class="grid place-content-center flex-1">
          <div class="text-4xl mb-2 text-center">
            暂无数据
          </div>
        </div>
      </template>
    </main>

    <Footer class="z-100 w-full" />

    <!-- 健身类购物车 感兴趣 -->
    <div class="absolute right-0 top-1/5 w-150px shadow-lg rounded-md">
      <v-item-group v-model="selectedType" class="flex flex-col gap-2 bg-white rounded-r-md" mandatory>
        <v-item v-for="item of typeList" v-slot="{ active, toggle }" :key="item.typeId" :value="item.key ?? item.typeName">
          <div
            v-actions:asideTypeList.click
            class="flex rounded-l-lg p-2"
            :class="{ 'bg-gray': active }"
            @click="toggle"
          >
            <v-img class="h-30px w-30px flex-grow-0" :src="item.typeImg" />
            <div class="text-gray-500 text-sm flex-1">
              <div class="py-1 px-3 rounded w-full" style="text-align-last: justify">
                {{ item.typeName }}
                <div class="w-full"></div>
              </div>
            </div>
          </div>
        </v-item>
      </v-item-group>

      <div class="flex flex-col items-center pt-6 pb-2 px-5 mb-4">
        <v-badge
          class="z-10 flex-1 w-full"
          :content="Object.keys(selectedMap).length || '0'"
          color="#c00000"
          offset-x="12"
          offset-y="12"
        >
          <v-btn
            id="educationBuycar"
            v-actions:asideGetIteresting.click
            outlined
            block
            @click="changeTab"
          >
            <!--              :outlined="!shopDark" -->
            <!--              :dark="shopDark" -->
            感兴趣
          </v-btn>
        </v-badge>
        <div class="flex justify-around mt-2">
          <div
            v-click-outside="() => deleteConfirm = false"
          >
            <v-btn
              v-if="!deleteConfirm"
              text
              @click="deleteConfirm = true"
            >
              <vc-icon size="16" color="#8a8a8a">
                fas fa-trash-alt
              </vc-icon>
            </v-btn>
            <v-btn
              v-else
              v-actions:asideClearItem.click
              class="px-0 w-full"
              text
              color="error"
              @click="clearItem()"
            >
              确定
            </v-btn>
          </div>
          <v-divider vertical class="my-2" />
          <v-btn v-actions:asideBackToHome.click text @click="changeTabList">
            <v-icon size="16" color="#8a8a8a">
              fas fa-home
            </v-icon>
          </v-btn>
        </div>

        <v-btn
          v-actions:asideInputTelephone.click
          block
          dark
          class="mt-4"
          @click="showPhone"
        >
          <!--            :outlined="!phoneDark" -->
          <!--            :dark="phoneDark" -->
          联系我们
        </v-btn>
        <v-btn
          v-if="showBack"
          v-actions:back.click
          outlined
          block
          class="mt-4"
          @click="back"
        >
          <v-icon class="text-xs pr-2">
            fas fa-angle-double-left
          </v-icon>
          返回
        </v-btn>
        <!-- <div class="flex justify-around mt-2">
            <v-btn text>
              <v-icon size="16" color="#8a8a8a">
                fab fa-weixin
              </v-icon>
            </v-btn>
            <v-divider vertical class="my-2" />
            <v-btn text>
              <v-icon size="16" color="#8a8a8a">
                far fa-envelope
              </v-icon>
            </v-btn>
          </div> -->
      </div>
    </div>
    <transition
      v-for="(item, index) in flyList"
      :key="index"
      appear
      @after-appear="afterEnter"
      @before-appear="beforeEnter"
    >
      <div v-if="item" class="flyDots">
        <img
          :src="dropImage"
          alt=""
        >
      </div>
    </transition>
    <v-dialog
      v-model="keyboardDialog"
      width="700px"
    >
      <v-card>
        <v-card-title>请留下您的联系方式，我们将联系您</v-card-title>
        <div class="px-4 pb-4">
          <v-text-field
            v-model="phone"
            label="手机号"
            readonly
            :rules="phoneRules"
          ></v-text-field>
          <Keyboard v-model="phone" v-actions:asideSubPhone.click class="w-4/5 mx-auto" @confirm="submitPhone()" />
        </div>
      </v-card>
    </v-dialog>
  </VueActions>
</template>

<script>
import { chunk, throttle } from 'lodash'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import Banner from '../components/Banner'
import Footer from '../components/Footer'
import ItemCard from '../components/ItemCard'
import Keyboard from '../components/Keyboard'
import * as events from '../enums/events'
import { getProductAll, getProductParent, insertGoodsPhoneRelation } from '@/api/product'

const TABS = {
  LIST: 0,
  SHOPPING_CART: 1,
}

export default {
  components: {
    Swiper,
    SwiperSlide,
    ItemCard,
    Keyboard,
    Banner,
    Footer,
  },
  data() {
    return {
      TABS,
      deleteConfirm: false,
      keyboardDialog: false,
      loading: false,
      tab: TABS.LIST,
      list: [],
      typeList: [],
      selectedType: undefined,
      selectedMap: {},
      phone: '',
      phoneRules: [
        value => !!value || '请输入手机号',
        value => (value && value.length === 11) || '请输入正确的手机号',
      ],
      flyList: [], // 感兴趣小球
      elLeft: 0, // 小球初始位置
      elTop: 0,
      dropImage: '', // 点击小球获取当前商品图片
      shopDark: false,
      phoneDark: false,
      showBack: false,
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
    selectedType() {
      this.tab = TABS.LIST
      this.getProductAll()
    },
  },
  created() {
    this.showBack = this.$route.query.showBack
    this.getProductParent()
    this.getProductAll()
  },
  activated() {
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
      const active = e.target.closest('.active-btn')
      if (!item) return

      this.elLeft = item.getBoundingClientRect().left
      this.elTop = item.getBoundingClientRect().top

      const productId = item.dataset.productId

      active ? this.toggleItem(productId) : this.toDetail(productId)
    },
    async getProductParent() {
      const res = await getProductParent({
        brandId: sessionStorage.getItem('brandId'),
      })
      this.typeList = [
        {
          key: '',
          typeName: '全部',
          typeImg: 'assets/img/jewellery/all.png',
        },
        ...res.body.resultList,
      ]
    },
    async submitPhone() {
      if (this.phone === '' || this.phone.length !== 11) {
        this.$message.error('请输入正确手机号')
        return false
      }

      const productIds = Object.keys(this.selectedMap).join(',')

      if (!productIds) return this.$message.error('未选择感兴趣内容')

      await insertGoodsPhoneRelation({
        productIds: Object.keys(this.selectedMap).join(','),
        brandId: sessionStorage.getItem('brandId'),
        devId: sessionStorage.getItem('devId'),
        phone: this.phone,
      })
      this.keyboardDialog = false
      this.phone = ''
      this.clearMap()
      this.$message.success('已通知工作人员')
    },
    addItem(id, item) {
      this.$set(this.selectedMap, id, item)
    },
    removeItem(id) {
      this.$delete(this.selectedMap, id)
    },
    clearMap() {
      this.selectedMap = {}
    },
    toggleItem(id, item, event) {
      if (this.selectedMap[id]) {
        this.removeItem(id)
      } else {
        item ??= this.list.find(item => item.productId === +id)
        this.addItem(id, item)
        this.flyList.push(true)
        this.dropImage = item.imgUrl
      }
    },

    // 飞入购物车动画之前
    beforeEnter(el) {
      el.style.transform = `translate3d(${this.elLeft + 50}px, ${this.elTop + 110}px, 0)`
      // 设置透明度
      el.style.opacity = 0
    },

    afterEnter(el) {
      // 获取底部购物车徽标的位置
      const badgePosition = document.getElementById('educationBuycar').getBoundingClientRect()
      // 设置位移
      el.style.transform = `translate3d(${badgePosition.left - 20}px,${badgePosition.top - 60}px,0)`
      // 增加贝塞尔曲线
      el.style.transition = 'transform 1.28s cubic-bezier(0.3, -0.25, 0.7, -0.15)'
      el.style.transition = 'transform 1.28s linear'
      this.flyList = []

      el.style.opacity = 1
      // 监听小球动画结束方法
      el.addEventListener('transitionend', () => {
        el.style.display = 'none'
        this.listenInCart()
      })
      el.addEventListener('webkitAnimationEnd', () => {
        el.style.display = 'none'
        this.listenInCart()
      })
    },

    listenInCart() {
      document.getElementById('educationBuycar').classList.add('moveToCart')
      setTimeout(() => {
      // 500毫秒后移除class
        document.getElementById('educationBuycar').classList.remove('moveToCart')
      }, 500)
    },

    hasItem(id) {
      return !!this.selectedMap[id]
    },
    clearItem() {
      this.selectedMap = {}
    },
    back() {
      this.$router.back()
    },
    toDetail(productId) {
      // 是否已选中，number类型
      const active = +!!this.selectedMap[productId]
      this.$router.push(`/template/education/detail/${productId}?active=${active}`)
      this.$root.$off(events.TOGGLE_ACTIVE, this.toggleItem)
      this.$root.$on(events.TOGGLE_ACTIVE, this.toggleItem)
    },
    changeTab() {
      this.tab = TABS.SHOPPING_CART
      // this.shopDark = true
      // this.phoneDark = false
    },
    changeTabList() {
      this.tab = TABS.LIST
      // this.shopDark = false
      // this.phoneDark = false
    },
    showPhone() {
      this.keyboardDialog = true
      this.phone = ''
      // this.shopDark = false
      // this.phoneDark = true
    },
  },
}
</script>

<style lang="scss">
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
.flyDots{
  position: fixed;
  top: 0px;
  left: 0px;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  z-index: 9999;
  img {
    animation: 1.28s mymove ease-in-out;
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
}
.moveToCart {
  animation: mymoveCar 0.5s ease-in-out;
}

@keyframes mymove {
    0% {
      transform: scale(1);
    }
    25% {
      transform: scale(0.8);
    }
    50% {
      transform: scale(0.6);
    }
    75% {
      transform: scale(0.4);
    }
    100% {
      transform: scale(0.2);
    }
  }
  @keyframes mymoveCar {
  0% {
    transform: scale(1);
  }
  25% {
    transform: scale(0.8);
  }
  50% {
    transform: scale(1.1);
  }
  75% {
    transform: scale(0.9);
  }
  100% {
    transform: scale(1);
  }
}
</style>
