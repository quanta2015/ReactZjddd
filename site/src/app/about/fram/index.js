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
    }
  }


  render() {
    
    return (
      <div className="g-fram">
        <div class="m-sect">
          <div className="m-tl">
            <img src={info} />组织架构
          </div>

          <div class="m-cnt">
            <img src={group01} class="m-group-pc" />
            <img src={group02} class="m-group-mb" />
          </div>
        </div>

      </div>
    );
  }
}

export default Data
