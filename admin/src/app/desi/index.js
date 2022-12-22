import React from 'react'
import dayjs from 'dayjs'
import { inject } from 'mobx-react'
import { Drawer, Input, Button, Spin, DatePicker, message } from 'antd'
import { API_SERVER } from '@constant/apis'
import icon_add from '../../icon/icon_add.svg'
import icon_save from '../../icon/icon_save.svg'
import {getListByPage, fileToBlob} from '../../util/fn'
import style from './style.less';
const { TextArea } = Input

const PAGE_SIZE = 10

@inject('mainStore')
class Desi extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      cur: 0,
      list: [],
      visible: false,
      cimg: null,
      cname:null,
      projName:'',
      projDate:'',
    }
  }

  async componentDidMount() {
    let currUser = this.props.mainStore.currUser
    if ((typeof(currUser) === 'undefined')||(currUser === null)) {
      this.props.history.push("/login")
    }else{
      let {cur} = this.state
      this.setState({ loading: true })
      let r = await this.props.mainStore.getDesi()
      this.setState({loading: false, list: r.desi })
      console.log(r)
    }
  }

  doSaveDesi=async()=>{
    this.setState({ loading: true })
    let params = {list: this.state.list}
    let r = await this.props.mainStore.saveDesi(params)
    this.setState({loading: false, list: r.desi })
  }

  doChgDesi=(e)=>{
    this.setState({cur:e})
  }
  doChgDesc=(e)=>{
    let {list,cur} = this.state
    list[cur].desc = e.currentTarget.value
    this.setState({list:list})
  }

  doAddProj=()=>{
    let { projName,projDate,list,cur } = this.state
    list[cur].projectsId.push({
      id: dayjs().format('YYYYMMDDhhmmssSSS'),
      title: projName,
      date: projDate,
    })
    this.setState({list:list, visible:false})
  }
  doDelProj=(index)=>{
    let {list,cur} = this.state
    list[cur].projectsId.splice(index,1)
    this.setState({list:list})
  }

  onClose = () => {
    this.setState({visible:false})
  }
  onShow = () => {
    this.setState({visible:true})
  }

  chgProjDate=(date,dateString)=>{
    this.setState({projDate:dateString})
  }

  chgProjName=(e)=>{
    this.setState({projName:e.currentTarget.value})
  }

  importPhoto = async (e)=>{
    if (e.target.files.length > 0) {
      let file = e.target.files[0]
      let blob = await fileToBlob(file,400,300)
      let formData = new FormData()
      formData.append('file', blob, 'carousel')

      this.setState({ loading: true })
      let r = await this.props.mainStore.upload(formData)
      if (r.code === 200) {
        this.setState({ loading: false, cimg: r.data.path })
        message.info('上传图片成功')
      } else {
        message.error(r.msg)
      }
    }
  }

  
  render() {
    let person = {
      name: '',
      img: '',
      desc: '',
      projectsId:[]

    }
    let {list,visible,cimg,cname,cur} = this.state
    let item = (list.length>0)?list[cur]:person


    return (
      <Spin spinning={this.state.loading}>
        <div className="g-desi">
          <div className="m-tl" >
            <span>设计师管理</span>
          </div>
          <div className="m-menu">
            {list.map((item,i)=>
              <div className="m-btn m-blue" key={i} onClick={this.doChgDesi.bind(this,i)}>
                <div className="m-txt">{item.name}</div>
              </div>
            )}
            <div className="m-sep"></div>
            <div className="m-btn m-red" onClick={this.doSaveDesi}>
              <img src={icon_save}/>
              <span>保存</span>
            </div>
          </div>

          <div className="m-desi">
            <div className="m-lt">
              <img src={`${API_SERVER}/${item.img}`} alt=""/>
              <span>{item.name}</span>
              <input type="file" accept="image/*;"  onChange={this.importPhoto} />
            </div>
            <div className="m-rt">
              <div className="m-desc">
                <span> 个人履历</span>
                <TextArea value={item.desc} onChange={this.doChgDesc}></TextArea>
              </div>  
              <div className="m-proj">
                <div className="m-add" onClick={this.onShow}>+</div>
                <span> 个人履历</span>  
                {item.projectsId.map((item,i)=>
                  <div className="m-item">
                    <span className="m-dt">{item.date} - {item.title} </span>
                    <span className="m-rm" onClick={this.doDelProj.bind(this,i)}>-</span>
                  </div>

                  )}
              </div>
            </div>  
          </div>

          <Drawer title="添加工程" placement="right" width={300} closable={false} onClose={this.onClose} visible={visible} className="m-form" >
            <div className="m-ipt">
              <span>工程名称</span>
              <Input placeholder="请输入工程名称" onChange={this.chgProjName}/>
            </div>
            <div className="m-ipt">
              <span>工程日期</span>
              <DatePicker onChange={this.chgProjDate} />
            </div>
            <div className="m-ipt">
              <div className="m-btn" onClick={this.doAddProj}>
                <img src={icon_save}/>
                <span>保存</span>
              </div> 
            </div>  
          </Drawer>
          
        </div>
      </Spin>
    )
  }
}

export default Desi