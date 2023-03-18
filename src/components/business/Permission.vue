<template>
  <v-overlay
    :value="dialog"
    color="black"
    z-index="100"
    @click="close"
  >
    <div class="flex items-center justify-center">
      <div class="w-[50vw] bg-black bg-opacity-50 rounded-lg py-6 text-xl leading-loose -mt-[30vh]">
        <div class="text-center pb-6 border-b-1 border-white text-4xl">
          {{ title }}
        </div>
        <div class="p-4 pt-8 text-3xl h-10rem text-center tracking-widest leading-normal" v-html="content">
        </div>
        <div class="text-center p-4 flex justify-around">
          <v-btn
            elevation="2"
            outlined
            dark
            large
            class="text-xl"
            @click="accredit = false"
          >
            <vc-icon
              class="mr-2 font-600"
              color="#ef4444"
            >
              x
            </vc-icon>
            <span class="text-[#ef4444]">拒绝</span>
          </v-btn>
          <v-btn
            elevation="2"
            outlined
            dark
            large
            class="text-xl"
            @click="submit"
          >
            <vc-icon
              class="mr-2 font-600 "
            >
              fas fa-check
            </vc-icon>
            <span class="">同意</span>
          </v-btn>
        </div>
      </div>
    </div>
  </v-overlay>
</template>

<script>
export default {
  props: {
    title: String,
    content: String,
  },
  data: () => ({
    dialog: false,
  }),

  methods: {
    open() {
      this.dialog = true
      this.timer = setTimeout(() => {
        this.dialog = false
      }, 60000)
    },
    close() {
      clearTimeout(this.timer)
      delete this.timer
      this.dialog = false
    },
    submit() {
      this.close()
      this.$emit('accept')
    },
  },
}
</script>
