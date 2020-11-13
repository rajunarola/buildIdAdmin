import React, { Component } from 'react'
import { deleteCompanyAddress, getCompanyAddress, getSearchedCompanyAddress } from '../Services/CompanyAPI';
import swal from 'sweetalert';
import Pagination from 'react-paginate';
import { Link } from 'react-router-dom';
import { Table, notification } from 'antd';
import Header from '../_layout/Header/Header';
import Footer from '../_layout/Footer/Footer';
import SideNav from '../_layout/SideNav/SideNav';

export default class CompanyAddressList extends Component {

    state = {
        companyAddressData: [],
        limit: 10,
        total: '',
        pageCount: '',
        currentPage: ''
    }

    columns = [
        {
            title: "Company Address Name",
            dataIndex: "companyName",
            key: "companyName",
            sorter: (a, b) => a.companyName.localeCompare(b.companyName)
        },
        {
            title: "RecordStatus",
            dataIndex: "recordStatus",
            key: "recordStatus"
        },
        {
            title: "Country",
            dataIndex: "country",
            key: "country"
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
            title: "Delete",
            dataIndex: "delete",
            key: "delete",
            render: (text, record) => (
                <td><button className="btn btn-danger" onClick={(e) => this.deleteOneCompanyAddress(record.id)}>Delete</button></td>
            )
        }
    ]

    handlePageClick = page => {
        console.log('page => ', page);

        const pageno = page.selected + 1;
        getCompanyAddress(pageno).then(res => {
            this.setState({ companyData: res.data.data, total: res.data.message });
            let pageCount = this.state.total / this.state.limit
            this.setState({ pageCount: pageCount, currentPage: pageno })
        }).catch(err => {
            notification.open({
                message: 'Error',
                description: 'There was an error while fetching comapany data!'
            });
        });
    }

    deleteOneCompanyAddress(Id) {
        swal({
            title: "Are you sure you want to delete the selected Company?",
            text: "Once deleted, you will not be able to recover this data!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                deleteCompanyAddress(Id).then(res => {
                    console.log('res => ', res);

                    notification.open({
                        message: 'Success',
                        description: 'Company Data deleted successfully!'
                    });
                    getCompanyAddress(this.state.currentPage).then(res => {
                        this.setState({ companyData: res.data.data, total: res.data.message });
                        let pageCount = this.state.total / this.state.limit
                        this.setState({ pageCount: pageCount })
                    }).catch(err => {
                        notification.open({
                            message: 'Error',
                            description: 'There was an error while fetching all company data'
                        });
                    });
                }).catch(err => {
                    notification.open({
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
        console.log('e => ', e.target.value);
        console.log(' this.state.currentPage=> ', this.state.currentPage);

        getSearchedCompanyAddress(this.state.currentPage, e.target.value).then(res => {
            console.log('res => ', res);
            let pageno = this.state.currentPage;
            console.log('pageno => ', pageno);

            this.setState({ companyData: res.data.data, total: res.data.message });
            let pageCount = this.state.total / this.state.limit
            this.setState({ pageCount: pageCount, currentPage: pageno })
        }).catch(err => {
            notification.open({
                message: 'Error',
                description: 'There was an error while searching through company data!'
            });
        })
    }

    render() {

        const { companyAddressData } = this.state;

        return (
            <div>
                <div class="d-flex">
                    <SideNav />
                    <div id="content-wrapper" class="d-flex flex-column w-100 content-relative">
                        <div class="content">
                            <Header />
                        </div>
                        <div class="container-fluid">
                            <div class="main-title-lg mb-5 d-flex justify-content-between">
                                <h1 class="h3 text-gray-800">Company Address List</h1>
                                <Link to="/add-company-address" class="btn btn-orange-search">Add Company Address List</Link>
                            </div>
                            <div class="card shadow mb-4">
                                <div class="card-header py-3 d-sm-flex align-items-center justify-content-between">
                                    <h6 class="m-0 font-weight-bold txt-orange">Company List </h6>

                                    <div class="search-data position-relative">
                                        <input type="text" onChange={(e) => this.getSearchStringData(e)} className="form-control" />
                                        <button className="searchbtn"><i class="fas fa-search"></i></button>
                                    </div>
                                </div>
                                <Table dataSource={companyAddressData} columns={this.columns} />
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
                        <Footer />
                    </div>
                </div>
            </div>
        )
    }
}


