<template>
  <div>
    <Collocation />
    <Drawer position="left" offset="30%">
      123
    </Drawer>
  </div>
</template>

<script>
import Collocation from './Collocation.vue'
import Drawer from '@/components/commons/Drawer'

export default {
  components: {
    Drawer,
    Collocation,
  },
}
</script>
