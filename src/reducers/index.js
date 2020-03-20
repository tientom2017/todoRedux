import {combineReducers} from 'redux';
import tasks from './tasks'
import form from './form'
import search from './search'
import filterName from './filterName'
import filterStatus from './filterStatus'

const myReducer = combineReducers({
    tasks,
    form,
    search,
    filterName,
    filterStatus
});

export default myReducer;