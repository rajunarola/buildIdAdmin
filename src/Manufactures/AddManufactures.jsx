import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { postManufacturers, getRecordStatusForManufacturers } from '../Services/ManufacturersAPI'
import Footer from '../_layout/Footer/Footer'
import Header from '../_layout/Header/Header'
import SideNav from '../_layout/SideNav/SideNav'
import moment from 'moment';
import { Select, notification, Form, Input } from 'antd';

export default class AddManufactures extends Component {

    state = {
        Id: 0,
        manufacturerData: [],
        CreatedBy: 1,
        ModifiedBy: 1,
        RecordStatusId: 1,
    }

    // componentDidMount() {
    //     getRecordStatusForManufacturers().then(res => {
    //         this.setState({ getAllRecordStatus: res.data.data })
    //     }).catch(err => {
    //         notification.open({
    //             message: 'Error',
    //             description: 'There was an error while fetching Records Status for Trade Data!'
    //         });
    //     });
    // }

    changeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }


    handleChange = (event) => {
        this.setState({ RecordStatusId: event });
    }

    render() {

        const formRef = React.createRef();

        const sendMenufacturerData = values => {
            const data = {
                Content: [
                    {
                        Id: this.state.Id,
                        Name: values.manufacturerName,
                        RecordStatusId: this.state.RecordStatusId,
                        CreatedBy: this.state.CreatedBy,
                        ModifiedBy: this.state.ModifiedBy
                    }
                ]
            }
            postManufacturers({ Content: JSON.stringify(data.Content) }).then(res => {
                console.log('res => ', res);
                if (res.data.status === true) {
                    formRef.current.resetFields();
                    this.setState({ RecordStatusId: [] })
                    notification.open({
                        message: 'Success',
                        description: 'Manufacturer data has been successfully added!'
                    });
                }
            }).catch(err => {
                notification.open({
                    message: 'Error',
                    description: 'There was an error while adding Manufacturer Data!'
                });
            });
        }

        const onFinishFailed = errorInfo => {
            console.log('Failed:', errorInfo);
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
                                <h1 className="h3 mb-0 text-gray-800">Add Manufacturer</h1>
                                <Link to="/manufacturers-list" className="btn btn-orange-search">View Manufacturers List</Link>
                            </div>
                            <div className="trade-form-wrap mt-5 mb-5">
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="bg-white p-5 form-border">
                                            <Form onFinish={sendMenufacturerData}
                                                onFinishFailed={onFinishFailed}
                                                ref={formRef}>
                                                <div className="form-group">
                                                    <label >Manufacturer Name</label>
                                                    <Form.Item
                                                        value={this.state.name}
                                                        name="manufacturerName"
                                                        rules={[{ required: true, message: 'Please enter Manufacturer Name!' }]}>
                                                        <Input onChange={(event) => this.changeHandler(event)} />
                                                    </Form.Item>
                                                </div>
                                                <div className="mt-4">
                                                    <button type="submit" className="btn btn-blue-search">Submit</button>
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
