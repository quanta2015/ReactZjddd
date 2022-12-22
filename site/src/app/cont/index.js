import React from 'react'
import dayjs from 'dayjs'
import { inject } from 'mobx-react'
import { Input,Button,Carousel,Spin,Pagination,message } from 'antd';
import { API_SERVER } from 'constant/apis'
import style from './style.less';
import cont from '../../img/icon-contact.svg'
import msg from '../../img/icon-msg.svg'
const { TextArea } = Input;

var dep = [{
  dep: "市场部 - 孙工",
  tel: "0571-85117066",
  mob: "15372080427",
  email: "mtybgs@sina.com"
},{
  dep: "综合办公室 - 李工",
  tel: "0571-87051402",
  mob: "13906813283",
  email: "mtybgs@sina.com",
}]

@inject('mainStore')
class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      news:[],
      pagesize: 10,
      cur: 1,
      name:'',
      email:'',
      phone:'',
      msg:'',

    }
  }

  async componentDidMount() {

  }

  onChange = (pn) => {
    this.setState({ cur: pn })
  }

  chgName=(e)=>{
    this.setState({name: e.currentTarget.value})
  }
  chgEmail=(e)=>{
    this.setState({email: e.currentTarget.value})
  }
  chgPhone=(e)=>{
    this.setState({phone: e.currentTarget.value})
  }
  chgMsg=(e)=>{
    this.setState({msg: e.currentTarget.value})
  }
  doAddMsg=async(e)=>{
    let {name,email,phone,msg} = this.state
    if (name.trim() ==='') {
      message.error('请输入姓名！')
      return
    }else if (email.trim() ==='') {
      message.error('请输入邮箱！')
      return
    }else if (msg.trim() ==='') {
      message.error('请输入电话！')
      return
    }else if (phone.trim() ==='') {
      message.error('请输入电话！')
      return
    }else {
      let params = {
        name:name,
        email:email,
        phone:phone,
        msg:msg,
      }
      this.setState({ loading: true })
      let r = await this.props.mainStore.addMsg(params)
      message.success(r.msg)
      this.setState({loading: false, list: r.desi, name:'',msg:'',phone:'',email:'' })
    }
  }





  render() {
    let {name,email,phone,msg} = this.state
    

    return (
      <Spin spinning={this.state.loading}>
        <div className="g-cont">
          <p className="m-tl"><img src={cont} />联系我们</p>
          <section className="m-dep">
            {dep.map((item,i)=>
              <div className="m-item" key={i}>
                <li className="m-dep_name">
                  <span>{item.dep}</span>
                </li>
                <li>
                  <span className="contact__tel">电话：</span>
                  <span className="contact__num">{item.tel}</span>
                </li>
                <li>
                  <span className="contact__tel">手机：</span>
                  <span className="contact__num">{item.mob}</span>
                </li>
                <li>
                  <span className="contact__tel">邮箱：</span>
                  <span className="contact__num">{item.email}</span>
                </li>
              </div>
              )}
          </section>
          
          <section className="m-addr">
            <iframe 
              className="contact__map"
              width='100%' 
              height='600'
              frameBorder='0' 
              src='https://m.amap.com/navi/?dest=120.151794,30.264233&destName=浙江东都建筑设计研究院有限公司&hideRouteIcon=1&key=9d4281acb32d035f8ea4c3abb136451c'
            ></iframe>
          </section>

    
          <section>
            <p className="m-tl"><img src={msg} />给我们留言</p>
            <form className="m-form">
              <div className="m-row">
                <label><span>*</span>姓名</label>
                <div>
                  <Input placeholder="输入您的姓名" value={name} onChange={this.chgName} />
                  <div className="invalid-feedback">请填写姓名</div>
                </div>
              </div>
              <div className="m-row">
                <label><span>*</span>邮箱</label>
                <div>
                  <Input placeholder="输入您的邮箱" value={email}  onChange={this.chgEmail} />
                  <div className="invalid-feedback">请填写有效的电子邮箱</div>
                </div>
              </div>
              <div className="m-row">
                <label><span>* </span>电话号码</label>
                <div>
                  <Input placeholder="输入您的电话号码" value={phone}  onChange={this.chgPhone} />
                  <div className="invalid-feedback">请填写有效的手机号码</div>
                </div>
              </div>
              <div className="m-row">
                <label><span>* </span>留言内容</label>
                <div>
                  <TextArea placeholder="留下您的建议或者意见" rows="8" value={msg}  onChange={this.chgMsg}></TextArea>
                  <div className="invalid-feedback">请填写留言内容</div>
                </div>
              </div>
              <div className="m-pri">
                * 有关个人资料的处理本网站会将获取的个人信息妥善保管，未经本人同意，本站不会向任何第三方披露。
              </div>
              <div className="m-row">
                <label></label>
                <div>
                  <div className="m-btn" type="submit" onClick={this.doAddMsg}>确认提交</div>
                </div>
              </div>
              
            </form>
          </section>
        </div>
      </Spin>
    );
  }
}

export default Home