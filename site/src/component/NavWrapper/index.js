import React from 'react'
import { Link } from 'react-router-dom'
import { inject } from 'mobx-react'
import {withRouter} from "react-router-dom";
// import { MENU_MAIN } from 'constant/data'
import { Menu } from 'antd';
import logo from "img/logo.svg"
const { SubMenu } = Menu;
import './index.less'

var $ = (o) =>{ return document.querySelector(o) }


@inject('mainStore')
class NavWrapper extends React.Component {
	constructor(props) {
		super(props)

    this.state = {
      cur: 'home',
      mobile: false,
      show: true,
    }
	}

  async componentDidMount() {
    let mobile = ($('html').clientWidth<1000)?true:false
    this.setState({ mobile:mobile, show: !mobile })
  }

  showMenu = ()=> {
    this.setState({ show:true })
  }

  closeMenu = ()=> {
    this.setState({ show:!this.state.mobile })
  }

  doMenu = (e) => {
    let {mobile} = this.state
    this.setState({ cur: e.key, show:!mobile })
    this.props.history.push(e.key)
  }



	render() {
    const { cur,mobile,show } = this.state

    return (
      <div className="g-nav">
        <div className="m-nav">
          <a className="navbar-brand" href="/">
            <img src={logo} width="30" height="30" className="d-inline-block align-top" />
          </a>
          <label>浙江东都建筑设计研究院有限公司</label>

          <div className="m-toggle" onClick={this.showMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>

          {(show)&&
          <div className="m-menu_wrap">
            <Menu theme="light" 
                  className="m-menu"
                  selectedKeys={[cur]}
                  onClick={this.doMenu} 
                  mode={(mobile)?"inline":"horizontal"}
                  defaultOpenKeys={(mobile)?["about"]:[]}
            >
              <Menu.Item key="/" >首页</Menu.Item>
              <SubMenu title="院况简介" key="about">
                <Menu.ItemGroup>
                  <Menu.Item key="intr">设计院简介</Menu.Item>
                  <Menu.Item key="fram">组织架构 </Menu.Item>
                  <Menu.Item key="qual">企业资质 </Menu.Item>
                  <Menu.Item key="honr">企业荣誉 </Menu.Item>
                  <Menu.Item key="bran">下属机构 </Menu.Item>
                </Menu.ItemGroup>
              </SubMenu>
              <Menu.Item key="news">新闻中心</Menu.Item>
              <Menu.Item key="proj">工程案例</Menu.Item>
              <Menu.Item key="desi">设计师</Menu.Item>
              <Menu.Item key="cont">联系我们</Menu.Item>
            </Menu>
            <div className="m-blank"  onClick={this.closeMenu}></div>
          </div>}

        </div>

        <div className="g-main">
          {this.props.children}
        </div>

        <div className="m-footer">
          <img src={logo} />
          <p>
            <strong>浙江东都建筑设计研究院有限公司 </strong>
            <span className="m-slash">/ </span>
            <span>地址：杭州市西湖区省府路27号 <em className="m-slash">/ </em></span>
            <span>电话：0571-87051402</span><br />
            <small>© 浙江东都建筑设计研究院有限公司 All Rights Reserved. <a href="https://beian.miit.gov.cn">浙ICP备19009687号-1</a> </small>
          </p>
        </div>
      </div>
    )
  }
}

export default withRouter(NavWrapper)
