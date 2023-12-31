<template>
  <div class="grid place-content-center h-full bg-gray-100 lucky-wrap">
    <div class="flex flex-col gap-10">
      <div class="w-full flex justify-center">
        <div class="page-top w-[90%] h-200px">
        </div>
      </div>
      <div class="flex justify-center max-w-80vw overflow-x-auto min-h-10">
        <v-item-group v-model="activityId" mandatory class="flex gap-5">
          <v-item v-slot="{ active, toggle }" :value="0">
            <v-btn
              x-large
              color="white"
              class="h-auto"
              :outlined="!active"
              @click="toggle"
            >
              每日抽奖
            </v-btn>
          </v-item>
          <v-item v-for="item of activities" v-slot="{ active, toggle }" :key="item" :value="item.id">
            <v-btn
              x-large
              color="white"
              class="h-auto border border-solid"
              :outlined="!active"
              @click="toggle"
            >
              <span class="max-w-16em whitespace-normal">{{ item.activityName }}</span>
            </v-btn>
          </v-item>
        </v-item-group>
      </div>
      <div class="rounded-3xl  relative border_bg">
        <v-btn
          class="absolute -right-14 -top-14"
          fab
          dark
          color="error"
          @click="back"
        >
          <v-icon>
            fa fa-times
          </v-icon>
        </v-btn>
        <LuckyGrid ref="lucky" class="rounded-2xl" v-bind="config" @start="start" @end="lucky"></LuckyGrid>
        <!--          text-gray-500 -->
        <div class="text-xl text-white text-center py-3">
          ·抽奖即同意活动规则·
        </div>
      </div>

      <div class="text-center text-xl">
        已有<span class="text-white"> {{ countInfo.raffleCount || 0 }} </span>人参与抽奖，现奖池奖品数：<span class="text-white">{{ countInfo.stockCount || 0 }}</span>
      </div>

      <div class="rounded-50px py-6 px-12 w-70vw mx-auto bg-white shadow-lg">
        <div class="text-2xl text-center pb-6">
          抽奖规则
        </div>
        <ul class="text-xl space-y-3">
          <li class="list-disc">
            100%中奖机率
          </li>
          <li class="list-disc">
            中奖后通过微信扫码领取奖品，同时可置换相同价格的奖品
          </li>
          <li class="list-disc">
            奖品会存放在微信小程序中，可通过指定的商家进行消费核销
          </li>
          <li class="list-disc">
            每日24:00当日奖池刷新
          </li>
        </ul>
      </div>
    </div>

    <v-dialog
      v-model="luckyDialog"
      persistent
      width="60vw"
      content-class="-mt-20"
    >
      <v-card
        v-if="luckyLoading"
        color="success"
        dark
      >
        <v-card-text class="pt-3 text-center">
          小易正在从仓库拿奖...
          <v-progress-linear
            indeterminate
            height="0.5vw"
            color="white"
            class="mb-0 mt-2"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
      <v-card v-else class="border-none">
        <v-icon class="absolute right-4 top-3 text-4xl" @click="luckyDialog = false">
          fas fa-times
        </v-icon>
        <div class="text-4xl font-bold pt-6 text-center mx-60px">
          {{ jackpotInfo.vouchersName }}
        </div>
        <div class="flex my-5">
          <v-img :src="jackpotInfo.imgUrl" class="w-120px h-120px mx-10 flex-grow-0 bg-gray-100 rounded-lg border-2 border-gary-100"></v-img>
          <div class="text-gray-500 text-sm leading-tight space-y-2">
            <div v-if="jackpotInfo.effectiveType === 0">
              领奖后{{ jackpotInfo.effectiveDay }}天有效
            </div>
            <div v-if="jackpotInfo.effectiveType === 1">
              {{ new Date(jackpotInfo.effectiveStart).toLocaleString() }}-{{ new Date(jackpotInfo.effectiveEnd).toLocaleString() }}
            </div>
            <div>所属商家：{{ jackpotInfo.shopName }}</div>
            <div>价格：<span class="text-red-500">￥{{ jackpotInfo.jackpotPrice }}</span></div>
            <div class="line">
              备注：{{ jackpotInfo.jackpotNote || '无' }}
            </div>
          </div>
        </div>
        <div class="border-t border-dashed"></div>
        <div class="text-center mb-3">
          <div class="aspect-square w-400px mx-auto relative">
            <v-img :src="code"></v-img>
            <div v-if="!countdown" class="bg-white absolute inset-5 bg-opacity-80 text-red-500 text-6xl font-bold grid place-content-center">
              已失效
            </div>
          </div>
          <div v-if="countdown">
            领奖倒计时：<span class="text-red-500">{{ countdown }}秒</span>
          </div>
          <div v-else class="text-red-500">
            领奖超时，请重新抽奖
          </div>
          <div class="text-gray-500">
            请通过微信扫一扫领取奖品
          </div>
        </div>
        <div class="border-t border-dashed"></div>
        <div v-if="exchangeList.length" class="pb-4">
          <div class="grid grid-cols-4 px-3 py-6 gap-y-5">
            <div v-for="item of exchangeList" :key="item.jackpotId" class="flex flex-col items-center gap-2" @click="getResetPrizeInfo(item.jackpotId)">
              <v-img class="w-100px h-100px bg-gray-100 rounded-lg" :src="item.imgUrl"></v-img>
              <v-btn class="h-26px" color="#00b0f0" dark>
                置换
              </v-btn>
            </div>
          </div>
          <div class="text-center py-2" @click="getJackpotInfoList()">
            <v-icon class="mr-2">
              fas fa-sync-alt
            </v-icon>
            <span>{{ exchangeLoading ? '正在刷新' : '换一批' }}</span>
          </div>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { LuckyGrid } from '@lucky-canvas/vue'
