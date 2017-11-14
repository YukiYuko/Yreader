/**
 * Created by Windows10 on 2017/11/14.
 */
import {
  SET_CURRENT_SOURCE
} from './mutationsType'

export default {
  [SET_CURRENT_SOURCE] (state, source) {
    state.source = source
  }
}
