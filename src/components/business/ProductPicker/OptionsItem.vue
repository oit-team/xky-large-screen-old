<template>
  <div class="goodsItem flex flex-col items-center leading-relaxed relative w-160px">
    <v-img
      :src="itemInfo.imgUrl"
      class="rounded-xl bg-white"
      :class="clickItem ? 'boxShadow' : ''"
      :light="true"
      :width="size"
      :height="size"
    ></v-img>
    <v-img
      v-if="isFitting && checkType()"
      v-actions:addList.click
      width="25"
      height="25"
      class="btn absolute -top-2 -right-2"
      src="@/asset/image/plus.png"
      @click.stop="addList()"
    ></v-img>
    <v-img
      v-if="isFitting && !checkType()"
      v-actions:delList.click
      class="btn absolute -top-2 -right-2"
      width="25"
      height="25"
      src="@/asset/image/minus.png"
      @click.stop="delList()"
    ></v-img>
    <div v-if="isFitting" class="text-sm text-center w-full">
      <div class="my-1 truncate">
        {{ itemInfo.productNo }}
      </div>
      <div class="mb-1 truncate">
        ￥{{ itemInfo.productPrice }}
      </div>
    </div>
    <div v-else class="text-sm text-center w-full">
      <div v-for="(item, index) in publicInfoList" :key="index" class="my-1 text-center w-full">
        <div class="truncate">
          <span v-if="item === 'productPrice'">￥</span>
          {{ itemInfo.publicInfo[item] }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    itemInfo: Object,
    size: Number,
    clickItem: Boolean,
    isFitting: Boolean,
    detailDialog: String, // 当前行业字段
  },
  computed: {
    publicInfoList() {
      return Object.keys(this.itemInfo.publicInfo)
    },
  },
  methods: {
    addList() {
      if (this.$store.state.shoppingCart.list.length === 15) return false
      this.$store.commit('shoppingCart/add', this.itemInfo)
      this.$emit('lock')
    },
    delList() {
      this.$store.commit('shoppingCart/remove', this.itemInfo)
      this.$emit('lock')
    },
    checkType() {
      return !this.$store.state.shoppingCart.list.some(e => e.id === this.itemInfo.id)
    },
  },
}
</script>

<style scoped>
.boxShadow{
  box-shadow: 0 2px 12px 0 #5e8cfd;
}

.btn {
  border-radius: 50%;
}
</style>
