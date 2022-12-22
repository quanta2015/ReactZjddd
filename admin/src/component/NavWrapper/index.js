import React from 'react'
import { Link } from 'react-router-dom'
import { inject } from 'mobx-react'
import {withRouter} from "react-router-dom";
import { MENU_MAIN } from 'constant/data'

import './index.less'
import logo from 'icon/logo.svg'

@inject('mainStore')
class NavWrapper extends React.Component {
	constructor(props) {
		super(props)

    this.state = {
      cur: 0,
      showHelp: true,
    }
 

    // let u = this.props.mainStore.currUser
    // this.state = {
    //   cur: 0,
    //   role: ((u !== undefined)&&(u !== null))?u.type:-1,
    // }

	}

  doMenu = (path, index)=>{
    if (index === this.state.cur)  return
    this.setState({cur: index})
    this.props.history.push(path)
  }

  logout = ()=>{
    // this.props.userStore.logout()
    this.props.history.push('/')
  }

  doClose = ()=>{

    this.setState({showHelp: false})
  }

	render() {
    let { cur,role,showHelp } = this.state

    // console.log('role...'+ this.props.userStore.currUser)
    let menu = []

   
        

    return (
      <div className="g-nav">
        <div className="g-menu">
          <div className="m-menu-logo">
            <div className="u-logo">
              <img src={logo} />
            </div>
            <div className="u-txt"> 浙江东都建筑设计院</div>
          </div>
          {MENU_MAIN.map((item,i)=>
            <div className={(cur == i)?"m-menu-item c-active":"m-menu-item"} key={i} 
              onClick={this.doMenu.bind(this,item.path, i)}>
              <img src={item.icon} className={(cur == i)?'fn-hide':''}  />
              <img src={item.iconc} className={(cur != i)?'fn-hide':''}/>
              <span>{item.title}</span> 
            </div>
          )}
        </div>
        <div className="g-main">
          {this.props.children}
        </div>

      </div>
    )
  }
}

export default withRouter(NavWrapper)
