import * as actionTypes from '../actions/actionTypes'

const initialState = {
  loading: false,
  error: undefined,
  update: false,
  questionData: undefined
}

const questions = (state=initialState,action) => {

  switch(action.type){
    case actionTypes.REQUEST_SUCCESS: 
      return {...state,loading: true, error: undefined,update: false};
    case actionTypes.RESPONSE_ERROR:
      return{...state, loading: false, error: action.payload.error,update: false} 
    case actionTypes.GET_ALL_QUESTIONS_SUCCESS:
      return {...state,loading: false, lists: action.payload.response,update: false}
    case actionTypes.CREATE_QUESTION_SUCCESS:
      return {...state, loading: false, data: action.payload.response,update: false, success_message: "Successfully Created", active_page: action.payload.response.active_page}
    case actionTypes.UPDATE_QUESTION_SUCCESS:
      return {...state, loading: false, data: action.payload.response, update: true, questionData: undefined, success_message: "Successfully Updated"}
    case actionTypes.EDIT_QUESTION_SUCCESS:
      return {...state, loading: false, questionData: action.payload.item,update: false}
    case actionTypes.GET_MAPPING_SUCCESS:
      return {...state, loading: false, mappingData: action.payload.response, update: false}
    case actionTypes.DELETE_QUESTION_SUCCESS:
      return {...state,loading: false, deleteData: action.payload.response,update: false, success_message: "Successfully Deleted"}
    default: 
      return {...state, loading: false} 
  }  
}

export default questions

