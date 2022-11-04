import API_SERVICE from './API_SERVICE'
import { post } from './index'

/**
 * 获取商品列表
 * @param {object} params
 */
export function getProductList(params) {
  return post(`${API_SERVICE.LIVE_BROADCAST}/adverts/getCollocationList`, params)
}

/**
 * 查询商品类别
 * @param params
 */
export function getCategory(params) {
  return post(`${API_SERVICE.LIVE_BROADCAST}/adverts/getStyleType`, params)
    .then(res => res.body.resultList)
}

/**
 * 查询轮播广告
 * @param {string} devId 设备ID
 */
export function getAdvertsInfo(devId) {
  return post(`${API_SERVICE.LIVE_BROADCAST}/adverts/getAdvertsInfo`, { devId })
}

/**
 * 试衣间添加商品
 * @param {string} devId 设备ID
 */
export function addFittingRecord(params) {
  return post(`${API_SERVICE.LIVE_BROADCAST}/device/addFittingRecord`, params)
}
