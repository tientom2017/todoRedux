import React from 'react';

class TaskItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // color: 'red',
            // fontSize: 22,
        }
    }

    onHandlePutId = (id) => {
        this.props.ongetIdUpdateStatus(id)
    }

    onDelete = (id) => {
        this.props.onDelete(id)
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

export default TaskItem;
