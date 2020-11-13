import React, { Component } from 'react';
import { Table, notification } from 'antd';
import { getAllRoles, deleteRole, getSearchedRole } from '../Services/Roles';
import Pagination from 'react-paginate';
import Footer from '../_layout/Footer/Footer';
import Header from '../_layout/Header/Header';
import SideNav from '../_layout/SideNav/SideNav';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';
import Loader from '../Loader/Loader';

export default class RolesList extends Component {

    state = {
        roleType: [],
        limit: 10,
        total: '',
        pageCount: '',
        currentPage: '',
        loading: false
    }

    componentDidMount() {
        this.setState({ loading: true })
    }


    handlePageClick = page => {
        const pageno = page.selected + 1;
        getAllRoles(pageno).then(res => {
            console.log('res => ', res.data.data);
            this.setState({ roleType: res.data.data, total: res.data.message, loading: false });
            let pageCount = this.state.total / this.state.limit
            this.setState({ pageCount: pageCount, currentPage: pageno });
        }).catch(err => {
            notification.open({
                message: 'Error',
                description: 'There was an error while fetching roles!'
            });
        });
    }

    columns = [
        {
            title: "Role Name",
            dataIndex: "name",
            key: "name",
            sorter: (a, b) => a.name.localeCompare(b.name)
        },
        {
            title: "RecordStatus",
            dataIndex: "recordStatus",
            key: "recordStatus"
        },
        {
            title: "Created By",
            dataIndex: "createdByUser",
            key: "createdByUser",
            sorter: (a, b) => a.createdByUser.localeCompare(b.createdByUser)
        },
        {
            title: "Edit",
            dataIndex: "edit",
            key: "edit",
            render: (text, record) => (
                <td><button className="btn btn-primary" onClick={(e) => this.editRole(record.id)}>Edit</button></td>
            )
        },
        {
            title: "Delete",
            dataIndex: "delete",
            key: "delete",
            render: (text, record) => (
                <td><button className="btn btn-danger" onClick={(e) => this.deleteOneRole(record.id)}>Delete</button></td>
            )
        }
    ]

    editRole(id) {
        this.props.history.push(`/edit-role/${id}`)
    }

    deleteOneRole(Id) {
        swal({
            title: "Are you sure you want to delete the selected Role?",
            text: "Once deleted, you will not be able to recover this data!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                deleteRole(Id).then(res => {
                    if (res.data.status === true) {
                        notification.open({
                            message: 'Success',
                            description: 'Project deleted successfully!'
                        });
                        getAllRoles(this.state.currentPage).then(res => {
                            this.setState({ roleType: res.data.data, total: res.data.message });
                            let pageCount = this.state.total / this.state.limit
                            this.setState({ pageCount: pageCount })
                        }).catch(err => {
                            notification.open({
                                message: 'Error',
                                description: 'There was an error while fetching all project'
                            });
                        });
                    } else {
                        notification.open({
                            message: 'Error',
                            description: 'There was an error while deleting project'
                        });
                    }
                }).catch(err => {
                    notification.open({
                        message: 'Error',
                        description: 'There was an error while deleting project'
                    });
                })
            } else {
                swal("Your Project data is safe!");
            }
        })
    }

    getSearchStringData(e) {
        getSearchedRole(this.state.currentPage, e.target.value).then(res => {
            this.setState({ roleType: res.data.data })
        }).catch(err => {
            notification.open({
                message: 'Error',
                description: 'There was an error while searching project!'
            });
        });
    }

    render() {

        const { roleType } = this.state;

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
                                    <h1 className="h3 text-gray-800">Role List</h1>
                                    <Link to="/add-roles" className="btn btn-orange-search">Add Role</Link>
                                </div>
                                <div className="card shadow mb-4">
                                    <div className="card-header py-3 d-sm-flex align-items-center justify-content-between">
                                        <h6 className="m-0 font-weight-bold txt-orange">Role List</h6>
                                        <div className="search-data position-relative">
                                            <input type="text" onChange={(e) => this.getSearchStringData(e)} className="form-control" />
                                            <button className="searchbtn"><i className="fas fa-search"></i></button>
                                        </div>
                                    </div>
                                    <Table dataSource={roleType} columns={this.columns} />
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
                                        nextClassName={"page-item"}
                                        previousLinkClassName={"page-link"}
                                        nextLinkClassName={"page-link"}
                                        // marginPagesDisplayed={totalPages}
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
                            <Footer />
                        </div>
                    </div>
                }
            </div>
        )
    }


}