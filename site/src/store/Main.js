import { observable, action, runInAction } from 'mobx'
import BaseActions from 'component/BaseActions'
import axios from 'axios'
import { message } from 'antd'
import * as urls from '@constant/urls'
import jwt from 'util/token.js'

class Main extends BaseActions {
  @observable
  currUser = undefined

  @action
  async getCarls() {
    return await this.get(urls.API_GET_CARL)
  }

  @action
  async getNews() {
    return await this.get(urls.API_GET_NEWS)
  }

  @action
  async getWeNews() {
    return await this.get(urls.API_GET_WENEWS)
  }

  @action
  async getProj() {
    return await this.get(urls.API_GET_PROJ)
  }

  @action
  async getDesi() {
    return await this.get(urls.API_GET_DESI)
  }

  @action
  async getHonr() {
    return await this.get(urls.API_GET_HONR)
  }
  



}

export default new Main()