import React from 'react';
import {connect} from 'react-redux';
import {withRouter,Link} from 'react-router-dom'
import MyAlert from '../helpers/MyAlert';
import { getAllQuestions,saveQuestions,editQuestion,updateQuestions,deleteQuestion,getMappings} from '../../actions/questions'
import Question from '../questions/Question'
import _ from 'lodash'
import { Field, reduxForm, change,reset} from 'redux-form';
import Pagination from "react-js-pagination";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';


class ListView extends React.Component{
  constructor(props){
    super(props);
    this.state={
      open: false,
      activePage: 1,
      lists: [],
      editable_id: null,
      mappingData: []
    };
    this.onEdit = this.onEdit.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this)
  }


  componentDidMount() {
  	this.props.getMappings()
  	this.props.getAllQuestions(this.state.activePage)
  }
  handlePageChange(value){
  	this.setState({activePage: value})
  	this.props.getAllQuestions(value)
  }

  componentWillReceiveProps(nextProps){
    if(!_.isEmpty(nextProps.lists)){
    	this.setState({lists: nextProps.lists})
    }
    if(!_.isEmpty(nextProps.mappingData)){
    	this.setState({mappingData: nextProps.mappingData})
    }
    if(nextProps.questionData && !nextProps.update){
    	this.setState({editable_id: nextProps.questionData.id,initialValues: nextProps.questionData})
    }
    if(nextProps.update){
    	this.setState({editable_id: null})
    }
  }
  onSubmit(data){
  	if(this.state.editable_id == null){
  		this.props.saveQuestions(this.state.activePage, data)
  	}else{
  		this.props.updateQuestions(this.state.editable_id,data,this.state.activePage)
  	}
  }

  onEdit(item){
  	this.props.editQuestion(item)
  }

  onDelete(item){
  	confirmAlert({
      title: 'Confirm to delete',
      message: 'Are you sure to do this.',
      buttons: [
        {
          label: 'Yes',
          onClick: () => this.props.deleteQuestion(item,this.state.activePage)
        },
        {
          label: 'No',
          onClick: () => null
        }
      ]
    })
  
  }

  render(){

  	const { handleSubmit,userProfileData, pristine, reset, submitting} = this.props;
  	let {lists} = this.state
	  return (
	  	<div>
	 			 <MyAlert {...this.props} />

	 			<div className="container">
				  <div className="row col-md-12 col-md-offset-2 custyle">
				  <form className="form-horizontal" onSubmit={handleSubmit(this.onSubmit)} >
				    <table className="table table-striped custab table-bordered">
				   		<thead>

				        <tr>
				            <th>ID</th>
				            <th>Appears day</th>
				            <th>Frequency</th>
				            <th>PRI</th>
				            <th>Question</th>
				            <th>Question type</th>
				            <th>Required?</th>
				            <th>Teaming stages</th>
				            <th>Conditions</th>
				            <th>Mapping</th>
				            <th className="text-center">Action</th>
				        </tr>
				    	</thead>
				    	{
				    		lists.map((item) => 
					    		{
					    	if(this.state.editable_id == item.id){
					    		return <Question  {...this.state} />
		            }else{
		            	return(<tr>
		                	<td>{item.id}</td>
		                	<td>{item.appears_day}</td>
		                	<td>{item.frequency}</td>
		                	<td>{item.pri}</td>
		                	<td>{item.question}</td>
		                	<td>{item.question_type}</td>
		                	<td>{item["required?"]}</td>
		                	<td>{item.teaming_stages}</td>
		                	<td>{item.conditions}</td>
		                	<td>{item.mapping_id}</td>
		                	<td className="text-center">
		                		<a className='btn btn-info btn-xs' href="javascript:void(0)" onClick={()=> this.onEdit(item)}>
		                	 		<span className="glyphicon glyphicon-edit"></span> Edit
		                	 	</a>
		                 		
		                 		<a href="javascript:void(0)" className="btn btn-danger btn-xs" onClick={()=> this.onDelete(item)}><span className="glyphicon glyphicon-remove"></span> Del</a></td>
		            		</tr>)
		            }
					    	})
				    	}
				    </table>
				    {
				      this.state.editable_id === null ? <Question {...this.state} /> : null
				    }
				  </form>

				   <Pagination
				   		hideNavigation
		          activePage={this.state.activePage}
		          itemsCountPerPage={10}
		          totalItemsCount={this.props.totalCount || 0}
		          onChange={this.handlePageChange}
		        />
				    </div>
				</div>
			</div>
	  );
	};
}


function mapStateToProps(state) {
	return {
		error: state.questions.error,
		success_message: state.questions.success_message,
		lists: state.questions.lists && state.questions.lists.questions,
		questionData: state.questions.questionData,
		initialValues: state.questions.questionData,
		update: state.questions.update,
		mappingData: state.questions.mappingData,
		totalCount: state.questions.lists && state.questions.lists.total,
	}
}


ListView = reduxForm({
  form: 'questionForm',
  enableReinitialize : true,
})(ListView);

export default ListView = connect(mapStateToProps,
{
  getAllQuestions,
  saveQuestions,
  editQuestion,
  updateQuestions,
  deleteQuestion,
  getMappings
}

)(ListView);

