import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/index'

class TaskForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            status: false,
        }

    }

    componentWillMount() {
        if (this.props.task && this.props.task != null) {
            this.setState({
                id: this.props.task.id,
                name: this.props.task.name,
                status: this.props.task.status
            })
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.task && nextProps.task != null) {
            this.setState({
                id: nextProps.task.id,
                name: nextProps.task.name,
                status: nextProps.task.status
            })
        } else this.setState({
            id: '',
            name: '',
            status: false
        })
    }

    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        if (name === 'status') {
            value = target.value === 'true' ? true : false;
        }
        this.setState({
            [name]: value
        })
    }

    onSubmit = (event) => {
        event.preventDefault();
        // this.props.onGetData(this.state);
        this.props.onAddTask(this.state);
        this.onClear();
    }
    onClear = () => {
        this.setState({
            name: '',
            status: false
        });
        this.props.onCloseForm()
    }

    render() {
        return (
            <div className="col-xs-4 col-sm-4 col-md-4 col-lg-4">
                <div class="panel panel-primary">
                    <div class="panel-heading"> {this.props.task != null ? 'Sửa công việc' : 'Thêm công việc'} <i onClick={this.props.onCloseForm} className="fa fa-times-circle text-right float-r"></i></div>
                    <div class="panel-body">
                        <form onSubmit={this.onSubmit}>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Nội dung</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="exampleInputPassword1"
                                    placeholder="text"
                                    name="name"
                                    value={this.state.name}
                                    onChange={this.onChange}
                                />
                            </div>
                            <div className="form-group">
                                <div className="dropdown">
                                    <select name="status" value={this.state.status} onChange={this.onChange} className=" form-control dropdown" aria-labelledby="dropdownMenu1">
                                        <option value={true}>Kích hoạt</option>
                                        <option value={false}>Ẩn</option>
                                    </select>
                                </div>
                            </div>
                            <div>
                                <button type="submit" className="btn btn-primary">Lưu lại</button>
                                <button onClick={this.onClear} type="button" className="btn btn-danger">Hủy bỏ</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {

    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onAddTask: (task) => {
            dispatch(actions.addItem(task));
        },
        onCloseForm: () => {
            dispatch(actions.closeForm())
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskForm);