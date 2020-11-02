import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../_layout/Footer/Footer'
import Header from '../_layout/Header/Header'
import SideNav from '../_layout/SideNav/SideNav'
import { Form, Input, Select, notification, Button, Checkbox } from 'antd';
import moment from 'moment';
import { getCompanyById, getRecordStatusForCompanies, postCompany } from '../Services/CompanyAPI'

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
        changeRecordStatusId: []
    }

    componentDidMount() {
        const tradeId = this.props.match.params.id;
        getCompanyById(tradeId).then(res => {
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
        }).catch(err => {
            notification.open({
                message: 'Error',
                description: 'There was an error while fetching company data!'
            });
        });

        getRecordStatusForCompanies().then(res => {
            this.setState({ changeRecordStatusId: res.data.data })
        }).catch(err => {
            notification.open({
                message: 'Error',
                description: 'There was an error while fetching record status for company data!'
            });
        });
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
                                                    <label for="Phone">Phone Number</label>
                                                    <Form.Item>
                                                        <Input name="Phone" value={this.state.Phone} onChange={(event) => this.changeHandler(event)} />
                                                    </Form.Item>
                                                </div>
                                                <div className="form-check">
                                                    <Checkbox name="Active" checked={this.state.Active ? true : false} onChange={(e) => this.getCheckBoxValue(e.target.checked)} />
                                                    <label className="form-check-label">Active</label>
                                                </div>
                                                <Form.Item>
                                                    <Button className="btn btn-primary" type="primary" htmlType="submit">Update Company</Button>
                                                </Form.Item>
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
