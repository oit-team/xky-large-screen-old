<template>
  <v-app>
    <v-main>
      <!-- 将页面设置为9比16的尺寸 -->
      <v-responsive :aspect-ratio="9 / 16">
        <keep-alive>
          <v-fade-transition v-if="$route.meta?.cache" origin="center center" leave-absolute>
            <keep-alive :max="20">
              <router-view :key="$route.fullPath" />
            </keep-alive>
          </v-fade-transition>
        </keep-alive>
        <v-fade-transition v-if="!$route.meta?.cache" origin="center center" leave-absolute>
          <router-view />
        </v-fade-transition>
      </v-responsive>
    </v-main>
  </v-app>
</template>

<script>
import { throttle } from 'lodash'
import { pageClick } from './api/frame'

export default {
  name: 'App',

  watch: {
    $route: {
      handler: 'initParams',
      immediate: true,
    },
  },

  created() {
    // 禁用浏览器长按菜单
    window.addEventListener('contextmenu', e => e.preventDefault())

    const pageClickThrottled = throttle(() => {
      pageClick({
        devId: sessionStorage.devId,
        brandId: sessionStorage.brandId,
      })
    }, 1000)
    // 页面产生交互通知
    window.addEventListener('click', pageClickThrottled, { passive: true })
    window.addEventListener('touchstart', pageClickThrottled, { passive: true })
  },

  methods: {
    initParams() {
      // 从url中获取参数
      const queryObject = new URLSearchParams(location.href.split('?')[1])
      const query = {}

      for (const key of queryObject.keys())
        query[key] = queryObject.get(key)

      // 保存到sessionStorage
      query.token && sessionStorage.setItem('token', query.token)
      query.devId && sessionStorage.setItem('devId', query.devId)
      query.brandId && sessionStorage.setItem('brandId', query.brandId)
    },
  },
}
</script>
