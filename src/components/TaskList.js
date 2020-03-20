import React from 'react';
import TaskItem from './TaskItem';
import * as action from '../actions'
import { connect } from 'react-redux';

class TaskList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filterName: '',
            filterStatus: -1
        }
    }

    ongetIdUpdateStatus = (id) => {
        this.props.ongetIdUpdateStatus(id);
    }

    onDelete = (id) => {
        this.props.onDelete(id);
    }

    onEdit = (id) => {
        this.props.onEdit(id)
    }

    onGetFilterName = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.props.onGetFilterName(name === 'filterName' ? value : '')
    }

    onGetFilterStatus = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.props.onGetFilterStatus(name === 'filterStatus' ? value : '')
    }


    render() {
        var { tasks, searchKeyword, filterName, filterStatus } = this.props;
        if (searchKeyword) {
            tasks = tasks.filter((task) => {
                return task.name.toLowerCase().indexOf(searchKeyword.toLowerCase()) != -1;
            })
        }
        if(filterName) {
            tasks = tasks.filter((task) => {
                return task.name.toLowerCase().indexOf(filterName.toLowerCase()) != -1;
            })
        }
        tasks = tasks.filter((task) => {
            if(filterStatus) {
                if(parseInt(filterStatus, 10) === -1) return task;
                if(parseInt(filterStatus, 10) === 0) return task.status === false
                if(parseInt(filterStatus, 10) === 1) return task.status === true
            }
            return task;
        })
        return (
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">STT</th>
                        <th scope="col">Tên</th>
                        <th scope="col">Trạng thái</th>
                        <th scope="col">Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">#</th>
                        <td>
                            <div className="input-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="@,a,..."
                                    id="txtSearch"
                                    name="filterName"
                                    value={filterName}
                                    onChange={this.onGetFilterName}
                                />
                            </div>
                        </td>
                        <td>
                            <select
                                className="form-control col-md-4 w-50"
                                aria-labelledby="dropdownMenu1"
                                name="filterStatus"
                                value={filterStatus}
                                onChange={this.onGetFilterStatus}
                            >
                                <option value={-1}>Tất cả</option>
                                <option value={1}>Kích hoạt</option>
                                <option value={0}>Ẩn</option>
                            </select>
                        </td>
                        <td>
                            
                        </td>
                    </tr>
                    {
                        tasks.map((value, index) => {
                            return <TaskItem onEdit={this.props.onEdit} onDelete={this.onDelete} ongetIdUpdateStatus={this.ongetIdUpdateStatus} index={index} TaskValue={value} />
                        })
                    }
                </tbody>
            </table>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        tasks: state.tasks,
        searchKeyword: state.search,
        filterName: state.filterName,
        filterStatus: state.filterStatus,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onGetFilterName: (filterName) => {
            dispatch(action.filterName(filterName))
        },
        onGetFilterStatus: (filterStatus) => {
            dispatch(action.filterStatus(filterStatus))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);