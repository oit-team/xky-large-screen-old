<template>
  <footer class="bg-black flex justify-center items-center">
    <div class="text-white">
      <div class="py-2 text-xl font-semibold">
        {{ brandInfo.brandName }}
      </div>
      <div class="text-sm flex items-center">
        <div>
          <vc-img
            width="120"
            height="120"
            :src="brandInfo.brandLogo"
            class="border-white border-1 border-solid mr-2"
          ></vc-img>
        </div>
        <div>
          <p>
            联系电话：{{ brandInfo.telepHone }}
          </p>
          <p>
            联系地址：{{ brandInfo.address }}
          </p>
          <div class="overFlow-3">
            文化：{{ brandInfo.introduce }}
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {

}
</script>
