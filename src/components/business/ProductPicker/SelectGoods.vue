<template>
  <!--    显示试衣间 -->
  <Drawer ref="drawer" position="left" offset="47%" class="rounded-r-3xl drawerW2 z-61">
    <div>
      <div class="p-6 grid grid-cols-5 gap-6 min-h-xs">
        <div
          v-for="item in goodsList"
          :key="item.id"
        >
          <OptionsItem :item-info="item" :size="120" />
        </div>
      </div>
      <v-divider class="!border-current"></v-divider>
      <div class="p-6 h-7rem flex items-center justify-between">
        <div class="text-base">
          共 {{ goodsList.length }}/15 件
        </div>
        <div @click="clear">
          <v-btn
            color="blue-grey"
            large
            class="ma-2 mr-8"
          >
            <vc-icon size="18" color="#000">
              fas fa-trash-alt
            </vc-icon>
          </v-btn>
          <v-btn
            class="text-base"
            large
            @click="submit"
          >
            <vc-icon size="18" color="#000" left>
              fas fa-volume-up
            </vc-icon>
            我要试穿
          </v-btn>
        </div>
      </div>
    </div>
  </Drawer>
</template>

<script>
import { addFittingRecord } from '@/api/product'
import OptionsItem from '@/components/business/ProductPicker/OptionsItem'
import Drawer from '@/components/commons/Drawer'
import Message from '@/components/commons/Message'

export default {
  components: {
    Drawer,
    OptionsItem,
  },
  props: {
    goodsList: Array,
  },
  methods: {
    open() {
      this.$refs.drawer.open()
    },
    close() {
      this.$refs.drawer.close()
    },
    clear() {
      this.$store.commit('shoppingCart/clear')
    },
    async submit() {
      const list = this.$store.state.shoppingCart.list
      const newList = list.reduce((def, next) => {
        def.push(next.id)
        return def
      }, [])
      if (newList.length === 0) return false
      const res = await addFittingRecord({
        brandId: sessionStorage.getItem('brandId'),
        abilityId: sessionStorage.getItem('devId'),
        goodsId: newList.join(','),
      })
      if (res.head.status === 0) {
        Message('添加试衣成功，已通知导购，请稍候')
      }
    },
  },
}
</script>

<style scoped>
.drawerW2{
  width: 75vw;
}
</style>
