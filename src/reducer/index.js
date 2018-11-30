/**
 * @module  combineReducers
 * 合并reducer函数
 *@param {object} 需要合并的reducer
 * */
import {combineReducers} from 'redux'
import loginReducer from './loginReducer';
import userInfo from './userInfo';
import spin from './spin'
import login_pop from "./login_pop"
import meun_title from "./meun_title"

export default combineReducers({loginReducer, spin,login_pop,meun_title,userInfo});