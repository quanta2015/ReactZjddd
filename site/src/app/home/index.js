import React from 'react'
import dayjs from 'dayjs'
import { inject } from 'mobx-react'
import { Carousel,Spin } from 'antd';
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
      carl:[],
      news:[],
      wenews:[],
    }
  }

  async componentDidMount() {
    this.setState({ loading: true })
    let r = await this.props.mainStore.getCarls()
    let n = await this.props.mainStore.getNews()
    let w = await this.props.mainStore.getWeNews()
    
    this.setState({ 
      carl:    r.carl, 
      news:    n.news.filter((o,i)=> {return i<10}),
      wenews:  w.news.filter((o,i)=> {return i<10}),
      loading: false,
    })
  }


  render() {
    let {carl,news,wenews} = this.state
   
    return (
      <Spin spinning={this.state.loading}>
        <div className="g-home">
          <Carousel autoplay>
            {carl.map((item,i)=>
              <div key={i}>
                <img className="m-carl_img"  src={`${API_SERVER}/${item.img}`} />
              </div>
            )}
          </Carousel>

          <div className="m-sect">
            <div className="m-news">
              <p className="m-tl">
                <img src={earch} />
                新闻中心
              </p>

              <div className="m-cnt">
                {news.map((item,i)=>
                  <a href="/item/new.html?id={{:_id}}" className=" d-block" key={i}>
                    <span className="u-tl">{item.title}</span>
                    <span className="u-date">{item.date}</span>
                  </a>
                 )}
                <a href="/news.html" className="m-more">查看更多 >></a>
              </div>
            </div>
            <div className="m-wechat">
              <p className="m-tl">
                <img src={wechat} />
                公众号中心
              </p>

              <div className="m-cnt">
                {wenews.map((item,i)=>
                  <a href="/item/new.html?id={{:_id}}" className=" d-block" key={i}>
                    <span className="u-tl">{item.title}</span>
                    <span className="u-date">{dayjs(item.date*1000).format('YYYY-MM-DD')}</span>
                  </a>
                 )}
                <a href="/news.html" className="m-more">查看更多 >></a>
              </div>
            </div>
          </div>
        </div>
      </Spin>
    );
  }
}

export default Home