import {
  getAwardInfo,
  getAwardInfoQrCode,
  getJackpotCount,
  getJackpotInfoList,
  getLuckyDrawConfig,
  getResetPrizeInfo,
} from '@/api/lucky'
import { post } from '@/api'

let timer

export default {
  components: {
    LuckyGrid,
  },

  data: () => ({
    prizes: [],
    luckyDialog: false,
    luckyLoading: false,
    exchangeLoading: false,
    jackpotInfo: {},
    raffleRecord: {},
    luckyResult: {},
    countInfo: {},
    exchangeList: [],
    code: '',
    countdown: 0,
    optionalList: [],
    oneTimer: null,
    activities: [],
    activityId: null,
  }),

  computed: {
    config() {
      return {
        width: '70vw',
        height: '70vw',
        prizes: this.activityId ? this.activityPrizes : this.prizes,
        blocks: [
          {
            padding: '10px',
          },
        ],
        buttons: [
          {
            x: 1,
            y: 1,
            background: 'rgba(0,0,0,0)',
            imgs: [{
              src: '/assets/prize/start.svg',
              width: '100%',
              height: '100%',
            }],
            fonts: [{
              text: '开 始\n抽 奖',
              fontColor: '#ffffff',
              fontSize: '5vw',
              wordWrap: false,
              lineHeight: '6vw',
              top: '10%',
            }],
          },
        ],
        defaultConfig: {
          gutter: '0px',
        },
        activeStyle: {
          background: '#eec578',
        },
      }
    },
    activityPrizes() {
      const pos = [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 2, y: 0 },
        { x: 2, y: 1 },
        { x: 2, y: 2 },
        { x: 1, y: 2 },
        { x: 0, y: 2 },
        { x: 0, y: 1 },
      ]

      return pos.map((posItem, index) => {
        return {
          ...posItem,
          data: index,
          borderRadius: '10px',
          imgs: [
            {
              src: '/assets/prize/box.png',
              top: '5%',
              width: '80%',
              height: '80%',
            },
          ],
        }
      })
    },
  },

  created() {
    this.getLuckyDrawConfig()
    this.getJackpotCount()
    this.getActivities()
    setInterval(this.getJackpotCount, 30000)
  },

  beforeDestroy() {
    clearTimeout(this.oneTimer)
  },

  methods: {
    async lucky({ data }) {
      if (!data) return this.$message.error('暂无奖品，请联系商家')

      this.luckyDialog = true
      this.luckyLoading = true
      this.luckyResult = data

      const promise = async () => {
        if (this.activityId) {
          const res = await post('/jackpot/jackpotInfo/getJackPotInfoForActivity', {
            devId: sessionStorage.getItem('devId'),
            activityId: this.activityId,
          })
          this.jackpotInfo = res.body.jackpotInfo
          this.raffleRecord = res.body.raffleRecord
          await this.getAwardInfoQrCode(res.body.content)
          this.startCountdown(this.jackpotInfo.validTime * 60)
        } else {
          const res = await getAwardInfo({
            devId: sessionStorage.getItem('devId'),
            startNum: data.startNum,
            endNum: data.endNum,
          })
          this.jackpotInfo = res.body.jackpotInfo
          this.raffleRecord = res.body.raffleRecord
          await Promise.all([this.getAwardInfoQrCode(res.body.content), this.getJackpotInfoList()])
          this.startCountdown(this.jackpotInfo.validTime * 60)
        }
      }

      promise()
        .catch(() => {
          this.luckyDialog = false
        })
        .finally(() => {
          this.luckyLoading = false
        })
    },
    start() {
      if (!this.activityId) {
        const check = this.prizes.every(item => item.data.countNum > 0)
        if (!check)
          return this.$message.error('暂无奖品，请联系商家')
      }
      this.$refs.lucky.play()
      setTimeout(() => {
        // 假设后端返回的中奖索引是0
        const index = Math.floor(Math.random() * 8)
        // 调用stop停止旋转并传递中奖索引
        this.$refs.lucky.stop(index)
      }, 3000)
    },
    async getLuckyDrawConfig() {
      this.setTimer()
      const pos = [
        { x: 0, y: 0 },
        { x: 1, y: 0 },
        { x: 2, y: 0 },
        { x: 2, y: 1 },
        { x: 2, y: 2 },
        { x: 1, y: 2 },
        { x: 0, y: 2 },
        { x: 0, y: 1 },
      ]
      const res = await getLuckyDrawConfig({
        devId: sessionStorage.getItem('devId'),
      })
      const result = res.body.resultList
      this.prizes = pos.map((posItem, index) => {
        const item = result[index]
        return {
          ...posItem,
          data: item,
          borderRadius: '10px',
          imgs: [
            {
              src: '/assets/prize/border.svg',
              width: '100%',
              height: '100%',
              activeSrc: '/assets/prize/border-active.svg',
            },
            {
              src: '/assets/prize/bg.svg',
              top: '11%',
              width: '70%',
            },
          ],
          fonts: [
            {
              text: item ? `${item.startNum}-${item.endNum}元区` : '暂无奖品',
              fontSize: '2.2vw',
              top: '25%',
            },
            {
              text: '奖品包',
              fontSize: '2vw',
              fontColor: '#ffffff',
              top: '55%',
            },
          ],
        }
      })
      // this.prizes.forEach((item, index) => {
      //   if (item.data.countNum > 0) this.optionalList.push(index)
      // })
    },
    async getAwardInfoQrCode(content) {
      const code = await getAwardInfoQrCode({
        content,
      })
      this.code = URL.createObjectURL(code)
    },
    async getResetPrizeInfo(jackpotId) {
      const res = await getResetPrizeInfo({
        recordId: this.raffleRecord.recordId,
        startNum: this.luckyResult.startNum,
        endNum: this.luckyResult.endNum,
        jackpotId,
      })
      this.jackpotInfo = res.body.jackpotInfo
      await this.getAwardInfoQrCode(res.body.content)
      this.startCountdown(this.jackpotInfo.validTime * 60)
    },
    async getJackpotInfoList() {
      if (this.exchangeLoading) return
      this.exchangeLoading = true
      const res = await getJackpotInfoList({
        recordId: this.raffleRecord.recordId,
        startNum: this.luckyResult.startNum,
        endNum: this.luckyResult.endNum,
      }).finally(() => {
        this.exchangeLoading = false
      })
      this.exchangeList = res.body.result
    },
    startCountdown(countdown) {
      clearTimeout(timer)
      this.countdown = countdown
      timer = setTimeout(() => this.countdown > 0 && this.startCountdown(this.countdown - 1), 1000)
    },
    async getJackpotCount() {
      const res = await getJackpotCount({
        devId: sessionStorage.getItem('devId'),
      })
      this.countInfo = res.body
    },
    back() {
      clearTimeout(this.oneTimer)
      this.$router.back()
    },
    setTimer() {
      // clearTimeout(this.oneTimer)
      // this.oneTimer = setTimeout(() => {
      //   this.$router.back()
      // }, 60000)
    },
    async getActivities() {
      const res = await post('/jackpot/jackpotInfo/getActivities', {
        devId: sessionStorage.getItem('devId'),
      })
      this.activities = res.body.activities
    },
  },
}
</script>

<style lang="scss" scoped>
.lucky-wrap {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: center / cover no-repeat url("/assets/img/lucky/lucky-bgi.jpg");
}
.page-top{
  background: center / cover no-repeat url("/assets/img/lucky/lucky-top.png");
  background-size: 660px 180px;
}
.border_bg{
  //background: center / cover no-repeat url("/assets/img/lucky/border_bg.svg");
  border-image-source: url("/assets/img/lucky/border_bg.svg");
  border-width: 60px;
  border-image-slice: 22 fill;
}
</style>
