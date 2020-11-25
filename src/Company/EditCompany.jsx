import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../_layout/Footer/Footer'
import Header from '../_layout/Header/Header'
import SideNav from '../_layout/SideNav/SideNav'
import { Form, Input, Select, notification, Button, Checkbox } from 'antd';
import moment from 'moment';
import { getCompanyById, getRecordStatusForCompanies, postCompany, getCompanyAddress, getOnlyOneCompanyAddress, postCompanyAddress } from '../Services/CompanyAPI'

export default class EditCompany extends Component {

  state = {
    Id: '',
    Name: '',
    RecordStatusId: '',
    WebSite: '',
    CreatedBy: '',
    DateCreated: '',
    ModifiedBy: '',
    DateModified: '',
    Active: false,
    changeRecordStatusId: [],
    companyAddress: [],
    Address: '',
    City: '',
    Province: '',
    PostalCode: '',
    Country: '',
    ContactPerson: ''
  }

  componentDidMount() {
    const companyId = this.props.match.params.id;
    getCompanyById(companyId).then(res => {
      if (res.status === 200) {
        this.setState({
          Id: res.data.data.id,
          Name: res.data.data.name,
          RecordStatusId: res.data.data.recordStatusId,
          WebSite: res.data.data.webSite,
          Phone: res.data.data.phone,
          CreatedBy: res.data.data.createdBy,
          DateCreated: res.data.data.dateCreated,
          Active: res.data.data.active,
          ModifiedBy: res.data.data.modifiedBy,
          DateModified: res.data.data.dateModified
        });
      }
    }).catch(err => {
      notification.open({
        message: 'Error',
        description: 'There was an error while fetching company data!'
      });
    });

    getRecordStatusForCompanies().then(res => {
      if (res.status === 200) {
        this.setState({ changeRecordStatusId: res.data.data })
      }
    }).catch(err => {
      notification.open({
        message: 'Error',
        description: 'There was an error while fetching record status for company data!'
      });
    });

    getOnlyOneCompanyAddress(companyId).then(Res => {
      let array = [];
      if (Res.status === 200) {
        Res.data.data.map(data => {
          array.push(data)
          this.setState({ companyAddress: array })
        })
      }
    }).catch(err => {
      notification.open({
        message: 'Error',
        description: 'There was an error while fetching company address!'
      });
    })
  }

  handleChange = (value) => {
    this.setState({ RecordStatusId: value });
  }

  changeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  getCheckBoxValue = (e) => {
    this.setState({ Active: e });
  }

