import React, { Component } from 'react'
import * as moment from "moment";
import { Link } from 'react-router-dom';
import Pagination from 'react-paginate';
import { getAllItems, deleteItem, getSearchedItems } from '../Services/ItemAPI';
import { Table, notification } from 'antd';
import swal from 'sweetalert';
import Loader from '../Loader/Loader';
export default class ItemList extends Component {

    constructor(props) {
        super(props);
        this.columns = [
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
                title: "Edit",
                dataIndex: "edit",
                key: "edit",
                render: (text, record) => (
                    <td><button className="btn btn-primary" onClick={(e) => this.editItem(record.id)}>Edit</button></td>
                )
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
    }

    state = {
        itemData: [],
        limit: 10,
        total: '',
        pageCount: '',
        currentPage: '',
        loading: false
    }

    componentDidMount() {
        this.setState({ loading: true })
    }

    editItem(id) {
        this.props.history.push(`/edit-item/${id}`)
    }

    handlePageClick = page => {
        const pageno = page.selected + 1;
        getAllItems(pageno).then(res => {
            this.setState({ itemData: res.data.data, total: res.data.message, loading: false });
            let pageCount = this.state.total / this.state.limit
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
        getSearchedItems(this.state.currentPage, e.target.value).then(res => {
            let pageno = this.state.currentPage;
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
                {this.state.loading ? <Loader /> :
                    <div class="container-fluid">
                        <div class="main-title-lg mb-5 d-flex justify-content-between">
                            <h1 class="h3 text-gray-800">Item List</h1>
                            <Link to="/add-item" class="btn btn-orange-search">Add Item</Link>
                        </div>
                        <div class="card shadow mb-4">
                            <div class="card-header py-3 d-sm-flex align-items-center justify-content-between">
                                <h6 class="m-0 font-weight-bold txt-orange">Item List </h6>
                                <div class="search-data position-relative">
                                    <input type="text" placeholder="Search Items" onChange={(e) => this.getSearchStringData(e)} className="form-control" />
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

                }
            </div>
        )
    }
}
