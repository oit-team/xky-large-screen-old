import { post } from './index'
import API_SERVICE from './API_SERVICE'

/**
 * 获取商品列表
 * @param {object} params
 */
export function getProductList(params) {
  return post(`${API_SERVICE.LIVE_BROADCAST}/adverts/getCollocationList`, params)
}
