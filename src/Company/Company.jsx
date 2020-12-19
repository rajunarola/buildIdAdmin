import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { postCompanyAddress, newSaveCompany, postCompany } from '../Services/CompanyAPI'
import Footer from '../_layout/Footer/Footer'
import Header from '../_layout/Header/Header'
import SideNav from '../_layout/SideNav/SideNav'
import { notification, Input, Form, Button, Space, Select, Spin } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { debounce } from 'lodash';

export default class Company extends Component {

  formRef = React.createRef();

  constructor(props) {
    super(props);
    this.lastFetchId = 0;
    this.fetchIndustry = debounce(this.fetchIndustry, 800);
  }

  state = {
    data: [],
    fetching: false,
    value: [],
    Id: 0,
    Name: '',
    RecordStatusId: 1,
    CreatedBy: 1,
    ModifiedBy: 1,
    QbId: 2,
    WebSite: '',
    Phone: '',
    IndustryId: 2,
    Active: false,
    storeCompanyId: '',
    industryId: ''
  }

  changeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  getCheckBoxValue = (e) => {
    this.setState({ Active: e });
  }

  addAddress = (values) => {
    for (let index = 0; index < values.length; index++) {
      values[index].Id = 0;
      values[index].CompanyId = this.state.storeCompanyId;
      values[index].RecordStatusId = 1;
      values[index].CreatedBy = parseInt(localStorage.getItem('userID'));
      values[index].ModifiedBy = parseInt(localStorage.getItem('userID'));
    }
    postCompanyAddress({ Content: JSON.stringify(values) }).then(res => {
      if (res.data.data === -1) {
        notification.open({
          message: 'Error',
          description: 'A company with same data address exist already!'
        });
      } else if (res.data.data !== -1) {
        this.formRef.current.resetFields();
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


  fetchIndustry = value => {
    console.log('value => ', value);
    this.lastFetchId += 1;
    const fetchId = this.lastFetchId;
    this.setState({ data: [], fetching: true });
    fetch(`https://bimiscwebapi-test.azurewebsites.net/api/projects/getBuildingTypes/10/1/${value}`).then(response => response.json()).then(body => {
      console.log('body => ', body);
      if (fetchId !== this.lastFetchId) {
        // for fetch callback order
        return;
      }
      const data = body.data.map(user => ({
        text: `${user.name}`,
        value: user.id,
      }));
      this.setState({ data, fetching: false });
    });
  };

  handleChangeIndustry = (key, value) => {
    this.setState({
      industryId: parseInt(value.value),
      data: [],
      fetching: false,
    });
  };

  render() {

    const { Option } = Select
    const { data, fetching } = this.state

    const sendCompanyData = value => {
      console.log('value sendCompanyData=> ', value);
      const data = {
        Id: 0,
        Name: value.Name,
        RecordStatusId: 1,
        CreatedBy: parseInt(localStorage.getItem('userID')),
        ModifiedBy: parseInt(localStorage.getItem('userID')),
        QbId: this.state.QbId,
        WebSite: value.email,
        Phone: value.PhoneNo,
        IndustryId: this.state.industryId,
        Active: this.state.Active
      }
      // postCompany({ Content: JSON.stringify(data.Content) }).then(res => {
      newSaveCompany(data).then(res => {
        // newSaveCompany({ Content: JSON.stringify(data.Content) }).then(res => {
        if (res.data.message === "OK") {
          this.setState({ storeCompanyId: res.data.data });
          this.addAddress(value.sight)
          // notification.open({
          //   message: 'Success',
          //   description: 'Company data has been successfully added!'
          // });
          // return
        } else if (res.data.message !== "OK") {
          notification.open({
            message: 'Error',
            description: 'A record with the same name already exists in database. The save will not be finalized!'
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
              <div className="d-sm-flex align-items-center justify-content-between mb-4 main-title-lg">
                <h1 className="h3 mb-0 text-gray-800">Add Company</h1>
                <Link to="/company-list" className="btn btn-orange-search">View Company List</Link>
              </div>
              <div className="trade-form-wrap mt-5 mb-5">
                <Form onFinish={sendCompanyData} ref={this.formRef}>
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="bg-white p-5 form-border">
                        <div className="form-group">
                          <label for="CompanyName">Company Name</label>
                          <Form.Item name="Name" rules={[{
                            required: true, message: "Please enter your Company Name!"
                          }]}>
                            <Input value={this.state.Name} onChange={(event) => this.changeHandler(event)} />
                          </Form.Item>
                        </div>
                        <div className="form-group">
                          <label for="WebsiteName">Website</label>
                          <Form.Item name="email" rules={[{ type: "email", message: "The input is not valid E-mail!" },
                          { required: true, message: "Please enter your email" }]}>
                            <Input value={this.state.WebSite} onChange={(event) => this.changeHandler(event)} />
                          </Form.Item>
                        </div>
                        <div className="form-group">
                          <label for="PhoneNo">Phone No</label>
                          <Form.Item name="PhoneNo" rules={[{ required: true, message: "Please input your phone number!" }]}>
                            <Input onChange={(event) => this.changeHandler(event)} />
                          </Form.Item>
                        </div>
                        <div className="form-group">
                          <label>Select Industry</label>
                          <Select
                            className="w-25"
                            showSearch
                            labelInValue
                            // value={industryValue}
                            placeholder="Search Industries"
                            notFoundContent={fetching ? <Spin size="small" /> : null}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            onSearch={(e) => this.fetchIndustry(e)}
                            onChange={(e) => this.handleChangeIndustry('industryId', e)}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                            {data.map(d => (
                              <Option key={d.value}>{d.text}</Option>
                            ))}
                          </Select>
                        </div>
                        <Form.List name="sight">
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
                                          {/* <label className="formlabel">Address {i + 1}</label> */}
                                          <label className="formlabel">Address </label>
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
                        <div className="form-check">
                          <input value={this.state.Active} className="form-check-input" type="checkbox" name="Active" onChange={(e) => this.getCheckBoxValue(e.target.checked)} />
                          <label className="form-check-label">Active</label>
                        </div>

                        <div className="mt-4">
                          <button type="submit" className="btn btn-orange-search">Submit</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Form>
              </div>
            </div>
            <Footer />
          </div>
        </div>
      </div >
    )
  }
}
