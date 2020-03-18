import React from 'react';
import TaskForm from './components/TaskForm';
import Control from './components/Control';
import TaskList from './components/TaskList';
// import demo from './trainning/demo'
import _ from 'lodash'
import './App.css'

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            isDisplayForm: false,
            filter: {
                name: '',
                status: -1,
            },
            sortBy: 'name',
            sortValue: 1
        }
    }

    componentWillMount() {
        if (localStorage && localStorage.getItem('tasks')) {
            var tasks = JSON.parse(localStorage.getItem('tasks'));
            this.setState({
                tasks: tasks,
                taskEditting: null,
            })
        }
    }

    onGenerateData = () => {
        var tasks = [
            {
                id: this.generateId(),
                name: 'Hoc lap trinh',
                status: true
            },
            {
                id: this.generateId(),
                name: 'C#',
                status: true
            },
            {
                id: this.generateId(),
                name: 'ASP.NET',
                status: false
            },
            {
                id: this.generateId(),
                name: 'PHP',
                status: true
            },
        ]
        this.setState({ tasks: tasks });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    s4() {
        return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    }

    generateId() {
        return this.s4() + this.s4() + '-' + this.s4() + this.s4() + '-' + this.s4() + this.s4();
    }
    onAddTask = () => {
        if (this.state.taskEditting !== null) {
            this.setState({
                taskEditting: null
            });
        } else this.onToggleForm();
    }

    onToggleForm = () => {
        this.setState({
            isDisplayForm: !this.state.isDisplayForm
        })
    }

    onCloseForm = () => {
        this.setState({
            isDisplayForm: false
        })
    }

    onOpenForm = () => {
        this.setState({
            isDisplayForm: true
        })
    }

    onGetData = (data) => {
        var { tasks } = this.state;
        if (data.id !== '') {
            var index = this.findOfId(data.id);
            var { tasks } = this.state;
            tasks[index].name = data.name;
            tasks[index].status = data.status;
            this.setState({
                tasks: tasks,
                taskEditting: null
            });
            localStorage.setItem('tasks', JSON.stringify(tasks));
        } else {
            data.id = this.generateId();
            tasks.push(data);
            this.setState({
                tasks: tasks
            })
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }

    onDelete = (id) => {
        var { tasks } = this.state;
        var idx = this.findOfId(id);
        tasks.splice(idx, 1)
        this.setState({
            tasks: tasks
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
        this.onCloseForm();
    }

    onEdit = (id) => {
        this.onOpenForm();
        var index = this.findOfId(id);
        var { tasks } = this.state;
        this.setState({ taskEditting: tasks[index] })
    }

    onFilter = (filterName, filterStatus) => {
        filterStatus = parseInt(filterStatus, 10);
        this.setState({
            filter: {
                name: filterName,
                status: filterStatus
            }
        })
    }

    ongetIdUpdateStatus = (id) => {
        var { tasks } = this.state;
        var idx = this.findOfId(id);
        tasks[idx].status = !tasks[idx].status;
        this.setState({ tasks });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    findOfId(id) {
        var { tasks } = this.state;
        var result = -1;
        tasks.forEach((value, index) => {
            if (value.id === id) {
                result = index
            }
        })
        return result;
    }

    onSearch = (keyword) => {
        this.setState({ keyword })
    }

    onSort = (sort) => {
        this.setState({
            sortBy: sort.sortBy,
            sortValue: sort.sortvalue
        })
    }

    render() {
        var { tasks, isDisplayForm, filter, keyword, sortBy, sortValue } = this.state;
        if (filter) {
            if (filter.name) {
                tasks = tasks.filter((task) => {
                    return task.name.toLowerCase().indexOf(filter.name.toLowerCase()) != -1;
                })
            }
            tasks = tasks.filter((task) => {
                if (filter.status === -1) {
                    return task
                } else {
                    return task.status === (filter.status === 1 ? true : false)
                }
            })
        }
        if (keyword) {
            tasks = tasks.filter((task) => {
                return task.name.toLowerCase().indexOf(keyword.toLowerCase()) != -1;
            })
        }
        if (sortBy === 'name') {
            tasks.sort((a, b) => {
                if(a.name > b.name) return sortValue
                else if(a.name < b.name) return -sortValue
                else return 0
            });
        } else {
            tasks.sort((a, b) => {
                if(a.status > b.status) return -sortValue
                else if(a.status < b.status) return sortValue
                else return 0
            });
        }
        return (
            <div className="App">
                <div className="container">
                    <div className="text-center"><h1>QUẢN LÝ CÔNG VIỆC</h1></div>
                    <hr />
                    <br />
                    <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                        {
                            isDisplayForm === true ? <TaskForm task={this.state.taskEditting} onCloseForm={this.onCloseForm} onGetData={this.onGetData} /> : ''
                        }
                        <div className={isDisplayForm === true ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" : "col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
                            <div className="row">
                                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                                    <button onClick={this.onAddTask} className="btn btn-primary">Thêm công việc <span className="glyphicon glyphicon-plus" /></button>
                                    <button onClick={this.onGenerateData} className="btn btn-danger ml-5">Generate Data <span className="glyphicon glyphicon-plus" /></button>
                                </div>
                                <Control onSort={this.onSort} onSearch={this.onSearch} />
                            </div>
                            <br />
                            <TaskList onFilter={this.onFilter} onEdit={this.onEdit} onDelete={this.onDelete} ongetIdUpdateStatus={this.ongetIdUpdateStatus} tasks={tasks} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;