import React from 'react'
import dayjs from 'dayjs'
import { inject } from 'mobx-react'
import { Carousel,Spin,Pagination } from 'antd';
import { API_SERVER } from 'constant/apis'
import style from './style.less';
import earch from '../../img/icon-earch.svg'
import wechat from '../../img/icon-wechat.svg'
import retu from '../../img/icon-return.svg'

@inject('mainStore')
class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      news:[],
      pagesize: 10,
      cur: 1,
      show:false,
      index: 0,
    }
  }

  async componentDidMount() {
    this.setState({ loading: true })
    let n = await this.props.mainStore.getNews()
    this.setState({ loading: false,news: n.news })
  }

  onChange = (pn) => {
    this.setState({ cur: pn })
  }

  showNew =(e)=> {
    console.log(e)
    this.setState({ show: true, index: e  })
  }

  doClose = () => {
    this.setState({ show: false  })
  }


  render() {
    let {news,cur,pagesize,index} = this.state
    let list = news.filter((item,i)=> {return ((i<cur*pagesize)&&(i>=(cur-1)*pagesize))})
    let length = news.length
    let title   = (list.length>0)?list[index].title:''
    let date    = (list.length>0)?list[index].date:''
    let content = (list.length>0)?list[index].content:''
    

    return (
      <Spin spinning={this.state.loading}>
        <div className="g-news">
          <div className="m-sect">
            <div className="m-news">
              <p className="m-tl">
                <img src={earch} />
                新闻中心
              </p>

              <div className="m-cnt">
                {list.map((item,i)=>
                  <div className="m-item" key={i} onClick={this.showNew.bind(this,i)}>
                    <span className="u-tl">{item.title}</span>
                    <span className="u-date">{item.date}</span>
                  </div>
                 )}
              </div>

              <Pagination className="m-page" size="small" defaultCurrent={1} total={length} onChange={this.onChange} />
            </div>
          </div>

          {(this.state.show)&&
          <div className="m-detail">
            <div className="m-wrap">
              <div className="m-tl"><span>{title}</span></div>
              <div className="m-date">{date}</div>
              <div className="m-cnt" dangerouslySetInnerHTML={{__html: content }} />

              <div className="m-btn" onClick={this.doClose}><img src={retu} /><span>返回</span></div>
            </div>
          </div>}
        </div>
      </Spin>
    );
  }
}

export default Home