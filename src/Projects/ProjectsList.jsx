import React, { Component } from 'react'
import { getAllProjects, getSearchedProject, deleteProject } from '../Services/ProjectAPI';
import Footer from '../_layout/Footer/Footer'
import Header from '../_layout/Header/Header'
import SideNav from '../_layout/SideNav/SideNav'
import { Link } from 'react-router-dom'
import Pagination from 'react-paginate';
import swal from 'sweetalert';
import { notification, Table } from 'antd';
import Loader from '../Loader/Loader';
import moment from 'moment'
export default class ProjectsList extends Component {

    state = {
        projectType: [],
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
        getAllProjects(pageno).then(res => {
            console.log('Res => ', res);

            this.setState({ projectType: res.data.data, total: res.data.message, loading: false });
            let pageCount = this.state.total / this.state.limit
            this.setState({ pageCount: pageCount, currentPage: pageno })
        }).catch(err => {
            notification.open({
                message: 'Error',
                description: 'There was an error while fetching projects!'
            });
        });
    }

    columns = [
        {
            title: "Project Name",
            dataIndex: "name",
            key: "name",
            sorter: (a, b) => a.name.localeCompare(b.name)
        },
        {
            title: "Building Name",
            dataIndex: "buildingTypeName",
            key: "buildingTypeName",
            sorter: (a, b) => a.buildingTypeName.localeCompare(b.buildingTypeName),
            render: (buildingTypeName) => buildingTypeName !== "" ? buildingTypeName : '-'
        },
        {
            title: "Created Date",
            dataIndex: "dateCreated",
            key: "dateCreated",
            sorter: (a, b) => moment(a.dateCreated).unix() - moment(b.dateCreated).unix(),
            render: (dateCreated) => dateCreated !== null ? moment(dateCreated).format('MM-DD-YYYY') : '-'
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
            title: "Delete",
            dataIndex: "delete",
            key: "delete",
            render: (text, record) => (
                <td><button className="btn btn-danger" onClick={(e) => this.deleteProject(record.id)}>Delete</button></td>
            )
        }
    ]

    deleteProject(Id) {
        swal({
            title: "Are you sure you want to delete the selected Project?",
            text: "Once deleted, you will not be able to recover this data!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                deleteProject(Id).then(res => {
                    if (res.data.status === true) {
                        notification.open({
                            message: 'Success',
                            description: 'Project deleted successfully!'
                        });
                        getAllProjects(this.state.currentPage).then(res => {
                            this.setState({ projectType: res.data.data, total: res.data.message });
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
        getSearchedProject(this.state.currentPage, e.target.value).then(res => {
            this.setState({ projectType: res.data.data })
        }).catch(err => {
            notification.open({
                message: 'Error',
                description: 'There was an error while searching project!'
            });
        })
    }

    render() {

        const { projectType } = this.state;

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
                                    <h1 className="h3 text-gray-800">Project List</h1>
                                    <Link to="/add-project" className="btn btn-orange-search">Add Project</Link>
                                </div>
                                <div className="card shadow mb-4">
                                    <div className="card-header py-3 d-sm-flex align-items-center justify-content-between">
                                        <h6 className="m-0 font-weight-bold txt-orange">Project List</h6>
                                        <div className="search-data position-relative">
                                            <input type="text" onChange={(e) => this.getSearchStringData(e)} className="form-control" />
                                            <button className="searchbtn"><i className="fas fa-search"></i></button>
                                        </div>
                                    </div>
                                    <Table dataSource={projectType} columns={this.columns} />
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
