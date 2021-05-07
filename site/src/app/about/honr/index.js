import React from 'react'
import { inject } from 'mobx-react'
import style from './style.less'
import { API_SERVER } from 'constant/apis'
import info from 'img/icon-info.svg'


@inject('mainStore')
class Data extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      honr:[],
      cur: 0,
    }
  }


  async componentDidMount() {
    this.setState({ loading: true })
    let r = await this.props.mainStore.getHonr()
    this.setState({ loading: false,honr: r.honr })
  }


  render() {
    let {honr,cur} = this.state

    return (
      <div className="g-honr">
        <div className="m-sect">
          <div className="m-tl">
            <img src={info} />企业荣誉
          </div>

          <div className="m-cnt">
            {honr.map((item,i)=>
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
