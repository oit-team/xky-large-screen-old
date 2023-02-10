<template>
  <Drawer ref="drawer" position="right" offset="47%" class="rounded-l-3xl">
    <div v-if="rightList?.length > 0" class="w-full p-3 pb-0 box-border">
      <div v-for="(item, index) in rightList" :key="item.id" @click="onClick(item, index)">
        <OptionsItem
          :item-info="item"
          :size="100"
          :click-item="index === clickIndex"
          @lock="$emit('lock')"
        />
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
    rightList: Array,
  },
  data() {
    return {
      clickIndex: null,
      showBorder: false,
    }
  },
  methods: {
    onClick(item, index) {
      this.$emit('show-info', item)
      this.clickIndex = index
      this.showBorder = false
    },
    isShow() {
      this.$router.push({
        name: 'Lucky',
      })
    },
    reset() {
      this.clickIndex = null
      this.showBorder = false
    },
  },
}
</script>

<style scoped>
.borders {
  box-shadow: 0 2px 12px 0 #5e8cfd;
}
</style>
