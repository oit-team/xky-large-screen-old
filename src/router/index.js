import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/template/clothing',
    component: () => import('@/templates/clothing/views/Home.vue'),
    meta: {
      cache: true,
    },
  },
  {
    path: '/template/jewellery',
    component: () => import('@/templates/jewellery/views/Home.vue'),
    meta: {
      cache: true,
    },
  },
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
]

const router = new VueRouter({
  routes,
})

export default router
