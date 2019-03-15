import React from 'react';
import { Router, Link, Route, Switch, NavLink,Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import createHistory from 'history/createBrowserHistory';
import {withRouter} from 'react-router-dom'
import Dashboard from '../components/Dashboard'
import ListView from '../components/questions/ListView'
import Question from '../components/questions/Question'
import NotFound from '../components/shared/NotFound'
import Header from '../components/shared/Header'


export const history = createHistory();


class AppRouter extends React.Component{
  constructor(props){
    super(props)
  }

  componentDidMount(){

  }

 render(){

  let props = this.props;
  return (<Router history={history}>
     <div className="wrapper">
       <Header />
       <Switch>
        <Route exact path="/" render={(props) =>  (
             <Redirect to='/questions' />
        )} />
       <Route path="/questions" exact component={(ListView)}/>
       <Route path="/questions/new" exact component={(Question)}/>
       <Route path="/dashboard"  component={(Dashboard)}/>
       <Route component={NotFound}/>
       </Switch>
    </div>
   </Router>

)};

}



function mapStateToProps(state) {
  return {
    // error: state.users.error,
    // success_message: state.users.success_message,

  }
}

export default withRouter(connect(mapStateToProps, {})(AppRouter));


