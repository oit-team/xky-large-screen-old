<template>
  <footer class="h-20vh bg-black grid place-content-center text-white">
    <div class="flex items-center">
      <img src="https://picsum.photos/150" class="w-180px h-180px">
      <div class="ml-4 flex flex-col gap-2">
        <div class="text-3xl">
          上海奥意特信息科技有限公司
        </div>
        <div>021-58978973</div>
        <div>上海浦东新区浦三路3058号 2楼255室（长青企业广场）</div>
        <div>专业从事软件定制研发以及IT服务</div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  props: {
    info: Object,
  },
}
</script>
