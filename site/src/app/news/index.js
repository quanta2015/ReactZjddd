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
      news:[],
      pagesize: 10,
      cur: 1,
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


  render() {
    let {news,cur,pagesize} = this.state
    let list = news.filter((item,i)=> {return ((i<cur*pagesize)&&(i>=(cur-1)*pagesize))})
    let length = news.length

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
                  <a href="/item/new.html?id={{:_id}}" className=" d-block" key={i}>
                    <span className="u-tl">{item.title}</span>
                    <span className="u-date">{item.date}</span>
                  </a>
                 )}
              </div>

              <Pagination className="m-page" size="small" defaultCurrent={1} total={length} onChange={this.onChange} />
            </div>
          </div>
        </div>
      </Spin>
    );
  }
}

export default Home