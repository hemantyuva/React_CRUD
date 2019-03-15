import * as actionTypes from './actionTypes'
import { getRequest, postRequest, patchRequest, deleteRequest } from "./helper"
import {reset} from 'redux-form';
export function createRequest(){
	return {
		type:  actionTypes.REQUEST_SUCCESS,
		payload: {}
	}
}

export function getAllQuestions(page) {
  return function (dispatch) {
    dispatch(createRequest())
    getRequest(`/questions?page=${page}`)
    .then(response => {
        dispatch(getAllQuestionsSuccess(response.data))
      }).catch(error=> {
        dispatch(createError(error.response))
      });

  };
}

export function getAllQuestionsSuccess(response){
  return function(dispatch) {  
    dispatch({
      type: actionTypes.GET_ALL_QUESTIONS_SUCCESS,
      payload: {
        response
      }
    });
  }
}



export function getMappings() {
  return function (dispatch) {
    dispatch(createRequest())
    getRequest(`/get_mapping`)
    .then(response => {
        dispatch(getMappingsSuccess(response.data))
      }).catch(error=> {
        dispatch(createError(error.response))
      });

  };
}

export function getMappingsSuccess(response){
  return function(dispatch) {  
    dispatch({
      type: actionTypes.GET_MAPPING_SUCCESS,
      payload: {
        response
      }
    });
  }
}


export function saveQuestions(activePage,data) {
  return function (dispatch) {
    dispatch(createRequest())
    postRequest('/questions',{question: data})
    .then(response => {
        dispatch(getAllQuestions(response.data.active_page))
        dispatch(saveQuestionsSuccess(response.data))
        dispatch(reset('questionForm'))
      }).catch(error=> {
        dispatch(createError(error.response))
      });

  };
}
export function saveQuestionsSuccess(response){
  return function(dispatch) {  
    dispatch({
      type: actionTypes.CREATE_QUESTION_SUCCESS,
      payload: {
        response
      }
    });
  }
}

export function updateQuestions(id,data,activePage) {
  return function (dispatch) {
    dispatch(createRequest())
    patchRequest(`/questions/${id}`,{question: data})
    .then(response => {
        dispatch(getAllQuestions(activePage))
        dispatch(updateQuestionsSuccess(response.data))
      }).catch(error=> {
        dispatch(createError(error.response))
      });

  };
}
export function updateQuestionsSuccess(response){
  return function(dispatch) {  
    dispatch({
      type: actionTypes.UPDATE_QUESTION_SUCCESS,
      payload: {
        response
      }
    });
  }
}


export function editQuestion(item){
  return function(dispatch){
    dispatch({
      type: actionTypes.EDIT_QUESTION_SUCCESS,
      payload: {
        item
      }
    })
  }
}





export function deleteQuestion(item,activePage){
  return function (dispatch) {
    dispatch(createRequest())
    deleteRequest(`/questions/${item.id}`)
    .then(response => {
        dispatch(getAllQuestions(activePage))
        dispatch(deleteQuestionsSuccess(response.data))
      }).catch(error=> {
        dispatch(createError(error.response))
      });

  };
}

export function deleteQuestionsSuccess(response){
  return function(dispatch) {  
    dispatch({
      type: actionTypes.DELETE_QUESTION_SUCCESS,
      payload: {
        response
      }
    });
  }
}



export  function createError(error){
 return function(dispatch) {  
    dispatch({
      type: actionTypes.RESPONSE_ERROR,
      payload: error
    });
  }
}