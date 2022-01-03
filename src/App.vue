<template>
  <v-app>
    <v-main>
      <!-- 将页面设置为9比16的尺寸 -->
      <v-responsive :aspect-ratio="9/16">
        <router-view/>
      </v-responsive>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
}
</script>
