import React from 'react';
import TaskItem from './TaskItem';
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

    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.props.onFilter(
            name === 'filterName' ? value : this.state.filterName,
            name === 'filterStatus' ? value : this.state.filterStatus
        );
        this.setState({
            [name]: value
        });
    }

    render() {
        var { tasks } = this.props;
        console.log(tasks);
        var { filterName, filterStatus } = this.state
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
                                    onChange={this.onChange}
                                />
                            </div>
                        </td>
                        <td>
                            <select
                                className="form-control col-md-4 w-50"
                                aria-labelledby="dropdownMenu1"
                                name="filterStatus"
                                value={filterStatus}
                                onChange={this.onChange}
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
        tasks: state.tasks
    }
}

export default connect(mapStateToProps, null)(TaskList);