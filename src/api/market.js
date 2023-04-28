import { post } from './index'

/**
 * 查询楼层引导图
 */
export function getNavigationMap(params) {
  return post('/liveBroadcast/home/getNavigationMap', params)
}

/**
 * 查询分类菜单
 */
export function getIndustryCategories(params) {
  return post('/liveBroadcast/home/getIndustryCategories', params)
}

/**
 * 查询商场列表
 */
export function getShopsList(params) {
  return post('/liveBroadcast/home/getShops', params)
}
