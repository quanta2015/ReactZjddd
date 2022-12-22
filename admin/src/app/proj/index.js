import React from 'react'
import dayjs from 'dayjs'
import { inject } from 'mobx-react'
import { Pagination, Select, Drawer, Input, Button, Spin, message } from 'antd'
import { API_SERVER } from '@constant/apis'
import icon_add from '../../icon/icon_add.svg'
import icon_save from '../../icon/icon_save.svg'
import {getListByPage, fileToBlob} from '../../util/fn'
import style from './style.less';
const { Option } = Select;
const PAGE_SIZE = 9



@inject('mainStore')
class Proj extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      cur: 1,
      list: [],
      listpage:[],
      visible: false,
      imgList: [],
      cname:null,
      type: "0",
      category: "0",
    }
  }

  doPage=(page)=>{
    this.setState({cur:page, listpage:getListByPage(this.state.list,page,PAGE_SIZE)})
  }

  async componentDidMount() {
    let currUser = this.props.mainStore.currUser
    if ((typeof(currUser) === 'undefined')||(currUser === null)) {
      this.props.history.push("/login")
    }else{
      let {cur} = this.state
      this.setState({ loading: true })
      let r = await this.props.mainStore.getProj()
      this.setState({loading: false, list: r.proj, listpage:getListByPage(r.proj,cur, PAGE_SIZE) })
      console.log(r)
    }
  }


  doDel=async (id)=>{
    let {cur} = this.state
    let params = { id:id}
    this.setState({ loading: true })
    let r = await this.props.mainStore.delProj(params)
    this.setState({loading: false, list: r.proj, listpage:getListByPage(r.proj,cur, PAGE_SIZE) })
    message.info('删除工程成功！')
  }

  doAdd=async ()=>{
    let {cur,cname,imgList,type,category} = this.state
    if ((cname.trim()!=='')&&(cname!==null)&&(imgList.length!==0)) {
      let parmas = { name:cname, type:type, category:category, img:imgList }
      this.setState({ loading: true })
      let r = await this.props.mainStore.addProj(parmas)
      this.setState({loading: false, visible:false, list: r.proj, listpage:getListByPage(r.proj,cur, PAGE_SIZE) })
      message.info('添加工程成功！')
    }else{
      message.info('请输入工程名称并且上传图片！')
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
  doChangeType = (e) => {
    this.setState({type: e})
  }
  doChangeCategory = (e) => {
    this.setState({category: e})
  }
  doDelImg=()=>{
    this.setState({imgList:null})
  }

  importPhoto = async (e)=>{
    let {imgList} = this.state
    if (e.target.files.length > 0) {
      let file = e.target.files[0]
      let blob = await fileToBlob(file,400,300)
      let formData = new FormData()
      formData.append('file', blob, 'project')

      this.setState({ loading: true })
      let r = await this.props.mainStore.upload(formData)
      if (r.code === 200) {
        imgList.push(r.data.path)
        this.setState({ loading: false, imgList: imgList })
        message.info('上传图片成功')
      } else {
        message.error(r.msg)
      }
    }
  }

  

  
  render() {

    let {listpage,list,visible,imgList,cname,type,category} = this.state
    return (
      <Spin spinning={this.state.loading}>
        <div className="g-proj">
          <div className="m-tl" >
            <span>工程项目管理</span>
          </div>
          <div className="m-menu">
            <div className="m-btn" onClick={this.onShow}>
              <img src={icon_add}/>
              <span>新增</span>
            </div>
          </div>
          <div className="m-list">
            {listpage.map((item,i)=>
              <div className="m-item" key={i}>
                <div className="m-del" onClick={this.doDel.bind(this,item._id)}></div>
                <img src={`${API_SERVER}/${item.img[0]}`} />
                <div className="m-img_list">
                  {item.img.map((o,j)=>
                      <img src={`${API_SERVER}/${o}`} key={j}/>
                    )}
                </div>
                <div className="m-txt">{item.title}</div>
              </div>
            )}
            <Pagination className="m-page" defaultCurrent={1} pageSize={PAGE_SIZE} total={list.length} onChange={this.doPage}/>
          </div>
        </div>
        <Drawer
          title="添加工程"
          placement="right"
          width={435}
          closable={false}
          onClose={this.onClose}
          visible={visible}
          className="m-form"
        >
          <div className="m-ipt">
            <span>工程名称</span>
            <Input placeholder="请输入工程名称" value={cname} onChange={this.doName}/>
          </div>
          <div className="m-ipt">
            <span>工程类型</span>
            <Select defaultValue="工程设计" value={type} onChange={this.doChangeType}>
              <Option value="0">工程设计</Option>
              <Option value="1">工程总承包</Option>
              <Option value="2">图审咨询</Option>
            </Select>
          </div>
          <div className="m-ipt">
            <span>工程种类</span>
            <Select defaultValue="住宅类" value={category} onChange={this.doChangeCategory}>
              <Option value="0">住宅类</Option>
              <Option value="1">办公类</Option>
              <Option value="2">学校类</Option>
              <Option value="3">医疗类</Option>
              <Option value="4">科技类</Option>
              <Option value="5">加梯类</Option>
            </Select>
          </div>
          
          <div className="m-ipt m-ipti">
            <span>工程图片</span>
            <div className="m-up">+</div>
            <input type="file" accept="image/*;"  onChange={this.importPhoto} />
          </div>

          {imgList.map((o,j)=>
            <div className="m-ipt m-ipti" key={j}>
              <div className="m-del" onClick={this.doDelImg}></div>
              <span>工程图片</span>
              <img src={`${API_SERVER}/${o}`} />
            </div>
          )}


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

export default Proj