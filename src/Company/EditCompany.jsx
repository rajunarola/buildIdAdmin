import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../_layout/Footer/Footer'
import Header from '../_layout/Header/Header'
import SideNav from '../_layout/SideNav/SideNav'
import { Form, Input, Select, notification, Button, Checkbox, Space } from 'antd';
import moment from 'moment';
import { getCompanyById, getRecordStatusForCompanies, postCompany, getOnlyOneCompanyAddress, postCompanyAddress } from '../Services/CompanyAPI'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

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
    companyAddress: []
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
      console.log('Res => ', Res);

      if (Res.status === 200) {
        const changedValue =
          Res.data.data.map(({

            address, type, city, country, postalCode, province, contactPerson, companyId, id, createdBy, modifiedBy, email, phone }) => ({
              Address: address,
              Type: type,
              Id: id,
              CompanyId: companyId,
              City: city,
              Country: country,
              PostalCode: postalCode,
              Province: province,
              ContactPerson: contactPerson,
              CreatedBy: createdBy,
              ModifiedBy: modifiedBy,
              Email: email,
              Phone: phone
            }));
        this.setState({ companyAddress: changedValue });
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

  changeHandlerUpdate = (event, index) => {
    this.setState({
      [event.target.name]: event.target.value
    });
    var data = [...this.state.companyAddress];
    data[index][event.target.name] = event.target.value;
    console.log('this.state.companyAddress => ', this.state.companyAddress);

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
      postCompanyAddress({ Content: JSON.stringify(this.state.companyAddress) }).then(res => {
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
      for (let index = 0; index < values.sights.length; index++) {
        values.sights[index].Id = 0;
        values.sights[index].CompanyId = this.props.match.params.id;
        values.sights[index].RecordStatusId = 1;
        values.sights[index].CreatedBy = 1;
        values.sights[index].ModifiedBy = 1;
      }
      postCompanyAddress({ Content: JSON.stringify(values.sights) }).then(res => {
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
                          <Button type="primary" htmlType="submit" className="btn btn-orange-search">Update Company</Button>
                        </Form.Item>
                      </Form>
                    </div>
                  </div>
                  {this.state.companyAddress.length > 0 ?
                    <div className="col-lg-6 hello">
                      <div className="bg-white p-5 form-border">
                        {this.state.companyAddress.map((data, index) => (
                          <>
                            <Form>
                              <div className="form-group">
                                <label className="formlabel">Address {index + 1}</label>
                                <Form.Item>
                                  <Input name="Address" value={data.Address} onChange={(event) => this.changeHandlerUpdate(event, index)} />
                                </Form.Item>
                              </div>
                              <div className="form-group d-none">
                                <label className="formlabel">Company Id {index + 1}</label>
                                <Form.Item>
                                  <Input name="Address" value={data.CompanyId} onChange={(event) => this.changeHandlerUpdate(event, index)} />
                                </Form.Item>
                              </div>
                              <div className="form-group d-none">
                                <label className="formlabel"> Id {index + 1}</label>
                                <Form.Item>
                                  <Input name="Id" value={data.Id} onChange={(event) => this.changeHandlerUpdate(event, index)} />
                                </Form.Item>
                              </div>
                              <div className="form-group">
                                <label className="formlabel">Type {index + 1}</label>
                                <Form.Item>
                                  <Input name="Type" value={data.Type} onChange={(event) => this.changeHandlerUpdate(event, index)} />
                                </Form.Item>
                              </div>
                              <div className="form-group">
                                <label className="formlabel">City {index + 1}</label>
                                <Form.Item>
                                  <Input name="City" value={data.City} onChange={(event) => this.changeHandlerUpdate(event, index)} />
                                </Form.Item>
                              </div>
                              <div className="form-group">
                                <label className="formlabel">Province {index + 1}</label>
                                <Form.Item>
                                  <Input name="Province" value={data.Province} onChange={(event) => this.changeHandlerUpdate(event, index)} />
                                </Form.Item>
                              </div>
                              <div className="form-group">
                                <label className="formlabel">Postal Code {index + 1}</label>
                                <Form.Item>
                                  <Input name="PostalCode" value={data.PostalCode} onChange={(event) => this.changeHandlerUpdate(event, index)} />
                                </Form.Item>
                              </div>
                              <div className="form-group">
                                <label className="formlabel">Country {index + 1}</label>
                                <Form.Item>
                                  <Input name="Country" value={data.Country} onChange={(event) => this.changeHandlerUpdate(event, index)} />
                                </Form.Item>
                              </div>
                              <div className="form-group">
                                <label className="formlabel">Contact Person {index + 1}</label>
                                <Form.Item>
                                  <Input name="ContactPerson" value={data.ContactPerson} onChange={(event) => this.changeHandlerUpdate(event, index)} />
                                </Form.Item>
                              </div>
                              <div className="form-group">
                                <label className="formlabel">Email {index + 1}</label>
                                <Form.Item>
                                  <Input name="Email" value={data.Email} onChange={(event) => this.changeHandlerUpdate(event, index)} />
                                </Form.Item>
                              </div>
                              <div className="form-group">
                                <label className="formlabel">Phone {index + 1}</label>
                                <Form.Item>
                                  <Input name="Phone" value={data.Phone} onChange={(event) => this.changeHandlerUpdate(event, index)} />
                                </Form.Item>
                              </div>
                            </Form>
                          </>
                        ))}
                        <Form.Item>
                          <Button type="primary" onClick={updateAddress} className="btn btn-orange-search">Update Address</Button>
                        </Form.Item>
                      </div>
                    </div> :
                    <div className="col-lg-6 hello">
                      <div className="bg-white p-5 form-border">
                        <Form onFinish={addAddress}>
                          <Form.List name="sights">
                            {(fields, { add, remove }) => (
                              <>
                                {fields.map((field, i) => (
                                  <Space key={field.key} align="baseline">
                                    <Form.Item
                                      noStyle
                                      shouldUpdate={(prevValues, curValues) =>
                                        prevValues.area !== curValues.area || prevValues.sights !== curValues.sights
                                      }>
                                      {() => (
                                        <>
                                          <div className="form-group">
                                            <label className="formlabel">Address {i + 1}</label>
                                            <Form.Item name={[field.name, 'Address']}
                                              fieldKey={[field.fieldKey, 'Address']}>
                                              <Input onChange={(e) => this.changeHandler(e)} />
                                            </Form.Item>
                                          </div>
                                          <div className="form-group">
                                            <label className="formlabel">Type {i + 1}</label>
                                            <Form.Item
                                              name={[field.name, 'Type']}
                                              fieldKey={[field.fieldKey, 'Type']}>
                                              <Input onChange={(e) => this.changeHandler(e)} />
                                            </Form.Item>
                                          </div>
                                          <div className="form-group">
                                            <label className="formlabel">City {i + 1} </label>
                                            <Form.Item name={[field.name, 'City']}
                                              fieldKey={[field.fieldKey, 'City']}>
                                              <Input onChange={(e) => this.changeHandler(e)} />
                                            </Form.Item>
                                          </div>
                                          <div className="form-group">
                                            <label className="formlabel">Province {i + 1}</label>
                                            <Form.Item name={[field.name, 'Province']}
                                              fieldKey={[field.fieldKey, 'Province']}>
                                              <Input onChange={(event) => this.changeHandler(event)} />
                                            </Form.Item>
                                          </div>
                                          <div className="form-group">
                                            <label className="formlabel">Postal Code {i + 1}</label>
                                            <Form.Item name={[field.name, 'PostalCode']}
                                              fieldKey={[field.fieldKey, 'PostalCode']}>
                                              <Input onChange={(event) => this.changeHandler(event)} />
                                            </Form.Item>
                                          </div>
                                          <div className="form-group">
                                            <label className="formlabel">Country {i + 1}</label>
                                            <Form.Item name={[field.name, 'Country']}
                                              fieldKey={[field.fieldKey, 'Country']}>
                                              <Input onChange={(event) => this.changeHandler(event)} />
                                            </Form.Item>
                                          </div>
                                          <div className="form-group">
                                            <label className="formlabel">Contact Person {i + 1}</label>
                                            <Form.Item name={[field.name, 'ContactPerson']}
                                              fieldKey={[field.fieldKey, 'ContactPerson']}>
                                              <Input onChange={(event) => this.changeHandler(event)} />
                                            </Form.Item>
                                          </div>
                                          <div className="form-group">
                                            <label className="formlabel">Email {i + 1}</label>
                                            <Form.Item name={[field.name, 'Email']}
                                              fieldKey={[field.fieldKey, 'Email']}>
                                              <Input onChange={(event) => this.changeHandler(event)} />
                                            </Form.Item>
                                          </div>
                                          <div className="form-group">
                                            <label className="formlabel">Phone {i + 1}</label>
                                            <Form.Item name={[field.name, 'Phone']}
                                              fieldKey={[field.fieldKey, 'Phone']}>
                                              <Input onChange={(event) => this.changeHandler(event)} />
                                            </Form.Item>
                                          </div>
                                          <div className="formfieldremove">
                                            <MinusCircleOutlined onClick={() => remove(field.name)} />
                                          </div>
                                        </>
                                      )}
                                    </Form.Item>
                                  </Space>
                                ))}
                                <Form.Item>
                                  <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>Add Address</Button>
                                </Form.Item>
                              </>
                            )}
                          </Form.List>
                          <div className="mt-4">
                            <Form.Item>
                              <Button type="primary" htmlType="submit" className="btn btn-orange-search">Add Address</Button>
                            </Form.Item>
                          </div>
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
