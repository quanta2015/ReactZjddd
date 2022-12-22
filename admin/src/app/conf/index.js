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
class Msg extends React.Component {
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
      let r = await this.props.mainStore.getMsg()
      this.setState({loading: false, list: r.msg })
      console.log(r)
    }
  }


  doDel=async (id)=>{
    let {cur} = this.state
    let params = { id:id}
    this.setState({ loading: true })
    let r = await this.props.mainStore.delMsg(params)
    this.setState({loading: false, list: r.msg })
    message.info('删除客户留言成功！')
  }

  
  render() {
    let {list,visible} = this.state
    return (
      <Spin spinning={this.state.loading}>
        <div className="g-msg">
          <div className="m-tl" >
            <span>留言管理</span>
          </div>
          <div className="m-list">
            {list.map((item,i)=>
              <div className="m-item" key={i}>
                <div className="m-row">
                  <div className="m-id">{i+1}</div>
                  <div className="m-txt">{item.date}</div>
                  <div className="m-txt">客户名称：{item.name}</div>
                  <div className="m-txt">email: {item.email}</div>
                  <div className="m-txt">联系方式：{item.phone}</div>
                  <div className="m-btn" onClick={this.doDel.bind(this,item.id)}>删除</div>
                </div> 
                <div className="m-row">
                  <div className="m-msg">{item.msg}</div>
                </div>  
                
              </div>
            )}
          </div>
        </div>
        
      </Spin>
    )
  }
}

export default Msg