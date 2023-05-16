import Vue from 'vue'
import VueRouter, { START_LOCATION } from 'vue-router'

Vue.use(VueRouter)

const routes = [
  /**
   * 服装
   */
  {
    path: '/template/clothing',
    component: () => import('@/templates/clothing/views/Home.vue'),
    meta: {
      cache: true,
    },
  },
  {
    path: '/template/clothing/detail/:productId',
    component: () => import('@/templates/clothing/views/Detail.vue'),
  },
  /**
   * 珠宝
   */
  {
    path: '/template/jewellery',
    component: () => import('@/templates/jewellery/views/Home.vue'),
    meta: {
      cache: true,
    },
  },
  {
    path: '/template/jewellery/detail/:productId',
    component: () => import('@/templates/jewellery/views/Detail.vue'),
  },
  /**
   * 健身
   */
  {
    path: '/template/education',
    component: () => import('@/templates/education/views/Home.vue'),
    meta: {
      cache: false,
    },
  },
  {
    path: '/template/education/detail/:productId',
    component: () => import('@/templates/education/views/Detail.vue'),
  },
  /**
   * 餐饮
   */
  {
    path: '/template/catering',
    component: () => import('@/templates/catering/views/Home.vue'),
    meta: {
      cache: false,
    },
  },
  {
    path: '/template/catering/detail/:productId',
    component: () => import('@/templates/catering/views/Detail.vue'),
  },

  /**
   * 商场
   */
  {
    path: '/template/suppermarket',
    component: () => import('@/templates/suppermarket/views/Home.vue'),
    meta: {
      cache: false,
    },
  },

  /**
   * 商场互动
   */
  {
    path: '/template/education',
    component: () => import('@/templates/education/views/Home.vue'),
  },
  {
    path: '/carousel',
    name: 'Carousel',
    component: () => import('@/views/Carousel.vue'),
    meta: {
      cache: true,
    },
  },
  {
    path: '/video',
    name: 'Video',
    component: () => import('@/views/Video.vue'),
  },
  {
    path: '/lucky',
    name: 'Lucky',
    component: () => import('@/views/Lucky.vue'),
  },
  {
    path: '/recommend',
    name: 'Recommend',
    component: () => import('@/views/Recommend.vue'),
  },
]

const router = new VueRouter({
  routes,
})

let homePage = ''
let timer
const DURATION = 1 * 60 * 1000

router.afterEach((to, from) => {
  if (from === START_LOCATION)
    homePage = to.path

  clearTimeout(timer)
  if (to.path !== homePage) {
    timer = setTimeout(() => {
      router.push(homePage)
    }, DURATION)
  }
})

export default router
