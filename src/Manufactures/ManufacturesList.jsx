import React, { Component } from 'react'
import { getAllManufacturers, getSearchedManufacturers, deleteManuFacturers } from '../Services/ManufacturersAPI';
import { notification, Table } from 'antd';
import { Link } from 'react-router-dom'
import swal from 'sweetalert';
import Pagination from 'react-paginate';
import Loader from '../Loader/Loader';
export default class ManufacturesList extends Component {

  state = {
    manuFacturerType: [],
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
    getAllManufacturers(pageno).then(res => {
      this.setState({ manuFacturerType: res.data.data, total: res.data.message, loading: false });
      let pageCount = this.state.total / this.state.limit
      this.setState({ pageCount: pageCount, currentPage: pageno })
    }).catch(err => {
      notification.error({
        message: 'Error',
        description: 'There was an error while fetching manufacturers!'
      });
    });
  }

  editManufacturer = (id) => {
    this.props.history.push(`/edit-manufacturer/${id}`)
  }

  columns = [
    {
      title: "Manufacturer Name",
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
        <td><button className="btn btn-primary" onClick={(e) => this.editManufacturer(record.id)}>Edit</button></td>
      )
    },
    {
      title: "Delete",
      dataIndex: "delete",
      key: "delete",
      render: (text, record) => (
        <td><button className="btn btn-danger" onClick={(e) => this.deleteOneManufacturer(record.id)}>Delete</button></td>
      )
    }
  ]

  deleteOneManufacturer(Id) {
    swal({
      title: "Are you sure you want to delete the selected Project?",
      text: "Once deleted, you will not be able to recover this data!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        deleteManuFacturers(Id).then(res => {
          if (res.status === 200) {
            notification.success({
              message: 'Success',
              description: 'Manufacturer deleted successfully!'
            });
            getAllManufacturers(1).then(res => {
              this.setState({ manuFacturerType: res.data.data, total: res.data.message }, () => {
                let pageCount = this.state.total / this.state.limit
                this.setState({ pageCount: pageCount })
              });
            }).catch(err => {
              notification.error({
                message: 'Error',
                description: 'There was an error while fetching all manufacturers'
              });
            });
            return
          } else if (res.response.status === 400) {
            notification.error({
              message: 'Error',
              description: 'This manufacturer record is used in a related table. The record will not be deleted, it will be marked as Not Visible !'
            });
            return
          }
        }).catch(err => {
          notification.error({
            message: 'Error',
            description: 'There was an error while deleting manufacturer'
          });
        })
      } else {
        swal("Your manufacturer data is safe!");
      }
    })
  }

  getSearchStringData(e) {
    getSearchedManufacturers(this.state.currentPage, e.target.value).then(res => {
      this.setState({ manuFacturerType: res.data.data ? res.data.data : [] })
    }).catch(err => {
      notification.error({
        message: 'Error',
        description: 'There was an error while searching manufacturer!'
      });
    })
  }

  render() {

    const { manuFacturerType } = this.state;

    return (
      <div>
        {this.state.loading ? <Loader /> :
          <div class="container-fluid">
            <div class="main-title-lg mb-5 d-flex justify-content-between">
              <h1 class="h3 text-gray-800">Manufacturer List</h1>
              <Link to="/add-manufacturer" class="btn btn-orange-search">Add Manufacturer</Link>
            </div>
            <div class="card shadow mb-4">
              <div class="card-header py-3 d-sm-flex align-items-center justify-content-between">
                <h6 class="m-0 font-weight-bold txt-orange">Manufacturers List </h6>
                <div class="search-data position-relative">
                  <input type="text" placeholder="Search Manufacturers" onChange={(e) => this.getSearchStringData(e)} className="form-control" />
                  <button className="searchbtn"><i class="fas fa-search"></i></button>
                </div>
              </div>
              <Table class="table table-bordered" dataSource={manuFacturerType} columns={this.columns} />
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
