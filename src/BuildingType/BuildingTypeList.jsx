import React, { Component } from 'react'
import swal from 'sweetalert';
import Pagination from 'react-paginate';
import { Link } from 'react-router-dom';
import { Table, notification } from 'antd';
import Footer from '../_layout/Footer/Footer';
import Header from '../_layout/Header/Header';
import SideNav from '../_layout/SideNav/SideNav';
import { getAllBuildingType, deleteBuildingType, getSearchedBuildingType } from '../Services/BuildingType';
import Loader from '../Loader/Loader';

export default class BuildingTypeList extends Component {

    state = {
        buildingType: [],
        limit: 10,
        total: '',
        pageCount: '',
        currentPage: '',
        loading: false
    }

    componentDidMount() {
        this.setState({ loading: true });
    }

    columns = [
        {
            title: "Building Name",
            dataIndex: "name",
            key: "name",
            sorter: (a, b) => a.name.localeCompare(b.name)
        },
        {
            title: "Created By",
            dataIndex: "createdByUser",
            key: "createdByUser",
            sorter: (a, b) => a.createdByUser.localeCompare(b.createdByUser)
        },
        {
            title: "Record Status",
            dataIndex: "recordStatus",
            key: "recordStatus"
        },
        {
            title: "Edit",
            dataIndex: "edit",
            key: "edit",
            render: (text, record) => (
                <td><button className="btn btn-primary" onClick={(e) => this.editBuildingType(record.id)}>Edit</button></td>
            )
        },
        {
            title: "Delete",
            dataIndex: "delete",
            key: "delete",
            render: (text, record) => (
                <td><button className="btn btn-danger" onClick={(e) => this.deleteBuildingType(record.id)}>Delete</button></td>
            )
        }
    ]

    editBuildingType(id) {
        this.props.history.push(`/edit-building-type/${id}`)
    }

    handlePageClick = page => {
        const pageno = page.selected + 1;
        getAllBuildingType(pageno).then(res => {
            this.setState({ buildingType: res.data.data, total: res.data.message, loading: false });
            let pageCount = this.state.total / this.state.limit
            this.setState({ pageCount: pageCount, currentPage: pageno })
        }).catch(err => {
            notification.open({
                message: 'Error',
                description: 'There was an error while fetching Building Type!'
            });
        });
    };

    deleteBuildingType(Id) {
        swal({
            title: "Are you sure you want to delete the selected Building Type?",
            text: "Once deleted, you will not be able to recover this data!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                deleteBuildingType(Id).then(res => {
                    notification.open({
                        message: 'Success',
                        description: 'Building type deleted successfully!'
                    });
                    getAllBuildingType(this.state.currentPage).then(res => {
                        this.setState({ buildingType: res.data.data, total: res.data.message });
                        let pageCount = this.state.total / this.state.limit;
                        this.setState({ pageCount: pageCount });
                    }).catch(err => {
                        notification.open({
                            message: 'Error',
                            description: 'There was an error while fetching building type project!'
                        });
                    });
                }).catch(err => {
                    notification.open({
                        message: 'Error',
                        description: 'There was an error while deleting building type!'
                    });
                })
            } else {
                swal("Your Building Type data is safe!");
            }
        });
    }

    getSearchStringData(e) {
        getSearchedBuildingType(this.state.currentPage, e.target.value).then(res => {
            this.setState({ buildingType: res.data.data })
        }).catch(err => {
            notification.open({
                message: 'Error',
                description: 'There was an error while searching building type!'
            });
        })
    }

    render() {

        const { buildingType } = this.state;

        return (
            <div>
                {this.state.loading ? <Loader /> :
                    <div className="d-flex">
                        <SideNav />
                        <div id="content-wrapper" className="d-flex flex-column w-100 content-relative">
                            <div className="content">
                                <Header />
                            </div>
                            <div className="container-fluid">
                                <div className="main-title-lg mb-5 d-flex justify-content-between">
                                    <h1 className="h3 text-gray-800">Building Type</h1>
                                    <Link to="/add-building-type" className="btn btn-orange-search">Add Building Type</Link>
                                </div>
                                <div className="card shadow mb-4">
                                    <div className="card-header py-3 d-sm-flex align-items-center justify-content-between">
                                        <h6 className="m-0 font-weight-bold txt-orange">Building Type List </h6>
                                        <div className="search-data position-relative">
                                            <input type="text" onChange={(e) => this.getSearchStringData(e)} className="form-control" />
                                            <button className="searchbtn"><i className="fas fa-search"></i></button>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <div className="table-responsive">
                                            <Table dataSource={buildingType} columns={this.columns} />
                                            <Pagination
                                                initialPage={0}
                                                previousLabel={"Previous"}
                                                nextLabel={"Next"}
                                                breakLabel={"..."}
                                                breakClassName={"page-item"}
                                                breakLinkClassName={"page-link"}
                                                pageClassName={"page-item"}
                                                previousClassName={"page-item"}
                                                pageLinkClassName={"page-link"}
                                                pageRangeDisplayed={5}
                                                nextClassName={"page-item"}
                                                previousLinkClassName={"page-link"}
                                                nextLinkClassName={"page-link"}
                                                // marginPagesDisplayed={this.state.pageCount}
                                                pageRangeDisplayed={this.state.limit}
                                                pageCount={this.state.pageCount}
                                                pageRangeDisplayed={10}
                                                onPageChange={this.handlePageClick}
                                                containerClassName={"pagination"}
                                                subContainerClassName={""}
                                                activeClassName={"active"}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <Footer />
                        </div>
                    </div>
                }
            </div>
        )
    }
}
