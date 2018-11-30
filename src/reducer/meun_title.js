import * as C from '~/constants/action'

const meunState = '1';
const meun_title = (state = meunState, action) => {
    // if (action) {
    switch (action.type) {
        case C.MEUN_TITLE:
            state = action.data;
            return state;
        default:
            return state;
    }
    // }
};
export default meun_title