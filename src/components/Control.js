import React from 'react';
import Search from './Search';
import Sort from './Sort';

class Control extends React.Component {
    constructor(props) {
        super(props);
    }

    onSearch = (keyword) => {
        this.props.onSearch(keyword)
    }

    onSort = (sortName, sortStatus) => {
        this.props.onSort(sortName, sortStatus);
    }

    render() {
        return (
            <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                <Search onSearch={this.onSearch} />
                <Sort onSort={this.onSort} />
            </div>
        );
    }
}

export default Control;