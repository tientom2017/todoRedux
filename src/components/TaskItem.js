import React from 'react';
import {connect} from 'react-redux';
import * as action from '../actions';

class TaskItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // color: 'red',
            // fontSize: 22,
        }
    }

    onHandlePutId = (id) => {
        this.props.onUpdateStt(id)
    }

    onDelete = (id) => {
        this.props.ondeleteItem(id)
    }

    onEdit = (id) => {
        this.props.onEdit(id)
    }

    render() {
        var { TaskValue, index } = this.props;
        return (
            <tr>
                <th scope="row">{index + 1}</th>
                <td>{TaskValue.name}</td>
                <td><span onClick={() => this.onHandlePutId(TaskValue.id)} className={TaskValue.status === true ? 'label label-success' : 'label label-danger'}>{TaskValue.status === true ? 'Kích hoạt' : 'Ẩn'}</span></td>
                <td>
                    <div>
                        <button onClick={() => this.onEdit(TaskValue.id)} className="btn btn-primary">Sửa</button>
                        <button onClick={() => this.onDelete(TaskValue.id)} className="btn btn-danger">Xóa</button>
                    </div>
                </td>
            </tr>
        );
    }
}

const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onUpdateStt: (id) => {
            dispatch(action.updateStt(id))
        },
        ondeleteItem: (id) => {
            dispatch(action.deleteItem(id))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskItem);
