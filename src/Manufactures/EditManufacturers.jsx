import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../_layout/Footer/Footer'
import Header from '../_layout/Header/Header'
import SideNav from '../_layout/SideNav/SideNav'
import { Form, Input, Select, notification, Button } from 'antd';
import { getManufacturersById, getRecordStatusForManufacturers, postManufacturers } from '../Services/ManufacturersAPI'
export default class EditManufacturers extends Component {

    state = {
        Id: '',
        Name: '',
        RecordStatusId: '',
        CreatedBy: '',
        ModifiedBy: '',
        changeRecordStatusId: []
    }

    componentDidMount() {
        const manufacturerId = this.props.match.params.id;
        console.log('this.props.match.params.id => ', this.props.match.params.id);
        getManufacturersById(manufacturerId).then(res => {
            console.log('res getManufacturersById=> ', res);
            this.setState({
                Id: res.data.data.id,
                Name: res.data.data.name,
                RecordStatusId: res.data.data.recordStatusId,
                CreatedBy: res.data.data.createdBy,
                ModifiedBy: res.data.data.modifiedBy,
            });
        }).catch(err => {
            notification.open({
                message: 'Error',
                description: 'There was an error while fetching manufacturer data!'
            });
        });

        getRecordStatusForManufacturers().then(res => {
            console.log('res getRecordStatusForManufacturers=> ', res);
            this.setState({ changeRecordStatusId: res.data.data })
        }).catch(err => {
            notification.open({
                message: 'Error',
                description: 'There was an error while fetching manufacturer record status!'
            });
        });
    }

    handleChange = (value) => {
        this.setState({ RecordStatusId: value })
    }

    changeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }


    render() {

        const updateManufacturer = () => {
            const data = {
                Content: [
                    {
                        Id: this.state.Id,
                        Name: this.state.Name,
                        RecordStatusId: this.state.RecordStatusId,
                        CreatedBy: parseInt(localStorage.getItem('userID')),
                        ModifiedBy: parseInt(localStorage.getItem('userID')),
                    }
                ]
            }
            postManufacturers({ Content: JSON.stringify(data.Content) }).then(res => {
                console.log('res => ', res);
                if (res.data.status === true) {
                    notification.open({
                        message: 'Success',
                        description: 'Manufacturer data successfully updated!'
                    });
                }
            }).catch(err => {
                notification.open({
                    message: 'Error',
                    description: 'There was an error while updating manufacturer!'
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
                                <h1 className="h3 text-gray-800">Edit Manufacturer</h1>
                                <Link to="/manufacturers-list" className="btn btn-orange-search">View Manufacturer List</Link>
                            </div>
                            <div className="trade-form-wrap">
                                <div className="row mt-5">
                                    <div className="col-lg-6">
                                        <div className="bg-white p-5 form-border">
                                            <Form onFinish={updateManufacturer}>
                                                <div className="form-group">
                                                    <label>Manufacturer Name</label>
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
                                                <Form.Item>
                                                    <Button type="primary" htmlType="submit">Update Trade</Button>
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
