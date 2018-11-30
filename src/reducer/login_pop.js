/**
 * @module  login_pop
 * login_pop
 * */
import * as C from '~/constants/action'

const loginPopState = false;
const login_pop = (state = loginPopState, action) => {
    // if (action) {
    switch (action.type) {
        case C.LOGIN_POPUP:
            state = action.data;
            return state;
        default:
            return state;
    }
    // }
};
export default login_pop