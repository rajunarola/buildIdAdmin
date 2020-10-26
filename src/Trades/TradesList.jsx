import React, { Component } from 'react'
import { deleteTrades, getAllTrades, getSearchedTrades } from '../Services/TradeAPI'
import Footer from '../_layout/Footer/Footer'
import Header from '../_layout/Header/Header'
import SideNav from '../_layout/SideNav/SideNav'
import * as moment from "moment";
import { Link } from 'react-router-dom'
import Pagination from 'react-paginate';
import swal from 'sweetalert';
import { notification, Table } from 'antd';

export default class TradesList extends Component {

    state = {
        tradesList: [],
        limit: 10,
        total: "",
        pageCount: "",
        currentPage: ''
    };

    columns = [
        {
            title: "Trade Name",
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
                <td><button className="btn btn-danger" onClick={(e) => this.deleteOneTrade(record.id)}>Delete</button></td>
            )
        }
    ]

    handlePageClick = page => {
        const pageno = page.selected + 1;
        getAllTrades(pageno).then(res => {
            this.setState({ tradesList: res.data.data, total: res.data.message });
            let pageCount = this.state.total / this.state.limit
            this.setState({ pageCount: pageCount, currentPage: pageno })
        }).catch(err => {
            notification.open({
                message: 'Error',
                description: 'There was an error while fetching Trade Records!'
            });
        });
    }

    deleteOneTrade(Id) {
        swal({
            title: "Are you sure you want to delete the selected Company?",
            text: "Once deleted, you will not be able to recover this data!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                deleteTrades(Id).then(res => {
                    if (res.data.status === true) {
                        notification.open({
                            message: 'Success',
                            description: 'Trade deleted successfully!'
                        });
                        getAllTrades(this.state.currentPage).then(res => {
                            this.setState({ tradesList: res.data.data, total: res.data.message });
                            let pageCount = this.state.total / this.state.limit;
                            this.setState({ pageCount: pageCount });
                        }).catch(err => {
                            notification.open({
                                message: 'Error',
                                description: 'There was an error while fetching Trade Data!'
                            });
                        });
                    } else {
                        notification.open({
                            message: 'Error',
                            description: 'There was an error while deleting Trades'
                        });
                    }
                }).catch(err => {
                    notification.open({
                        message: 'Error',
                        description: 'There was an error while deleting Trade!'
                    });
                })
            } else {
                notification.open({
                    message: 'Success',
                    description: 'Your Trade Data is Safe'
                });
            }
        });
    }

    getSearchStringData(e) {
        getSearchedTrades(this.state.currentPage, e.target.value).then(res => {
            this.setState({ tradesList: res.data.data })
        }).catch(err => {
            notification.open({
                message: 'Error',
                description: 'There was an error while searching Trades!'
            });
        })
    }

    render() {

        const { tradesList } = this.state;

        return (
            <div>
                <div className="d-flex">
                    <SideNav />
                    <div id="content-wrapper" className="d-flex flex-column w-100 content-relative">
                        <div className="content">
                            <Header />
                        </div>
                        <div className="container-fluid">
                            <div className="main-title-lg mb-5 d-flex justify-content-between">
                                <h1 className="h3 text-gray-800">Trade List</h1>
                                <Link to="/add-trade" className="btn btn-orange-search">Add Trades</Link>
                            </div>
                            <div className="card shadow mb-4">
                                <div className="card-header py-3 d-sm-flex align-items-center justify-content-between">
                                    <h6 className="m-0 font-weight-bold txt-orange">Trade List</h6>
                                    <div className="search-data position-relative">
                                        <input type="text" onChange={(e) => this.getSearchStringData(e)} className="form-control" />
                                        <button className="searchbtn"><i className="fas fa-search"></i></button>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <Table dataSource={tradesList} columns={this.columns} />
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
                        </div>
                        <Footer />
                    </div>
                </div>
            </div>
        )
    }
}
