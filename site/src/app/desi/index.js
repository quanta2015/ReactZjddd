import React from 'react'
import dayjs from 'dayjs'
import { inject } from 'mobx-react'
import { Carousel,Spin,Pagination } from 'antd';
import { API_SERVER } from 'constant/apis'
import style from './style.less';
import earch from '../../img/icon-earch.svg'
import wechat from '../../img/icon-wechat.svg'

@inject('mainStore')
class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      desi:[],
      proj:[],
      cur: 0,
    }
  }

  async componentDidMount() {
    this.setState({ loading: true })
    let n = await this.props.mainStore.getDesi()
    console.log(n)
    this.setState({ loading: false,desi: n.desi, proj:n.desi[0].projectsId})

    
  }


  selDesi =(i)=> {
    let {desi} = this.state
    this.setState({cur:i, proj:desi[i].projectsId})
  }


  render() {
    let {desi,proj,cur} = this.state
    let desc = (desi.length!==0)?desi[cur].desc:''
    console.log(proj)


    return (
      <Spin spinning={this.state.loading}>
        <div className="g-desi">
          <div className="m-cnt">
            <div className="m-desi">
              {desi.map((item,i)=>
                <div className={(i==cur)?'m-item act':'m-item'} key={i} onClick={this.selDesi.bind(this,i)}>
                  <p>{item.name}</p>
                  <label>{item.title}</label>
                  <img src={`${API_SERVER}/${item.img}`} />
                </div>
              )}
            </div>

            <div className="m-desc">
              <div className="m-wrap">
                <div className="m-title">设计师简介</div>
                <div className="m-about">{desc}</div>
                {proj.map((item,i)=>
                  <div className="m-link" key={i}>
                    <a href="item/project.html?id=">{item.date} - {item.title}</a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Spin>
    );
  }
}

export default Home