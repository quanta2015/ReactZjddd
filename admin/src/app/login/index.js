import React from 'react'
import { Icon, Form, Input, Button, Spin, message } from 'antd'
import { inject, observer } from 'mobx-react'
import { Redirect } from 'react-router-dom'
import token from 'util/token.js'

import './index.less'
import logo from 'icon/logo.svg';

@inject('mainStore')
@observer
class Login extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			loading: false,
			succ: false,
		}
	}

  callLogin = async(user) => {
    this.setState({ loading: true })
    let r = await this.props.mainStore.login(user)

    if (r && r.code === 200) {
      message.success(r.msg)
      this.setState({ loading: false, succ: true})
    } else {
      this.setState({ loading: false })
      message.error(r.msg)
    }
    
  }


	async componentDidMount() {
    let user = token.getUser()
    if (user!==null) {
      this.callLogin(user)
    }
  }

	goHome = () =>{
		this.props.history.push("/")
	}

	doLogin = () => {
		this.props.form.validateFields(async (err, values) => {
			if (err) {
				return
			}
      this.callLogin(values)
		})
	}

  onKeyUp=(e)=>{
    if(e.keyCode === 13) {
      this.doLogin()
    }
  }

	render() {
		const {getFieldDecorator} = this.props.form
		
		return (
			<Spin spinning={this.state.loading}>
				<div className='g-login' onKeyUp={this.onKeyUp}>
					{this.state.succ && <Redirect to='/'/>}
					
					<div className="m-login">
						<div className="m-logo">
							<div className="m-title">
								<label>浙江东都设计院</label>
                <span>后台管理系统</span>
							</div>
							<img src={logo}  onClick={this.goHome}/>
						</div>
						<div className='m-form'>
							<Form >
								<Form.Item>
									{getFieldDecorator('usr', {
										rules: [{required: true, message: ' 请输入帐号！'}],
										initialValue: ''
									})(
										<Input
											icon="search"
											size='large'
											placeholder="帐号"
											allowClear
											prefix={<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>}
										/>)}
								</Form.Item>
								<Form.Item>
									{getFieldDecorator('pwd', {
										rules: [{required: true, message: '请输入密码！'}],
									})(
										<Input.Password
											size='large'
											placeholder="密码"
											prefix={<Icon type="lock" style={{color: 'rgba(0,0,0,.25)'}}/>}
										/>)}
								</Form.Item>

								<Form.Item>
                  <Button type="primary" className="input-btn" onClick={this.doLogin} block >登 录</Button>
								</Form.Item>
							</Form>
						</div>
					</div>
				</div>
			</Spin>
		)
	}
}

export default Form.create()(Login)
