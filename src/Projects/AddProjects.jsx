import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Footer from '../_layout/Footer/Footer';
import Header from '../_layout/Header/Header';
import SideNav from '../_layout/SideNav/SideNav';
import * as moment from "moment";
import { postProject } from '../Services/ProjectAPI';
import { notification, Form, Checkbox, Input, Button } from 'antd';

export default class AddProjects extends Component {

    state = {
        Id: 0,
        Name: '',
        RecordStatusId: 1,
        CreatedBy: 1,
        DateCreated: moment(new Date()).format('YYYY-MM-DD'),
        ModifiedBy: 1,
        DateModified: moment(new Date()).format('YYYY-MM-DD'),
        getAllRecordStatus: []
    }

    changeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleChange = (event) => {
        console.log('value => ', event);
        this.setState({ RecordStatusId: event })
        console.log('this.state.TicketTypeId => ', this.state.RecordStatusId);
    }


    render() {

        const formRef = React.createRef();

        const onFinishFailed = errorInfo => {
            console.log('Failed:', errorInfo);
        }

        const sendProjectData = values => {
            console.log('values => ', values);
            const data = {
                Content: [
                    {
                        Id: this.state.Id,
                        Name: values.projectName,
                        RecordStatusId: this.state.RecordStatusId,
                        CreatedBy: 1,
                        Address: values.address,
                        Country: values.country,
                        Province: values.province,
                        ModifiedBy: 1,
                        Active: 1,
                        StartDate: moment(new Date()).format('YYYY-MM-DD'),
                        EndDate: moment(new Date()).format('YYYY-MM-DD'),
                        BuildingTypeId: 1,
                        ContractorId: 1,
                    }
                ]
            }
            postProject({ Content: JSON.stringify(data.Content) }).then(res => {
                if (res.data.status === true) {
                    formRef.current.resetFields();
                    notification.open({
                        message: 'Success',
                        description: 'Trade has been successfully added!'
                    });
                }
            }).catch(err => {
                notification.open({
                    message: 'Error',
                    description: 'There was an error while adding Trade Data!'
                });
            })
        }

        return (
            <div>
                <div class="d-flex">
                    <SideNav />
                    <div id="content-wrapper" class="d-flex flex-column w-100 content-relative">
                        <div class="content">
                            <Header />
                        </div>

                        <div class="container-fluid">
                            <div class="d-sm-flex align-items-center justify-content-between mb-4 main-title-lg">
                                <h1 class="h3 mb-0 text-gray-800">Add Project</h1>
                                <Link to="/project-list" class="btn btn-orange-search">View Project List</Link>
                            </div>

                            <div class="trade-form-wrap">
                                <div class="row mt-5">
                                    <div class="col-lg-6">
                                        <div class="bg-white p-5 form-border">
                                            <Form onFinish={sendProjectData}
                                                onFinishFailed={onFinishFailed}
                                                ref={formRef}>
                                                <div class="form-group">
                                                    <label>Project Name</label>
                                                    <Form.Item
                                                        value={this.state.name}
                                                        name="projectName"
                                                        rules={[{ required: true, message: 'Please enter Project Name!' }]}>
                                                        <Input onChange={(event) => this.changeHandler(event)} />
                                                    </Form.Item>
                                                </div>
                                                <div>
                                                    <label>Address</label>
                                                    <Form.Item>
                                                        <Form.Item
                                                            name={['address']}
                                                            noStyle
                                                            rules={[{ required: true, message: 'Address is required' }]} >
                                                            <Input style={{ width: '100%' }} placeholder="Address" />
                                                        </Form.Item>
                                                    </Form.Item>
                                                </div>
                                                <div>
                                                    <label>City</label>
                                                    <Form.Item>
                                                        <Form.Item
                                                            name={['city']}
                                                            noStyle
                                                            rules={[{ required: true, message: 'City is required' }]}>
                                                            <Input style={{ width: '100%' }} placeholder="City" />
                                                        </Form.Item>
                                                    </Form.Item>
                                                </div>
                                                <div>
                                                    <label>Postal Code</label>
                                                    <Form.Item>
                                                        <Form.Item
                                                            name={['postalCode']}
                                                            noStyle
                                                            rules={[{ required: true, message: 'Postal Code is required' }]}>
                                                            <Input style={{ width: '100%' }} placeholder="Postal Code" />
                                                        </Form.Item>
                                                    </Form.Item>
                                                </div>
                                                <div>
                                                    <label>Province</label>
                                                    <Form.Item>
                                                        <Form.Item
                                                            name={['province']}
                                                            noStyle
                                                            rules={[{ required: true, message: 'Province  is required' }]}>
                                                            <Input style={{ width: '100%' }} placeholder="Province" />
                                                        </Form.Item>
                                                    </Form.Item>
                                                </div>
                                                <div>
                                                    <label>Country</label>
                                                    <Form.Item>
                                                        <Form.Item
                                                            name={['country']}
                                                            noStyle
                                                            rules={[{ required: true, message: 'Country is required' }]}>
                                                            <Input style={{ width: '100%' }} placeholder="Country" />
                                                        </Form.Item>
                                                    </Form.Item>
                                                </div>
                                                <div>
                                                    <Form.Item name="checkbox-group">
                                                        <Checkbox value={1} style={{ lineHeight: '32px' }}>
                                                            Active
                                                        </Checkbox>
                                                    </Form.Item>
                                                </div>
                                                <div class="text-left">
                                                    <Form.Item>
                                                        <Button htmlType="submit" className="btn btn-blue-search">Submit</Button>
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
            </div>
        )
    }
}
