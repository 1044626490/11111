/**
 * @module  loginReducer
 * 处理login的reducer函数
 * */
import * as C from '~/constants/action'
import indexDB from "~/constants/const"

let userinfoSession = sessionStorage.getItem(indexDB.userInfo);
let userinfoState = {};
userinfoSession ? userinfoState = JSON.parse(userinfoSession) : userinfoState = {};
const userInfo = (state = userinfoState, action) => {
    switch (action.type) {
        case C.GET_USERINGO:
            sessionStorage.setItem(indexDB.userInfo, JSON.stringify(action.data));
            state = action.data;
            return Object.assign({},state,action.data);
        default:
            return state;
    }
};

export default userInfo;