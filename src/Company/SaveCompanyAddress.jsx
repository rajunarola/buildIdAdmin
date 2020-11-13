import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../_layout/Footer/Footer'
import Header from '../_layout/Header/Header'
import SideNav from '../_layout/SideNav/SideNav'
import { notification, Input, Form, Button } from 'antd';
import { postCompanyAddress } from '../Services/CompanyAPI'
export default class SaveCompanyAddress extends Component {

  state = {
    Id: 0,
    CompanyId: 20
  }


  changeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {

    const formRef = React.createRef();

    const companyAddress = value => {
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
        console.log('res => ', res);
        if (res.data.status === true) {
          formRef.current.resetFields();
          notification.open({
            message: 'Success',
            description: 'Company data has been successfully added!'
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
                <h1 className="h3 mb-0 text-gray-800">Add Company Address List</h1>
                <Link to="/company-address-list" className="btn btn-orange-search">View Company Address List</Link>
              </div>
              <div className="trade-form-wrap mt-5 mb-5">
                <div className="row">
                  <div className="col-lg-6">
                    <div className="bg-white p-5 form-border">
                      <Form onFinish={companyAddress} ref={formRef}>
                        <div className="form-group">
                          <label>Type</label>
                          <Form.Item name="type" rules={[{
                            required: true, message: "Please enter your company type!"
                          }]}>
                            <Input onChange={(event) => this.changeHandler(event)} />
                          </Form.Item>
                        </div>
                        <div className="form-group">
                          <label>Address</label>
                          <Form.Item name="Address" rules={[
                            { required: true, message: "Please enter your address" }]}>
                            <Input onChange={(event) => this.changeHandler(event)} />
                          </Form.Item>
                        </div>

                        <div className="form-group">
                          <label>City</label>
                          <Form.Item name="City" rules={[{
                            required: true,
                            message: "Please input your City!"
                          }]}>
                            <Input onChange={(event) => this.changeHandler(event)} />
                          </Form.Item>
                        </div>
                        <div className="form-group">
                          <label>Province</label>
                          <Form.Item name="Province" rules={[{
                            required: true,
                            message: "Please input your Province!"
                          }]}>
                            <Input onChange={(event) => this.changeHandler(event)} />
                          </Form.Item>
                        </div>
                        <div className="form-group">
                          <label>Postal Code</label>
                          <Form.Item name="PostalCode" rules={[{
                            required: true,
                            message: "Please input your PostalCode!"
                          }]}>
                            <Input onChange={(event) => this.changeHandler(event)} />
                          </Form.Item>
                        </div>
                        <div className="form-group">
                          <label>Country</label>
                          <Form.Item name="Country" rules={[{
                            required: true,
                            message: "Please input your Country!"
                          }]}>
                            <Input onChange={(event) => this.changeHandler(event)} />
                          </Form.Item>
                        </div>
                        <div className="form-group">
                          <label>Contact Person</label>
                          <Form.Item name="ContactPerson" rules={[{
                            required: true,
                            message: "Please input your Contact Person!"
                          }]}>
                            <Input onChange={(event) => this.changeHandler(event)} />
                          </Form.Item>
                        </div>
                        <div className="form-group">
                          <label>Email</label>
                          <Form.Item name="Email"
                            rules={[{ type: "email", message: "The input is not valid E-mail!" },
                            {
                              required: true, message: "Please input your Email!"
                            }]}>
                            <Input onChange={(event) => this.changeHandler(event)} />
                          </Form.Item>
                        </div>
                        <div className="form-group">
                          <label>Phone</label>
                          <Form.Item name="Phone" rules={[
                            {
                              type: "regexp",
                              pattern: new RegExp(/\d+/g),
                              message: "Please input only numbers!"
                            },
                            {
                              required: true, message: "Please input your Phone Number!"
                            }
                          ]}>
                            <Input onChange={(event) => this.changeHandler(event)} />
                          </Form.Item>
                        </div>
                        <div className="mt-4">
                          <Form.Item>
                            <Button type="primary" htmlType="submit">Submit</Button>
                          </Form.Item>
                        </div>
                      </Form>
                    </div>
                  </div>
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
