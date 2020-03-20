import * as types from '../constants/ActionTypes';

var isDisplayForm = false;


var myReducer = (state = isDisplayForm, action) => {
    switch (action.type) {
        case types.TOGGLE_FORM:
            state = !state
            return state;

        case types.OPEN_FORM:
            state = true
            return state;

        case types.CLOSE_FORM:
            state = false
            return state;

        default: return state;
    }
}

export default myReducer;