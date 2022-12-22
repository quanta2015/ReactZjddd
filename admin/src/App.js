import React from 'react'
import { inject } from 'mobx-react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import Loadable from 'component/Loadable'
import NavWrapper from 'component/NavWrapper'


@inject('mainStore')
class App extends React.Component {
	constructor(props) {
		super(props)
	}


	async componentDidMount() {
    let currUser = this.props.mainStore.currUser
    if ((typeof(currUser) === 'undefined')||(currUser === null)) {
    	console.log(this.props.history)
      // this.props.history.push("/login")
    }
  }

	render() {
		return (
			<Router>
				<Switch>
					<Route exact path='/login' component={Loadable({ loader: () => import('./app/login') })}   />
					<Route path='/' render={() => (
						<div className='app-root'>
							<NavWrapper>
								<Switch>
									<Route exact path='/'     component={Loadable({ loader: () => import('./app/carl')})}  />
									<Route exact path='/news' component={Loadable({ loader: () => import('./app/news')})}  />
									<Route exact path='/proj' component={Loadable({ loader: () => import('./app/proj')})}  />
									<Route exact path='/desi' component={Loadable({ loader: () => import('./app/desi')})}  />
									<Route exact path='/msg' component={Loadable({ loader: () => import('./app/msg')})}  />
                	<Route exact path='/conf' component={Loadable({ loader: () => import('./app/conf')})}  />
                </Switch>
							</NavWrapper>
						</div>
					)}/>
				</Switch>
			</Router>
		)
	}
}

export default App
