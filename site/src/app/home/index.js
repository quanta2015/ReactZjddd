import React from 'react'
import dayjs from 'dayjs'
import { inject } from 'mobx-react'
import { Carousel,Spin } from 'antd';
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
      carl:[],
      news:[],
      wenews:[],
      show:false,
      index: 0,
      type: 0,
      showAno: true,
      ano: {ano:null, tl:null, from:null, date:null}
    }
  }

  async componentDidMount() {
    this.setState({ loading: true })
    let r = await this.props.mainStore.getCarls()
    let n = await this.props.mainStore.getNews()
    let w = await this.props.mainStore.getWeNews()
    let q = await this.props.mainStore.getAno()
    
    this.setState({ 
      carl:    r.carl, 
      news:    n.news.filter((o,i)=> {return i<5}),
      wenews:  w.news.filter((o,i)=> {return i<5}),
      ano:     q.ano,
      loading: false,
    })
    console.log(w.news.filter((o,i)=> {return i<5}))
  }

  showNew =(e,type)=> {
    this.setState({ show: true, index: e, type:type })
  }

  doClose = () => {
    this.setState({ show: false  })
  }

  showMore=() => {
    this.props.history.push("/news")
  }

  doCloseAno=()=>{
    this.setState({showAno:false})
  }


  render() {
    let {carl,news,wenews,index,show,type,ano,showAno} = this.state
    let content
    let title   = (news.length>0)?news[index].title:''
    let date    = (news.length>0)?news[index].date:''

    if ((type)&&(news.length>0)) {
      content = news[index].content
    }else if (!(type)&&(wenews.length>0)) {
      content = wenews[index].content.replace(/data-src=/g, "src=")
    }else {
      content = ''
    }


    
    // let content = (news.length>0)?news[index].content:''
   
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

          {(showAno)&&
          <div className="m-ano">
            <div className="m-tl"> {ano.tl}</div>
            <div className="m-dt" dangerouslySetInnerHTML={{__html: ano.ano }} ></div>
            <div className="m-from">{ano.from}</div>
            <div className="m-date">{ano.date}</div>
            <div className="m-btn" onClick={this.doCloseAno}>关闭</div>
          </div>}



          <div className="m-sect">
            <div className="m-news">
              <p className="m-tl">
                <img src={earch} />
                新闻中心
              </p>

              <div className="m-cnt">
                {news.map((item,i)=>
                  <div className="m-item" key={i} onClick={this.showNew.bind(this,i,1)}>
                    <span className="u-tl">{item.title}</span>
                    <span className="u-date">{item.date}</span>
                  </div>
                 )}
                <div className="m-more" onClick={this.showMore} >查看更多 >></div>
              </div>
            </div>
            <div className="m-wechat">
              <p className="m-tl">
                <img src={wechat} />
                公众号中心
              </p>

              <div className="m-cnt">
                {wenews.map((item,i)=>
                  <div className="m-item" key={i} onClick={this.showNew.bind(this,i,0)}>
                    <span className="u-tl">{item.title}</span>
                    <span className="u-date">{dayjs(item.date*1000).format('YYYY-MM-DD')}</span>
                  </div>
                 )}
                <div className="m-more"  onClick={this.showMore}>查看更多 >></div>
              </div>
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