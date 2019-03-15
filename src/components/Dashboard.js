import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'
import MyAlert from './helpers/MyAlert';

class Dashboard extends React.Component{
  constructor(props){
    super(props);
    this.state={
      open: false,
    };
  }


  componentDidMount() {
  }

  render(){
  	let {error, success_message} = this.props;
	  return (
	  	<div>
	 			 <MyAlert {...this.props} />
			</div>
	  );
	};
}


function mapStateToProps(state) {
	return {
		// error: state.users.error,
		// success_message: state.users.success_message,
	}
}

export default withRouter(connect(mapStateToProps, {})(Dashboard));
