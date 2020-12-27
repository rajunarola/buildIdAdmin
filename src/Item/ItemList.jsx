import React, { Component } from 'react'
import * as moment from "moment";
import { Link } from 'react-router-dom';
import Pagination from 'react-paginate';
import Footer from '../_layout/Footer/Footer';
import Header from '../_layout/Header/Header';
import SideNav from '../_layout/SideNav/SideNav';
import { getAllItems, deleteItem, getSearchedItems, postItem } from '../Services/ItemAPI';
import { Table, notification, Select, Input, Popconfirm } from 'antd';
import swal from 'sweetalert';
import Loader from '../Loader/Loader';
const { Option } = Select;
const EditableCell = ({ editable, value, onChange }) => (

    <div>
        {editable
            ? <Input style={{ margin: '-5px 0' }} value={value} onChange={e => onChange(e.target.value)} />
            : value
        }
    </div>
);
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
                sorter: (a, b) => a.name.localeCompare(b.name),
                render: (text, record) => this.renderColumns(text, record, 'name'),
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
            },
            {
                title: 'Inline Edit',
                dataIndex: 'operation',
                render: (text, record) => {
                    const { editable } = record;
                    return (
                        <div className="editable-row-operations">
                            {
                                editable ?
                                    <span>
                                        <a onClick={() => this.save(record.key)}>Save</a>
                                        <Popconfirm title="Sure to cancel?" onConfirm={() => this.cancel(record.key)}>
                                            <a>Cancel</a>
                                        </Popconfirm>
                                    </span>
                                    : <a onClick={() => this.edit(record.key)}>Edit</a>
                            }
                        </div>
                    );
                }
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
        console.log('page => ', page);
        const pageno = page.selected + 1;
        getAllItems(pageno).then(res => {
            this.setState({ itemData: res.data.data, total: res.data.message, loading: false });
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

    renderColumns(text, record, column, e) {
        console.log('text,record,column => ', text, record.recordStatus);
        if (column === "recordStatus") {
            console.log('true', e);
        }
        return (
            <EditableCell
                editable={record.editable}
                value={text}
                onChange={value => this.handleChange(value, record.key, column)}
            />
        );
    }

    handleChange(value, key, column) {
        const newData = [...this.state.itemData];
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
            target[column] = value;
            this.setState({ itemData: newData });
        }
    }

    edit(key) {
        const newData = [...this.state.itemData];
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
            target.editable = true;
            this.setState({ itemData: newData });
        }
    }

    save(key) {
        const newData = [...this.state.itemData];
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
            delete target.editable;
            this.setState({ itemData: newData }, () => {
                this.cacheData = newData.map(item => ({ ...item }));
                const data = {
                    Content: [
                        {
                            Id: target.id,
                            Name: target.name,
                            RecordStatusId: target.recordStatusId,
                            CreatedBy: parseInt(localStorage.getItem('userID')),
                            ModifiedBy: parseInt(localStorage.getItem('userID'))
                        }
                    ]
                }
                postItem({ Content: JSON.stringify(data.Content) }).then(res => {
                    if (res.data.status === true) {
                        notification.open({
                            message: 'Success',
                            description: 'Item successfully updated!'
                        });
                    }
                }).catch(err => {
                    notification.open({
                        message: 'Error',
                        description: 'There was an error while updating Item data!'
                    });
                });
            });
        }
    }

    cancel(key) {
        const newData = [...this.state.itemData];
        const target = newData.filter(item => key === item.key)[0];
        if (target) {
            Object.assign(target, newData.filter(item => key === item.key)[0]);
            delete target.editable;
            this.setState({ itemData: newData });
        }
    }

    render() {

        const { itemData } = this.state;

        return (
            <div>
                {this.state.loading ? <Loader /> :
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
                }
            </div>
        )
    }
}
