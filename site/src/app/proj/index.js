import React from 'react'
import dayjs from 'dayjs'
import { inject } from 'mobx-react'
import { Carousel,Spin,Pagination,Menu } from 'antd';
import { API_SERVER } from 'constant/apis'
import style from './style.less';

import dsg from '../../img/icon-design.svg'
import bag from '../../img/icon-bag.svg'
import adv from '../../img/icon-img.svg'
import project from '../../img/icon-project.svg'
import hous   from '../../img/icon-house.svg'
import work from '../../img/icon-work.svg'
import scho from '../../img/icon-school.svg'
import hosp from '../../img/icon-hospital.svg'
import fact from '../../img/icon-factory.svg'
import elec from '../../img/icon-ele.svg'
import retu from '../../img/icon-return.svg'

var clone = (e) => { return JSON.parse(JSON.stringify(e))}


@inject('mainStore')
class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      show: false,
      proj:[],
      projsel:[],
      pagesize: 12,
      cur: 0,
      pg: 1,
      sel: 0,
      selImgId:0,
    }
  }

  async componentDidMount() {
    this.setState({ loading: true })
    let p = await this.props.mainStore.getProj()
    this.setState({ loading: false,proj: p.proj, projsel: p.proj.filter(o=>{return (o.type==this.state.cur)}) })
  }

  selMain = (e) => {
    let {proj} = this.state
    this.setState({ cur:e.key ,projsel:proj.filter(o=>{return (o.type==e.key)}) })
  }

  selSub = (e) => {
    let {proj,cur} = this.state
    this.setState({ projsel:proj.filter(o=>{return ((o.type==cur)&&(o.category==e))}) })
  }

  selPage = (e) => {
    this.setState({ pg:e })
  }

  selProj = (e) => {
    let {projsel} = this.state
    let sel
    projsel.map((item,i)=>{
      if (item._id === e) {
        sel = i
      }
    })

    console.log(sel)
    this.setState({ sel:sel, show: true })
  }

  selProjImg = (e) => {
    this.setState({ selImgId:e })
  }

  doClose = () => {
    this.setState({ show: false, selImgId:0  })
  }




  render() {

    let {projsel,cur,pagesize,pg,show,sel,selImgId} = this.state
    let length = projsel.length
    let list = projsel.filter((o,i)=> {return ((i<pg*pagesize)&&(i>=(pg-1)*pagesize))})
    // let proj = (list.length>0)?list[sel]:null
    let proj = (projsel.length>0)?projsel[sel]:null 

    let projImg = (proj!==null)?`${API_SERVER}/${proj.img[selImgId]}`:''
    let projImgLst = (proj!==null)?proj.img:[]
    let projTitle  = (projsel.length>0)?projsel[sel].title:''
    let projDate   = (projsel.length>0)?projsel[sel].date:''
    let projCnt    = (projsel.length>0)?projsel[sel].content:''
    let projClo    = clone(projsel)
    let projRnd    = projClo.sort(() => 0.5 - Math.random()).slice(0, 10);
    

    return (
      <Spin spinning={this.state.loading}>
        <div className="g-proj">
          <div className="m-proj">
            <p className="m-tl">
              <img src={project} />
              工程案例
            </p>

            <Menu onClick={this.selMain} selectedKeys={[cur]} mode="horizontal">
              <Menu.Item key="0" icon={dsg}>工程设计</Menu.Item>
              <Menu.Item key="1" icon={bag}>工程总承包</Menu.Item>
              <Menu.Item key="2" icon={adv}>图审咨询</Menu.Item>
            </Menu>

            <div className="m-type">
              <span onClick={this.selSub.bind(this,0)}><img src={hous} /><i>住宅类</i></span>
              <span onClick={this.selSub.bind(this,1)}><img src={work} /><i>办公类</i></span>
              <span onClick={this.selSub.bind(this,2)}><img src={scho} /><i>学校类</i></span>
              <span onClick={this.selSub.bind(this,3)}><img src={hosp} /><i>医疗类</i></span>
              <span onClick={this.selSub.bind(this,4)}><img src={fact} /><i>科技类</i></span>
              <span onClick={this.selSub.bind(this,5)}><img src={elec} /><i>加梯类</i></span>
            </div>

            <div className="m-wrap">
              {list.map((item,i)=>
                <div className="m-item" key={i} onClick={this.selProj.bind(this,item._id)}>
                  <div className="m-tl">{item.title}</div>
                  <div className="m-date">{item.date}</div>
                  <img src={`${API_SERVER}/${item.img[0].replace('project_imgs','icon_project_imgs').toLowerCase()}`} />
                </div>
              )}
            </div>

            <Pagination defaultCurrent={1} pageSize={pagesize} total={length} onChange={this.selPage} />
          </div>

          {(this.state.show)&&
          <div className="m-detail">
            <div className="m-wrap_l">
              <div className="m-proj_img">
                <img src={projImg} />
              </div>
              <div className="m-list">
                {projImgLst.map((item,i)=>
                  <li onClick={this.selProjImg.bind(this,i)}>
                    <img src={`${API_SERVER}/${item}`} />
                  </li>
                )}
              </div>
              <div className="m-tl">{projTitle}</div>
              <div className="m-date">{projDate}</div>
              <div className="m-cnt">{projCnt}</div>
            </div>
            <div className="m-wrap_r">
              <div className="m-btn" onClick={this.doClose}><img src={retu} />返回</div>
              {projRnd.map((item,i)=>
                <div className="m-item" onClick={this.selProj.bind(this,item._id)}>
                  {item.date} - {item.title}
                </div>  

              )}
            </div>
          </div>}
          
        </div>
      </Spin>
    );
  }
}

export default Home