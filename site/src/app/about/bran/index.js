import React from 'react'
import { inject } from 'mobx-react'
import style from './style.less'
import { API_SERVER } from 'constant/apis'
import info from 'img/icon-info.svg'
import group01 from 'img/group01.svg'
import group02 from 'img/group02.svg'


@inject('dataStore')
class Data extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      qual:['img/qual/01.jpg','img/qual/02.jpg','img/qual/03.jpg'],
      cur: 1,
    }
  }


  // async componentDidMount() {
  //   this.setState({ loading: true })
  //   let r = await this.props.mainStore.getQual()
  //   this.setState({ loading: false,qual: r.qual })
  // }


  render() {
    let {qual,cur} = this.state

    return (
      <div className="g-bran">
        <div className="m-sect">
          <div className="m-tl">
            <img src={info} />下属机构
          </div>

          <div className="m-cnt">
            <div className="m-list">
              <li>
                <img src={`${API_SERVER}/img/branch01.jpg`} />
              </li>
              <li>
                <img src={`${API_SERVER}/img/branch02.jpg`} />
              </li>
            </div>
            <div className="m-info">
                <div className="m-tl">浙江瑞丰建设工程施工图审查中心</div>
                <div className="m-ct">
                  <p>浙江瑞丰建设工程施工图审查中心的前身为杭州瑞丰建筑施工图设计咨询部，是建设部2001年第一批核定的施工图审图机构，为独立法人机构，专门从事浙江省内的各类施工图审查业务。我中心于2016年8月改为民办非企业性质。一直以来，杭州瑞丰建筑施工图设计咨询部根据建设部13号令要求，对审图中心内部人员管理、施工图审查流程、审查质量、审后服务等有一套严格的管理体系。</p>
                  <p>根据浙江省综合审图改革（浙建【2017】6号文）要求，我中心在沿用原有架构体系的基础上，增加了关于“杭州市建设工程施工图联合审查”的新要求，并把最新的管理、服务体系贯彻落实到每一位员工，以确保我中心的施工图审查质量和服务方案不出任何重大差错，正真成为一家合格的高质量审查机构。</p>
                </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default Data
