import { observable, action, runInAction } from 'mobx'
import BaseActions from 'component/BaseActions'
import axios from 'axios'
import { message } from 'antd'
class Data extends BaseActions {

  moocList = []
  cardschd = null

  // @action
  // async getDataList() {
  //   return await this.get(urls.API_DATA_LIST)
  // }

  // @action
  // async getDataDetail(params) {
  //   return await this.get(urls.API_DATA_DETAIL,params)
  // }


}

 



export default new Data()
