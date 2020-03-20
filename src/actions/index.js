import * as types from '../constants/ActionTypes';

export const listAll = () => {
    return {
        type: types.LIST_ALL
    }
}

export const addItem = (task) => {
    return {
        type: types.ADD_ITEM,
        task
    }
}

export const deleteItem = (id) => {
    return {
        type: types.DELTETE_ITEM,
        id
    }
}

export const updateStt = (id) => {
    return {
        type: types.UPDATE_STT,
        id
    }
}

export const toggleForm = () => {
    return {
        type: types.TOGGLE_FORM,
    }
}

export const closeForm = () => {
    return {
        type: types.CLOSE_FORM,
    }
}

export const openForm = () => {
    return {
        type: types.OPEN_FORM,
    }
}

export const search = (keyword) => {
    return {
        type: types.SEARCH,
        keyword
    }
}

export const filterName = (keyword) => {
    return {
        type: types.FILTER_NAME,
        keyword
    }
}

export const filterStatus = (keyword) => {
    return {
        type: types.FILTER_STATUS,
        keyword
    }
}