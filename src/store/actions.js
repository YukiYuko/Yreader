/**
 * Created by Windows10 on 2017/11/14.
 */
import API from '../api/index'
import {
  SET_CURRENT_SOURCE
} from './mutationsType'

export default {
  // 设置小说默认源
  setResource ({commit}, id) {
    API.getGenuineSource(id).then((res) => commit(SET_CURRENT_SOURCE, res.data.data[0]._id))
  },
  // 根据源获取小说章节
  getChapters ({commit}, id) {
    return API.getChapters(id)
  }
}
