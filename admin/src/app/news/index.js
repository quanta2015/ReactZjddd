import React from 'react'
import dayjs from 'dayjs'
import { inject } from 'mobx-react'
import { Drawer, Pagination, DatePicker,Input, Button, Spin, message } from 'antd'
import moment from 'moment';
import { API_SERVER } from '@constant/apis'
import icon_add from '../../icon/icon_add.svg'
import icon_save from '../../icon/icon_save.svg'
import {getListByPage, fileToBlob} from '../../util/fn'

import { EditorState, convertToRaw, ContentState } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import htmlToDraft from 'html-to-draftjs'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'


import style from './style.less';
const { TextArea } = Input;
const PAGE_SIZE = 10
const dateFormat = 'YYYY-MM-DD';

@inject('mainStore')
class News extends React.Component {
  constructor(props) {
    super(props)

    const contentBlock = htmlToDraft('');
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks)
      const editorState = EditorState.createWithContent(contentState)
      
      this.state = {
        loading: false,
        cur: 1,
        list: [],
        listpage:[],
        showEdit: false,
        title: null,
        content:null,
        editorState: editorState
      }
    }
  }

  doPage=(page)=>{
    this.setState({cur:page, listpage:getListByPage(this.state.list,page)})
  }

  async componentDidMount() {
    let currUser = this.props.mainStore.currUser
    if ((typeof(currUser) === 'undefined')||(currUser === null)) {
      this.props.history.push("/login")
    }else{
      let {cur} = this.state
      this.setState({ loading: true })
      let r = await this.props.mainStore.getNews()
      this.setState({loading: false, list: r.news, listpage:getListByPage(r.news,cur) })
      console.log(r)
    }
  }

  doDel=async (id)=>{
    let {cur} = this.state
    let params = { id:id}
    this.setState({ loading: true })
    let r = await this.props.mainStore.delNews(params)
    this.setState({loading: false, list: r.news, listpage:getListByPage(r.news,cur) })
    message.info('删除新闻成功！')
  }

  doAdd=async ()=>{
    let {title,content,cur, date, id} = this.state
    if ((title.trim()!=='')&&(title!==null)&&(content!==null)) {
      let parmas = { id:id, title:title, content:content, date: moment(date).format(dateFormat) }
      this.setState({ loading: true })
      let r = await this.props.mainStore.addNews(parmas)
      this.setState({loading: false, showEdit:false, list: r.news, listpage:getListByPage(r.news,cur) })
      message.info('添加新闻成功！')
    }else{
      message.info('请输入新闻标题和内容！')
    }
  }



  onClose = ()  => { this.setState({showEdit:false}) }
  onShow  = ()  => { this.setState({showEdit:true }) }
  doTitle = (e) => { this.setState({title: e.currentTarget.value}) }
  doContent = (e) => { this.setState({content: e.currentTarget.value}) }


  importPhoto = async (e)=>{
    if (e.target.files.length > 0) {
      let file = e.target.files[0]
      let blob = await fileToBlob(file,400,300)
      let formData = new FormData()
      formData.append('file', blob, 'new')

      this.setState({ loading: true })
      let r = await this.props.mainStore.upload(formData)
      if (r.code === 200) {
        this.setState({ loading: false, cimg: r.data.path })
        message.info('上传图片成功')
      } else {
        message.error(r.msg)
      }
      
    }
  }

  doEdit=async(e)=>{
    let {listpage} = this.state
    let index 
    listpage.forEach((item,i)=>{ index = (item.id === e)?i:index })
    let item = listpage[index]
    const cb = htmlToDraft(item.content)
    const cs = ContentState.createFromBlockArray(cb.contentBlocks);
    const editorState = EditorState.createWithContent(cs);

    this.setState({
      id: item.id,
      title: item.title,
      date:  moment(item.date),
      content: item.content,
      editorState: editorState,
      showEdit:true,
    })
  }

  onEditorStateChange = (e) =>{
    let content = draftToHtml(convertToRaw(e.getCurrentContent()))
    this.setState({ content:content, editorState:e})
  }
  onDate=(date, dateString) => {
    this.setState({ date:moment(dateString) })
  }
  
  render() {
    let {listpage,list,showEdit,cimg,cname,editorState} = this.state
    return (
      <Spin spinning={this.state.loading}>
        <div className="g-news">
          <div className="m-tl" >
            <span>新闻管理</span>
          </div>
          <div className="m-menu">
            <div className="m-btn" onClick={this.onShow}>
              <img src={icon_add}/>
              <span>新增</span>
            </div>
          </div>
          <div className="m-list">
            {listpage.map((item,i)=>
              <div className="m-item" key={i}>
                <div className="m-del" onClick={this.doDel.bind(this,item.id)}></div>
                <div className="m-date">{item.date}</div>
                <div className="m-edit" onClick={this.doEdit.bind(this,item.id)}>修改</div>
                <div className="m-tl">{item.title}</div>
              </div>
            )}
            <Pagination className="m-page" defaultCurrent={1} pageSize={PAGE_SIZE} total={list.length} onChange={this.doPage}/>
          </div>
        </div>
        <Drawer
          title="添加新闻"
          placement="right"
          width={600}
          closable={false}
          onClose={this.onClose}
          visible={showEdit}
          className="m-form"
        >
          <div className="m-ipt">
            <span>新闻标题</span>
            <Input placeholder="请输入新闻标题" value={this.state.title} onChange={this.doTitle}/>
          </div>
          <div className="m-ipt">
            <span> 新闻日期</span>
            <DatePicker defaultValue={moment()} value={this.state.date} format={dateFormat} onChange={this.onDate} />
          </div>
          
          <div className="m-ipt">
            <span>新闻内容</span>
            <Editor editorState={editorState} style={{height: '100px'}}
             onEditorStateChange={this.onEditorStateChange} 
             toolbar={{
              options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker'] }} />
          </div>

          <div className="m-ipt">
            <div className="m-btn" onClick={this.doAdd}>
              <img src={icon_save}/>
              <span>保存</span>
            </div> 
          </div>  
        </Drawer>
      </Spin>
    )
  }
}

export default News