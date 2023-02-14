import Vue from 'vue'
import VueRouter from 'vue-router'

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
      cache: true,
    },
  },
  {
    path: '/template/education/detail/:productId',
    component: () => import('@/templates/education/views/Detail.vue'),
  },
  /**
   * 教培
   */
  // {
  //   path: '/template/training',
  //   component: () => import('@/templates/training/views/Home.vue'),
  //   meta: {
  //     cache: true,
  //   },
  // },
  // {
  //   path: '/template/training/detail/:productId',
  //   component: () => import('@/templates/training/views/Detail.vue'),
  // },
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

export default router
