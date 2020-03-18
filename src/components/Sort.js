import React from 'react';

class Sort extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            sortBy: 'name',
            sortvalue: 1
        }
    }

    onClick = (sortBy, sortValue) => {
        this.setState({
            sortBy: sortBy,
            sortvalue: sortValue
        }, () => { this.props.onSort(this.state) });
    }


    render() {
        return (
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6">
                <br />
                <div className="dropdown">
                    <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="true">Sắp Xếp <span className="caret" /> </button>
                    <ul className="dropdown-menu" aria-labelledby="dropdownMenu1">
                        <li onClick={() => this.onClick('name', 1)}><a role="button" className="sort_selected"><span className="fa fa-sort-alpha-asc pr-5">Tên A-Z</span></a></li>
                        <li onClick={() => this.onClick('name', -1)}><a role="button" className><span className="fa fa-sort-alpha-desc pr-5">Tên Z-A</span></a></li>
                        <li></li>
                        <li onClick={() => this.onClick('status', 1)} className="" >
                            <a className>Trạng Thái Kích Hoạt</a>
                        </li>
                        <li onClick={() => this.onClick('status', -1)}><a role="button" className>Trạng Thái Ẩn</a></li>
                    </ul>
                </div>
            </div>
        );
    }
}

export default Sort;