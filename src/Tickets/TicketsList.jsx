import React, { Component } from 'react'
import { getAllTickets, getSearchedTicket, deleteTicket } from '../Services/TicketAPI';
import { Link } from 'react-router-dom'
import Pagination from 'react-paginate';
import swal from 'sweetalert';
import { notification, Table } from 'antd';
import Loader from '../Loader/Loader';
export default class TicketsList extends Component {

    state = {
        ticketsType: [],
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
        getAllTickets(pageno).then(res => {
            this.setState({ ticketsType: res.data.data, total: res.data.message, loading: false }, () => {
                let pageCount = this.state.total / this.state.limit
                this.setState({ pageCount: pageCount, currentPage: pageno })
            });
        }).catch(err => {
            notification.error({
                message: 'Error',
                description: 'There was an error while fetching projects!'
            });
        });
    }

    columns = [
        {
            title: "Ticket Name",
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
                <td><button className="btn btn-primary" onClick={(e) => this.editTicket(record.id)}>Edit</button></td>
            )
        },
        {
            title: "Delete",
            dataIndex: "delete",
            key: "delete",
            render: (text, record) => (
                <td><button className="btn btn-danger" onClick={(e) => this.deleteTicket(record.id)}>Delete</button></td>
            )
        }
    ]

    deleteTicket(Id) {
        swal({
            title: "Are you sure you want to delete the selected Ticket?",
            text: "Once deleted, you will not be able to recover this data!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((willDelete) => {
            if (willDelete) {
                deleteTicket(Id).then(res => {
                    if (res.data.status === true) {
                        notification.success({
                            message: 'Success',
                            description: 'Ticket deleted successfully!'
                        });
                        getAllTickets(this.state.currentPage).then(res => {
                            this.setState({ ticketsType: res.data.data, total: res.data.message });
                            let pageCount = this.state.total / this.state.limit
                            this.setState({ pageCount: pageCount })
                        }).catch(err => {
                            notification.error({
                                message: 'Error',
                                description: 'There was an error while fetching all tickets'
                            });
                        });
                    } else {
                        notification.error({
                            message: 'Error',
                            description: 'There was an error while deleting a ticket'
                        });
                    }
                }).catch(err => {
                    notification.open({
                        message: 'Error',
                        description: 'There was an error while deleting a ticket'
                    });
                })
            } else {
                notification.open({
                    message: 'Success',
                    description: 'Your ticket data is Safe!'
                });
            }
        })
    }

    editTicket(id) {
        this.props.history.push(`/edit-ticket-list/${id}`)
    }

    getSearchStringData(e) {
        getSearchedTicket(this.state.currentPage, e.target.value).then(res => {
            this.setState({ ticketsType: res.data.data })
        }).catch(err => {
            notification.error({
                message: 'Error',
                description: 'There was an error while searching ticket!'
            });
        })
    }

    render() {

        const { ticketsType } = this.state;

        return (
            <div>
                {this.state.loading ? <Loader /> :
                    <div className="container-fluid">
                        <div className="main-title-lg mb-5 d-flex justify-content-between">
                            <h1 className="h3 text-gray-800">Ticket List</h1>
                            <Link to="/add-ticket" className="btn btn-orange-search">Add Ticket</Link>
                        </div>
                        <div className="card shadow mb-4">
                            <div className="card-header py-3 d-sm-flex align-items-center justify-content-between">
                                <h6 className="m-0 font-weight-bold txt-orange">Ticket List</h6>
                                <div className="search-data position-relative">
                                    <input type="text" placeholder="Search Tickets" onChange={(e) => this.getSearchStringData(e)} className="form-control" />
                                    <button className="searchbtn"><i className="fas fa-search"></i></button>
                                </div>
                            </div>
                            <Table dataSource={ticketsType} columns={this.columns} />
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
                }
            </div>
        )
    }
}
