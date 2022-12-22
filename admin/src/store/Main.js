import { observable, action, runInAction } from 'mobx'
import BaseActions from 'component/BaseActions'
import axios from 'axios'
import { message } from 'antd'
import * as urls from 'constant/apis'
import jwt from 'util/token.js'

class Main extends BaseActions {
  @observable
  currUser = undefined


  @action
  async login(params) {
    const r = await this.post(urls.API_USER_LOGIN, params)
    if (r.code=== 200) {
      jwt.saveToken(r.token)
      this.currUser = r.data
    }
    return r
  }

  @action
  logout() {
    jwt.removeToken()
    this.currUser = null
  }

  @action
  async getCarls() {
    return await this.get(urls.API_GET_CARL)
  }
  async addCarl(params) {
    return await this.post(urls.API_ADD_CARL,params)
  }
  async delCarl(params) {
    return await this.post(urls.API_DEL_CARL,params)
  }


  @action
  async getNews() {
    return await this.get(urls.API_GET_NEWS)
  }
  async addNews(params) {
    return await this.post(urls.API_ADD_NEWS,params)
  }
  async delNews(params) {
    return await this.post(urls.API_DEL_NEWS,params)
  }

  @action
  async getProj() {
    return await this.get(urls.API_GET_PROJ)
  }
  async addProj(params) {
    return await this.post(urls.API_ADD_PROJ,params)
  }
  async delProj(params) {
    return await this.post(urls.API_DEL_PROJ,params)
  }

  @action
  async getDesi() {
    return await this.get(urls.API_GET_DESI)
  }
  async saveDesi(params) {
    return await this.post(urls.API_SAV_DESI,params)
  }
  async delDesi(params) {
    return await this.post(urls.API_DEL_DESI,params)
  }

  @action
  async getMsg() {
    return await this.get(urls.API_GET_MSG)
  }
  async delMsg(params) {
    return await this.post(urls.API_DEL_MSG,params)
  }


  


  @action
  async upload(params) {
    return await this.post(urls.API_UPLOAD,params)
  }



}

export default new Main()