import React from 'react'
import dayjs from 'dayjs'
import { inject } from 'mobx-react'
import { Drawer, Input, Button, Spin, message } from 'antd'
import { API_SERVER } from '@constant/apis'
import icon_add from '../../icon/icon_add.svg'
import icon_save from '../../icon/icon_save.svg'
import {getListByPage, fileToBlob} from '../../util/fn'
import style from './style.less';

const PAGE_SIZE = 10

@inject('mainStore')
class Carl extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      cur: 1,
      list: [],
      visible: false,
      cimg: null,
      cname:null,
    }
  }

  async componentDidMount() {
    let currUser = this.props.mainStore.currUser
    if ((typeof(currUser) === 'undefined')||(currUser === null)) {
      this.props.history.push("/login")
    }else{
      let {cur} = this.state
      this.setState({ loading: true })
      let r = await this.props.mainStore.getCarls()
      this.setState({loading: false, list: r.carl })
      console.log(r)
    }
  }


  doDel=async (id)=>{
    let {cur} = this.state
    let params = { id:id}
    this.setState({ loading: true })
    let r = await this.props.mainStore.delCarl(params)
    this.setState({loading: false, list: r.carl })
    message.info('删除轮播图成功！')
  }

  doAdd=async ()=>{
    let {cur,cname,cimg} = this.state
    if ((cname.trim()!=='')&&(cname!==null)&&(cimg!==null)) {
      let parmas = { name:cname, img:cimg }
      this.setState({ loading: true })
      let r = await this.props.mainStore.addCarl(parmas)
      this.setState({loading: false, visible:false, list: r.carl })
      message.info('添加轮播图成功！')
    }else{
      message.info('请输入轮播图名称并且上传图片！')
    }
  }

  onClose = () => {
    this.setState({visible:false})
  }
  onShow = () => {
    this.setState({visible:true})
  }
  doName = (e) => {
    this.setState({cname: e.currentTarget.value})
  }
  doDelImg=()=>{
    this.setState({cimg:null})
  }

  importPhoto = async (e)=>{
    if (e.target.files.length > 0) {
      let file = e.target.files[0]
      let blob = await fileToBlob(file,1600,900)
      let formData = new FormData()
      formData.append('file', blob, 'carousel')

      this.setState({ loading: true })
      let r = await this.props.mainStore.upload(formData)
      if (r.code === 200) {
        this.setState({ loading: false, cimg: r.data.path })
        message.info('上传轮播图片成功')
      } else {
        message.error(r.msg)
      }
      
    }
  }

  
  render() {
    let {list,visible,cimg,cname} = this.state
    return (
      <Spin spinning={this.state.loading}>
        <div className="g-carl">
          <div className="m-tl" >
            <span>轮播图片管理</span>
          </div>
          <div className="m-menu">
            <div className="m-btn" onClick={this.onShow}>
              <img src={icon_add}/>
              <span>新增</span>
            </div>
          </div>
          <div className="m-list">
            {list.map((item,i)=>
              <div className="m-item" key={i}>
                <div className="m-del" onClick={this.doDel.bind(this,item.id)}></div>
                <img src={`${API_SERVER}/${item.img}`} />
                <div className="m-txt">{item.title}</div>
              </div>
            )}
            
          </div>
        </div>
        <Drawer
          title="添加轮播图"
          placement="right"
          width={300}
          closable={false}
          onClose={this.onClose}
          visible={visible}
          className="m-form"
        >
          <div className="m-ipt">
            <span>轮播图名称</span>
            <Input placeholder="请输入轮播图名称" onChange={this.doName}/>
          </div>
          
          {(cimg===null) &&
          <div className="m-ipt m-ipti">
            <span>轮播图图片</span>
            <div className="m-up">+</div>
            <input type="file" accept="image/*;"  onChange={this.importPhoto} />
          </div>}
          {(cimg!==null) &&
          <div className="m-ipt m-ipti">
            <div className="m-del" onClick={this.doDelImg}></div>
            <span>轮播图图片</span>
            <img src={`${API_SERVER}/${cimg}`} alt=""/>
          </div>}
          

          <div className="m-ipt">
            <div className="m-btn" onClick={this.doAdd}>
              <img src={icon_save}/>
              <span>保存</span>
            </div> 
          </div>  
        </Drawer>
      </Spin>
    )
  }
}

export default Carl