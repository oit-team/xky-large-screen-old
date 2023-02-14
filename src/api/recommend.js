import { post } from './index'

export function getRecommendStyle(params) {
  return post('/gdy/liveBroadcast/adverts/getRecommendStyle', params)
}

export function getRecommendColl(params) {
  return post('/gdy/liveBroadcast/adverts/getRecommendColl', params, { tips: false })
}
