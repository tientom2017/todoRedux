import React from 'react';
import * as actions from '../actions'
import {connect} from 'react-redux'

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            keyword: '',
        }
    }

    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        this.setState({
            [name]: value,
        })
    }

    onSearch = () => {
        this.props.onSearch(this.state.keyword)
    }

    render() {
        return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <br />
                <div className="input-group">
                    <input type="text" name="keyword" className="form-control" onChange={this.onChange} placeholder="Search" id="txtSearch" />
                    <div className="input-group-btn">
                        <button onClick={this.onSearch} className="btn btn-primary" type="submit">Search</button>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onSearch: (keyword) => {
            dispatch(actions.search(keyword))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search)