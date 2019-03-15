import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom'
import MyAlert from '../helpers/MyAlert';
import TextField from '../fields/renderTextField'
import selectField from '../fields/renderSelectField'
import RadioBtn from '../fields/renderRadioBtn'
import { Field, reduxForm, change,reset} from 'redux-form';
import {required} from '../validation/validation'
import {appConstants} from '../../constants/constants'

//import {getAllQuestions} from '../../actions/questions'
import _ from 'lodash'
class Question extends React.Component{
  constructor(props){
    super(props);
    this.state={
      open: false,   
    };
    this.renderRows = this.renderRows.bind(this);
    this.renderWithTable = this.renderWithTable.bind(this);
  }


  componentDidMount() {
  	
  }

  componentWillReceiveProps(nextProps){
    // if(!_.isEmpty(nextProps.lists)){
    // 	this.setState({lists: nextProps.lists})
    // }
  }
  

  renderWithTable(){
  	return(
  		<table className="table table-striped custab table-responsive table-bottom" style={{margin: 0}}>
	  		{this.renderRows()}
			</table>)
  }

  renderRows(){
  	debugger
  
  	return(
  		<React.Fragment>
  			<tr>
          <Field
            name="appears_day"
            component={TextField}
            type="text"
            label="Appears day"
            validate={[required]}
            placeholder="Enter Appears day"
          />

          <Field
            name="frequency"
            component={TextField}
            type="number"
            label="Frequency"
            validate={[required]}
            placeholder="Enter Frequency"
          />

          <Field
            name="pri"
            component={TextField}
            type="number"
            label="PRI"
            validate={[required]}
            placeholder="Enter PRI"
          />

          <Field
            name="question"
            component={TextField}
            type="text"
            label="Question "
            validate={[required]}
            placeholder="Enter Question"
          />

           <Field
            name="question_type"
            component={TextField}
            type="text"
            label="Question Type "
            validate={[required]}
            placeholder="Enter Question Type"
          />

   
 
          <Field
            component={RadioBtn}
            name="required?"
            initialValue={this.props.initialValues && (this.props.initialValues["required?"] == 'Yes' ? {value: 'yes'} : {value: 'no'})}
            options={[{name: 'yes', value: 'yes'},{name: "no", value: 'no'}]}
            // radioButtonHandler={this.radioButtonHandler}
            divClass="col-md-6 col-12 mb-3 mb-md-0"
            validate={[required]}
          />

          <Field
            name="teaming_stages"
            component={TextField}
            type="text"
            label="Teaming Stages"
            validate={[required]}
            placeholder="Enter Teaming Stages"
          />

          <Field
            name="conditions"
            component={TextField}
            type="text"
            label="Conditions"
            validate={[required]}
            placeholder="Enter Conditions"
          />

          <div className="map-form">
            <Field
              name="mapping_id"
              component={selectField}
              selectClass="form-control custum-select mapping-select"
              validate={[required]}
              >
              <option value="">Select Mapping</option>
              {this.props.mappingData.map((mp, index)=>(
                <option key={index} value={mp.value}>{mp.name}</option>
                ))}
            </Field>
          </div>

          <div className="form-group">
            <div className="col-md-12 text-right">
              <button type="submit" className="btn btn-primary btn-lg">Submit</button>
            </div>
          </div>
        </tr>
  		</React.Fragment>
  		)
  }



  render(){
	  return (
	  	<React.Fragment>
	  		{this.props.editable_id !== null ? this.renderRows() : this.renderWithTable()}
			</React.Fragment>
		
	  )
	}
}




function mapStateToProps(state) {
	return {
		error: state.questions.error,
		lists: state.questions.lists
	}
}

export default withRouter(connect(mapStateToProps, {})(Question));
