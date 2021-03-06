import React, { Component } from 'react'
import swal from 'sweetalert';
import Pagination from 'react-paginate';
import { Link } from 'react-router-dom';
import { Table, notification } from 'antd';
import { getAllCompany, deleteCompany, getSearchedCompany } from '../Services/CompanyAPI';
import Loader from '../Loader/Loader';
import moment from 'moment';
export default class CompanyList extends Component {

    state = {
        companyData: [],
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
            title: "CompanyName",
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
            title: "Created Date",
            dataIndex: "dateCreated",
            key: "dateCreated",
            sorter: (a, b) => moment(a.dateCreated).unix() - moment(b.dateCreated).unix(),
            render: (dateCreated) => dateCreated !== null ? moment(dateCreated).format('MM-DD-YYYY') : '-'
        },
        {
            title: "Industry Name",
            dataIndex: "industryName",
            key: "industryName",
            sorter: (a, b) => a.industryName.localeCompare(b.industryName),
            render: (industryName) => (
                <div>{industryName ? industryName : '-'}</div>
            )
        },
        {
            title: "Website",
            dataIndex: "webSite",
            key: "webSite",
            render: (webSite) => (
                <div>{webSite ? webSite : '-'}</div>
            )
        },
        {
            title: "Phone Number",
            dataIndex: "phone",
            key: "phone",
            render: (phone) => (
                <div>{phone ? phone : '-'}</div>
            )
        },
        {
            title: "Edit",
            dataIndex: "edit",
            key: "edit",
            render: (text, record) => (
                <td><button className="btn btn-primary" onClick={(e) => this.editCompany(record.id)}>Edit</button></td>
            )
        },
        {
            title: "Delete",
            dataIndex: "delete",
            key: "delete",
            render: (text, record) => (
                <td><button className="btn btn-danger" onClick={(e) => this.deleteOneCompany(record.id)}>Delete</button></td>
            )
        }
    ]

    editCompany = (id) => {
        this.props.history.push(`/edit-company/${id}`)
    }

    handlePageClick = page => {
        const pageno = page.selected + 1;
        getAllCompany(pageno).then(res => {
            this.setState({ companyData: res.data.data, total: res.data.message, loading: false }, () => {
                let pageCount = this.state.total / this.state.limit
                this.setState({ pageCount: pageCount, currentPage: pageno })
            });
        }).catch(err => {
            this.setState({ loading: false });
            notification.error({
                message: 'Error',
                description: 'There was an error while fetching comapany data!'
            });
        });
    }

    deleteOneCompany(Id) {
        swal({
            title: "Are you sure you want to delete the selected Company?",
            text: "Once deleted, you will not be able to recover this data!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                deleteCompany(Id).then(res => {
                    notification.success({
                        message: 'Success',
                        description: 'Company Data deleted successfully!'
                    });
                    getAllCompany(this.state.currentPage).then(res => {
                        this.setState({ companyData: res.data.data, total: res.data.message });
                        let pageCount = this.state.total / this.state.limit
                        this.setState({ pageCount: pageCount });
                    }).catch(err => {
                        notification.error({
                            message: 'Error',
                            description: 'There was an error while fetching all company data'
                        });
                    });
                }).catch(err => {
                    notification.error({
                        message: 'Error',
                        description: 'There was an error while deleting company data'
                    });
                })
            } else {
                swal("Your company data is safe!");
            }
        });
    }

    getSearchStringData(e) {
        getSearchedCompany(this.state.currentPage, e.target.value).then(res => {
            let pageno = this.state.currentPage;
            this.setState({ companyData: res.data.data, total: res.data.message });
            let pageCount = this.state.total / this.state.limit
            this.setState({ pageCount: pageCount, currentPage: pageno })
        }).catch(err => {
            notification.error({
                message: 'Error',
                description: 'There was an error while searching through company data!'
            });
        })
    }

    render() {

        const { companyData } = this.state;

        return (
            <div>
                {this.state.loading ? <Loader /> :
                    <div class="container-fluid">
                        <div class="main-title-lg mb-5 d-flex justify-content-between">
                            <h1 class="h3 text-gray-800">Company List</h1>
                            <Link to="/add-company" class="btn btn-orange-search">Add Company</Link>
                        </div>
                        <div class="card shadow mb-4">
                            <div class="card-header py-3 d-sm-flex align-items-center justify-content-between">
                                <h6 class="m-0 font-weight-bold txt-orange">Company List </h6>
                                <div class="search-data position-relative">
                                    <input type="text" placeholder="Search Companies" onChange={(e) => this.getSearchStringData(e)} className="form-control" />
                                    <button className="searchbtn"><i class="fas fa-search"></i></button>
                                </div>
                            </div>
                            <Table dataSource={companyData} columns={this.columns} />
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
                }
            </div>
        )
    }
}
