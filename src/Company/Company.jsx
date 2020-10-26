import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { postCompany, getRecordStatusForCompanies } from '../Services/CompanyAPI'
import Footer from '../_layout/Footer/Footer'
import Header from '../_layout/Header/Header'
import SideNav from '../_layout/SideNav/SideNav'
import { Select, notification, Input, Form, Button } from 'antd';

export default class Company extends Component {

    state = {
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
    }

    changeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    getCheckBoxValue = (e) => {
        this.setState({ Active: e });
    }

    render() {

        const formRef = React.createRef();

        const sendCompanyData = value => {
            const data = {
                Content: [
                    {
                        Id: this.state.Id,
                        Name: value.Name,
                        RecordStatusId: this.state.RecordStatusId,
                        CreatedBy: this.state.CreatedBy,
                        ModifiedBy: this.state.ModifiedBy,
                        QbId: this.state.QbId,
                        WebSite: value.WebSite,
                        Phone: value.Phone,
                        IndustryId: this.state.IndustryId,
                        Active: this.state.Active
                    }
                ]
            }
            postCompany({ Content: JSON.stringify(data.Content) }).then(res => {
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
                                <h1 className="h3 mb-0 text-gray-800">Add Company</h1>
                                <Link to="/company-list" className="btn btn-orange-search">View Company List</Link>
                            </div>
                            <div className="trade-form-wrap mt-5 mb-5">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="bg-white p-5 form-border">
                                            <Form onFinish={sendCompanyData} ref={formRef}>
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
                                                    <Form.Item name="PhoneNo" rules={[{
                                                        required: true,
                                                        message: "Please input your phone number!"
                                                    }]}>
                                                        <Input onChange={(event) => this.changeHandler(event)} />
                                                    </Form.Item>
                                                </div>
                                                <div className="form-check">
                                                    <input value={this.state.Active} className="form-check-input" type="checkbox" name="Active" onChange={(e) => this.getCheckBoxValue(e.target.checked)} />
                                                    <label className="form-check-label">Active</label>
                                                </div>
                                                <div className="mt-4">
                                                    <button type="submit" className="btn btn-orange-search">Submit</button>
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
            </div>
        )
    }
}
