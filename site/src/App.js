import React from 'react'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import Loadable from 'component/Loadable'
import NavWrapper from 'component/NavWrapper'



class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route path='/' render={() => (
            <div className='app-root'>
              <NavWrapper>
                <Switch>
                  <Route exact path='/'     component={Loadable({loader:()=>import('./app/home')})}/>
                  <Route exact path='/intr' component={Loadable({loader:()=>import('./app/about/intr')})}/>
                  <Route exact path='/fram' component={Loadable({loader:()=>import('./app/about/fram')})}/>
                  <Route exact path='/qual' component={Loadable({loader:()=>import('./app/about/qual')})}/>
                  <Route exact path='/honr' component={Loadable({loader:()=>import('./app/about/honr')})}/>
                  <Route exact path='/bran' component={Loadable({loader:()=>import('./app/about/bran')})}/>
                  
                  <Route exact path='/news' component={Loadable({loader:()=>import('./app/news')})}/>
                  <Route exact path='/proj' component={Loadable({loader:()=>import('./app/proj')})}/>
                  <Route exact path='/desi' component={Loadable({loader:()=>import('./app/desi')})}/>
                  <Route exact path='/cont' component={Loadable({loader:()=>import('./app/cont')})}/>
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
