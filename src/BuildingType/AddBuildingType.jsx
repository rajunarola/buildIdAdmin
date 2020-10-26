import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { postBuildingType } from '../Services/BuildingType'
import Footer from '../_layout/Footer/Footer'
import Header from '../_layout/Header/Header'
import SideNav from '../_layout/SideNav/SideNav'
import { notification, Form, Input } from 'antd';

export default class AddBuildingType extends Component {

    state = {
        Id: 0,
        Name: '',
        RecordStatusId: 1,
        CreatedBy: 1,
        ModifiedBy: 1
    }

    changeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }


    render() {

        const formRef = React.createRef();

        const onFinishFailed = errorInfo => {
            console.log('Failed:', errorInfo);
        }

        const sendBuildingTypeData = (values) => {
            const data = {
                Content: [
                    {
                        Id: this.state.Id,
                        Name: values.buildingTypeName,
                        RecordStatusId: this.state.RecordStatusId,
                        CreatedBy: this.state.CreatedBy,
                        ModifiedBy: this.state.ModifiedBy
                    }
                ]
            }
            postBuildingType({ Content: JSON.stringify(data.Content) }).then(res => {
                if (res.data.status === true) {
                    formRef.current.resetFields();
                    notification.open({
                        message: 'Success',
                        description: 'Building Type has been successfully added!'
                    });
                }
            }).catch(err => {
                notification.open({
                    message: 'Error',
                    description: 'There was an error while adding Building Type Data!'
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
                                <h1 className="h3 mb-0 text-gray-800">Add Building Type</h1>
                                <Link to="/building-type-list" className="btn btn-orange-search">View Building Type List</Link>
                            </div>
                            <div className="trade-form-wrap mt-5 mb-5">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="bg-white p-5 form-border">
                                            <Form onFinish={sendBuildingTypeData}
                                                onFinishFailed={onFinishFailed}
                                                ref={formRef}>
                                                <div className="form-group">
                                                    <label>Building Type Name</label>
                                                    <Form.Item
                                                        value={this.state.name}
                                                        name="buildingTypeName"
                                                        rules={[{ required: true, message: 'Please enter Ticket Name!' }]}>
                                                        <Input onChange={(event) => this.changeHandler(event)} />
                                                    </Form.Item>
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
