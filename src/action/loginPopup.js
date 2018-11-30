import * as Actions from '~/constants/action';
export const login_Popup=(data) => {
  return {
        type:Actions.LOGIN_POPUP,
        data:data 
    }
  }