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
      <div className="g-qual">
        <div class="m-sect">
          <div className="m-tl">
            <img src={info} />企业资质
          </div>

          <div class="m-cnt">
            {qual.map((item,i)=>
              <li key={i}>
                <img src={`${API_SERVER}/${item}`} />
              </li>
            )}
          </div>
        </div>

      </div>
    );
  }
}

export default Data