  render() {

    const updateCompany = () => {
      const data = {
        Content: [
          {
            Id: this.state.Id,
            Name: this.state.Name,
            RecordStatusId: this.state.RecordStatusId,
            CreatedBy: parseInt(localStorage.getItem('userID')),
            WebSite: this.state.WebSite,
            Phone: this.state.Phone,
            DateCreated: moment(new Date()).format('YYYY-MM-DD'),
            ModifiedBy: parseInt(localStorage.getItem('userID')),
            DateModified: moment(new Date()).format('YYYY-MM-DD'),
            Active: this.state.Active
          }
        ]
      }
      postCompany({ Content: JSON.stringify(data.Content) }).then(res => {
        if (res.data.status === true) {
          notification.open({
            message: 'Success',
            description: 'Company data successfully updated!'
          });
        }
      }).catch(err => {
        notification.open({
          message: 'Error',
          description: 'There was an error while updating company!'
        });
      });
    }

    const updateAddress = value => {
      const data = {
        Content: [
          {
            Id: this.state.Id,
            CompanyId: this.state.CompanyId,
            Type: value.Type,
            Address: value.Address,
            City: value.City,
            Province: value.Province,
            PostalCode: value.PostalCode,
            Country: value.Country,
            RecordStatusId: 1,
            CreatedBy: 1,
            ModifiedBy: 1,
            ContactPerson: value.ContactPerson,
            Email: value.Email,
            Phone: value.Phone
          }
        ]
      }
      postCompanyAddress({ Content: JSON.stringify(data.Content) }).then(res => {
        if (res.data.status === true) {
          notification.open({
            message: 'Success',
            description: 'Company data has been updated successfully!'
          });
        }
      }).catch(err => {
        notification.open({
          message: 'Error',
          description: 'There was an error while updating Company Data!'
        });
      });
    }

    const addAddress = (values) => {
      const data = {
        Content: [
          {
            Id: 0,
            CompanyId: this.props.match.params.id,
            Type: values.Type,
            Address: values.Address,
            City: values.City,
            Province: values.Province,
            PostalCode: values.PostalCode,
            Country: values.Country,
            RecordStatusId: 1,
            CreatedBy: 1,
            ModifiedBy: 1,
            ContactPerson: values.ContactPerson
          }
        ]
      }
      postCompanyAddress({ Content: JSON.stringify(data.Content) }).then(res => {
        if (res.data.data === -1) {
          notification.open({
            message: 'Error',
            description: 'A company with same data address exist already!'
          });
        } else if (res.data.data !== -1) {
          notification.open({
            message: 'Success',
            description: 'Company data has been added successfully!'
          });
        }
      }).catch(err => {
        notification.open({
          message: 'Error',
          description: 'There was an error while adding Company Data!'
        });
      });
    }

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
                <h1 className="h3 text-gray-800">Edit Company</h1>
                <Link to="/company-list" className="btn btn-orange-search">View Company List</Link>
              </div>
              <div className="trade-form-wrap">
                <div className="row mt-5">
                  <div className="col-lg-6">
                    <div className="bg-white p-5 form-border">
                      <Form onFinish={updateCompany}>
                        <div className="form-group">
                          <label>Company Name</label>
                          <Form.Item>
                            <Input name="Name" value={this.state.Name} onChange={(e) => this.changeHandler(e)} />
                          </Form.Item>
                        </div>
                        <div className="form-group">
                          <label className="formlabel">Record Status </label>
                          <Select className="form-ant-control w-100 inputstyle" value={this.state.RecordStatusId} onChange={(e) => this.handleChange(e)}>
                            {
                              this.state.changeRecordStatusId.map(tradeDetails => (
                                <Select.Option value={tradeDetails.id}>{tradeDetails.name}</Select.Option>
                              ))
                            }
                          </Select>
                        </div>
                        <div className="form-group">
                          <label>Website</label>
                          <Form.Item rules={[{ type: "email", message: "The input is not valid E-mail!" }]}>
                            <Input name="WebSite" value={this.state.WebSite} onChange={(event) => this.changeHandler(event)} />
                          </Form.Item>
                        </div>
                        <div className="form-group">
                          <label>Phone Number</label>
                          <Form.Item>
                            <Input name="Phone" value={this.state.Phone} onChange={(event) => this.changeHandler(event)} />
                          </Form.Item>
                        </div>
                        <div className="form-check mb-3">
                          <Checkbox name="Active" checked={this.state.Active ? true : false} onChange={(e) => this.getCheckBoxValue(e.target.checked)} />
                          <label className="form-check-label mr-5">Active</label>
                        </div>
                        <Form.Item>
                          <Button type="primary" htmlType="submit">Update Company</Button>
                        </Form.Item>
                      </Form>
                    </div>
                  </div>
                  {this.state.companyAddress.length > 0 ?
                    <div className="col-lg-6">
                      <div className="bg-white p-5 form-border">
                        {this.state.companyAddress.map((data, index) => (
                          <>
                            <Form onFinish={updateAddress}>
                              <div className="form-group">
                                <label className="formlabel">Address {index + 1}</label>
                                <Form.Item>
                                  <Input name="Address" value={data.address} onChange={(event) => this.changeHandler(event)} />
                                </Form.Item>
                              </div>
                              <div className="form-group">
                                <label className="formlabel">City {index + 1}</label>
                                <Form.Item rules={[{
                                  required: true,
                                  message: "Please input your City!"
                                }]}>
                                  <Input name="City" value={data.city} onChange={(event) => this.changeHandler(event)} />
                                </Form.Item>
                              </div>
                              <div className="form-group">
                                <label className="formlabel">Province {index + 1}</label>
                                <Form.Item rules={[{
                                  required: false,
                                }]}>
                                  <Input name="Province" value={data.province} onChange={(event) => this.changeHandler(event)} />
                                </Form.Item>
                              </div>
                              <div className="form-group">
                                <label className="formlabel">Postal Code {index + 1}</label>
                                <Form.Item rules={[{
                                  required: false,
                                }]}>
                                  <Input name="PostalCode" value={data.postalCode} onChange={(event) => this.changeHandler(event)} />
                                </Form.Item>
                              </div>
                              <div className="form-group">
                                <label className="formlabel">Country {index + 1}</label>
                                <Form.Item rules={[{
                                  required: false,
                                }]}>
                                  <Input name="Country" value={data.country} onChange={(event) => this.changeHandler(event)} />
                                </Form.Item>
                              </div>
                              <div className="form-group">
                                <label className="formlabel">Contact Person {index + 1}</label>
                                <Form.Item rules={[{
                                  required: false,
                                }]}>
                                  <Input name="ContactPerson" value={data.contactPerson} onChange={(event) => this.changeHandler(event)} />
                                </Form.Item>
                              </div>
                              <Form.Item>
                                <Button type="primary" htmlType="submit">Update Address</Button>
                              </Form.Item>
                            </Form>
                          </>
                        ))}
                      </div>
                    </div> :
                    <div className="col-lg-6">
                      <div className="bg-white p-5 form-border">
                        <Form onFinish={addAddress}>
                          <div className="form-group">
                            <label className="formlabel">Address</label>
                            <Form.Item name="Address" >
                              <Input onChange={(e) => this.changeHandler(e)} />
                            </Form.Item>
                          </div>
                          <div className="form-group">
                            <label className="formlabel">Type</label>
                            <Form.Item name="Type" >
                              <Input onChange={(e) => this.changeHandler(e)} />
                            </Form.Item>
                          </div>
                          <div className="form-group">
                            <label className="formlabel">City</label>
                            <Form.Item name="City">
                              <Input onChange={(e) => this.changeHandler(e)} />
                            </Form.Item>
                          </div>
                          <div className="form-group">
                            <label className="formlabel">Province</label>
                            <Form.Item name="Province" >
                              <Input onChange={(event) => this.changeHandler(event)} />
                            </Form.Item>
                          </div>
                          <div className="form-group">
                            <label className="formlabel">Postal Code</label>
                            <Form.Item name="PostalCode" >
                              <Input onChange={(event) => this.changeHandler(event)} />
                            </Form.Item>
                          </div>
                          <div className="form-group">
                            <label className="formlabel">Country</label>
                            <Form.Item name="Country" >
                              <Input onChange={(event) => this.changeHandler(event)} />
                            </Form.Item>
                          </div>
                          <div className="form-group">
                            <label className="formlabel">Contact Person</label>
                            <Form.Item name="ContactPerson" >
                              <Input onChange={(event) => this.changeHandler(event)} />
                            </Form.Item>
                          </div>
                          <Form.Item>
                            <Button type="primary" htmlType="submit">Add Company</Button>
                          </Form.Item>
                        </Form>
                      </div>
                    </div>
                  }
                </div>
              </div>
            </div>
            <Footer />
          </div>
        </div>
      </div >
    )
  }
}
