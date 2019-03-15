import { combineReducers } from "redux"
import { routerReducer } from "react-router-redux"
import { reducer as formReducer } from 'redux-form'
import questions from './questions'
export default combineReducers({
  router: routerReducer,
  form: formReducer,
  questions: questions
})
