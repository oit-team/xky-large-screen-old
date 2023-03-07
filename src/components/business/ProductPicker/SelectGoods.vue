<template>
  <!--    试衣间 -->
  <Drawer ref="drawer" position="left" :offset="`${offset}%`" class="rounded-r-3xl drawerW2 z-61">
    <div>
      <div class="p-6 grid grid-cols-5 gap-6 min-h-xs">
        <div
          v-for="(item, index) in goodsList"
          :key="index"
        >
          <OptionsItem :item-info="item" :size="120" :show-right-btn="true" />
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
            :disabled="goodsList.length === 0"
            class="ma-2 mr-8"
          >
            <vc-icon size="18" color="#000">
              fas fa-trash-alt
            </vc-icon>
          </v-btn>
          <v-btn
            class="text-base"
            large
            :disabled="goodsList.length === 0"
            @click="$emit('dialog-open')"
          >
            <vc-icon size="18" color="#000" left>
              fas fa-volume-up
            </vc-icon>
            通知导购
          </v-btn>
        </div>
      </div>
    </div>
  </Drawer>
</template>

<script>
import OptionsItem from '@/components/business/ProductPicker/OptionsItem'
import Drawer from '@/components/commons/Drawer'

export default {
  components: {
    Drawer,
    OptionsItem,
  },
  props: {
    goodsList: Array,
    offset: Number,
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
    // async submit() {
    //   const list = this.$store.state.shoppingCart.list
    //   const newList = list.reduce((def, next) => {
    //     def.push(next.id)
    //     return def
    //   }, [])
    //   if (newList.length === 0) return false
    //   const res = await addFittingRecord({
    //     brandId: localStorage.getItem('brandId'),
    //     abilityId: localStorage.getItem('devId'),
    //     goodsId: newList.join(','),
    //   })
    //   if (res.head.status === 0) {
    //     Message.success('呼叫导购员成功，请耐心等待。')
    //   }
    //   this.close()
    //   this.clear()
    // },
  },
}
</script>

<style scoped>
.drawerW2{
  width: 75vw;
}
</style>
