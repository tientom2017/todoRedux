import * as types from '../constants/ActionTypes';

var data = JSON.parse(localStorage.getItem('tasks'));
var initialState = data ? data : [];

var s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
}

var generateId = () => {
    return s4() + s4() + '-' + s4() + s4() + '-' + s4() + s4();
}

var findOfId = (id, arr) => {
    var result = -1;
    arr.forEach((value, index) => {
        if (value.id === id) {
            result = index
        }
    })
    return result;
}

var myReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.LIST_ALL:
            return state;

        case types.ADD_ITEM:
            var newTask = {
                id: generateId(),
                name: action.task.name,
                status: (action.task.status === 'true' || action.task.status === true) ? true : false
            }
            state.push(newTask);
            localStorage.setItem('tasks', JSON.stringify(state))
            return [...state];

        case types.UPDATE_STT:
            var index = findOfId(action.id, state);
            var cloneTask = { ...state[index] };
            cloneTask.status = !cloneTask.status
            state[index] = cloneTask;
            localStorage.setItem('tasks', JSON.stringify(state));
            return [...state];

        case types.DELTETE_ITEM:
            var index = findOfId(action.id, state);
            state.splice(index, 1);
            localStorage.setItem('tasks', JSON.stringify(state));
            return [...state];
        default: return state;
    }
}

export default myReducer;