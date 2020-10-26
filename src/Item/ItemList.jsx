import React, { Component } from 'react'
import * as moment from "moment";
import { Link } from 'react-router-dom';
import Pagination from 'react-paginate';
import Footer from '../_layout/Footer/Footer';
import Header from '../_layout/Header/Header';
import SideNav from '../_layout/SideNav/SideNav';
import { getAllItems, deleteItem, getSearchedItems } from '../Services/ItemAPI';
import { Table, notification } from 'antd';
import swal from 'sweetalert';

export default class ItemList extends Component {

    state = {
        itemData: [],
        limit: 10,
        total: '',
        pageCount: '',
        currentPage: ''
    }

    columns = [
        {
            title: "Image",
            dataIndex: "imageUrl",
            key: "imageUrl",
            render: (imageUrl) => <div><img src={imageUrl} alt="Image" height="25" width="25" /></div>
        },
        {
            title: "Item Name",
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
            sorter: (a, b) => moment(a.dateCreated).format('MM-DD-YYYY') - moment(b.dateCreated).format('MM-DD-YYYY'),
            render: (dateCreated) => moment(dateCreated).format('MM-DD-YYYY')
        },
        {
            title: "Delete",
            dataIndex: "delete",
            key: "delete",
            render: (text, record) => (
                <td><button className="btn btn-danger" onClick={(e) => this.deleteItem(record.id)}>Delete</button></td>
            )
        }
    ]

    handlePageClick = page => {
        console.log('page => ', page);
        const pageno = page.selected + 1;
        getAllItems(pageno).then(res => {
            this.setState({ itemData: res.data.data, total: res.data.message });
            console.log('this.state.total => ', this.state.total);

            let pageCount = this.state.total / this.state.limit
            console.log('pageCounty => ', pageCount);

            this.setState({ pageCount: pageCount, currentPage: pageno })
        }).catch(err => {
            notification.open({
                message: 'Error',
                description: 'There was an error while fetching comapany data!'
            });
        });
    }

    deleteItem(Id) {
        swal({
            title: "Are you sure you want to delete the selected Item?",
            text: "Once deleted, you will not be able to recover this data!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                deleteItem(Id).then(res => {
                    console.log('res => ', res);
                    if (res.data.status === true) {
                        notification.open({
                            message: 'Success',
                            description: 'Item Data deleted successfully!'
                        });
                        getAllItems(this.state.currentPage).then(res => {
                            this.setState({ itemData: res.data.data, total: res.data.message });
                            let pageCount = this.state.total / this.state.limit
                            console.log('pageCount => ', pageCount);

                            this.setState({ pageCount: pageCount })
                        }).catch(err => {
                            notification.open({
                                message: 'Error',
                                description: 'There was an error while fetching Item data!'
                            });
                        });
                    }
                }).catch(err => {
                    notification.open({
                        message: 'Error',
                        description: 'There was an error while deleting item data'
                    });
                })
            } else {
                swal("Your item data is safe!");
            }
        });
    }

    getSearchStringData(e) {
        console.log('e => ', e.target.value);
        console.log(' this.state.currentPage=> ', this.state.currentPage);

        getSearchedItems(this.state.currentPage, e.target.value).then(res => {
            console.log('res => ', res);
            let pageno = this.state.currentPage;
            console.log('pageno => ', pageno);

            this.setState({ itemData: res.data.data, total: res.data.message });
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

        const { itemData } = this.state;

        return (
            <div>
                <div className="d-flex">
                    <SideNav />
                    <div id="content-wrapper" className="d-flex flex-column w-100 content-relative">
                        <div className="content">
                            <Header />
                        </div>
                        <div class="container-fluid">
                            <div class="main-title-lg mb-5 d-flex justify-content-between">
                                <h1 class="h3 text-gray-800">Item List</h1>
                                <Link to="/add-item" class="btn btn-orange-search">Add Item</Link>
                            </div>
                            <div class="card shadow mb-4">
                                <div class="card-header py-3 d-sm-flex align-items-center justify-content-between">
                                    <h6 class="m-0 font-weight-bold txt-orange">Item List </h6>

                                    <div class="search-data position-relative">
                                        <input type="text" onChange={(e) => this.getSearchStringData(e)} className="form-control" />
                                        <button className="searchbtn"><i class="fas fa-search"></i></button>
                                    </div>
                                </div>
                                <Table class="table table-bordered" dataSource={itemData} columns={this.columns} />
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
