<template>
  <v-app>
    <v-main>
      <!-- 将页面设置为9比16的尺寸 -->
      <v-responsive :aspect-ratio="9/16">
        <v-fade-transition origin="center center" leave-absolute>
          <keep-alive>
            <router-view/>
          </keep-alive>
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

  created() {
    // 从url中获取参数
    const queryObject = new URLSearchParams(location.href.split('?')[1])
    const query = {}
    // eslint-disable-next-line no-restricted-syntax
    for (const key of queryObject.keys()) {
      query[key] = queryObject.get(key)
    }

    // 保存到localStorage
    localStorage.setItem('token', query.token ?? '')
    localStorage.setItem('devId', query.devId ?? '')
    localStorage.setItem('brandId', query.brandId ?? '')

    // 禁用浏览器长按菜单
    window.addEventListener('contextmenu', e => e.preventDefault())

    const pageClickThrottled = throttle(() => {
      pageClick({
        devId: query.devId,
        brandId: query.brandId,
      })
    }, 1000)
    // 页面产生交互通知
    window.addEventListener('click', pageClickThrottled, { passive: true })
    window.addEventListener('touchstart', pageClickThrottled, { passive: true })
  },
}
</script>
