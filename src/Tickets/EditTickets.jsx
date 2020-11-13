import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../_layout/Footer/Footer'
import Header from '../_layout/Header/Header'
import SideNav from '../_layout/SideNav/SideNav'
import { Form, Input, Select, notification, Button } from 'antd';
import moment from 'moment';
import { getRecordStatusForTicket, getTicketById, postTicket } from '../Services/TicketAPI'
export default class EditTickets extends Component {

    state = {
        Id: '',
        Name: '',
        RecordStatusId: '',
        CreatedBy: '',
        DateCreated: '',
        ModifiedBy: '',
        DateModified: '',
        changeRecordStatusId: []
    }

    componentDidMount() {
        const tradeId = this.props.match.params.id;
        console.log('this.props.match.params.id => ', this.props.match.params.id);
        getTicketById(tradeId).then(res => {
            console.log('res => ', res);
            this.setState({
                Id: res.data.data.id,
                Name: res.data.data.name,
                RecordStatusId: res.data.data.recordStatusId,
                CreatedBy: res.data.data.createdBy,
                DateCreated: res.data.data.dateCreated,
                ModifiedBy: res.data.data.modifiedBy,
                DateModified: res.data.data.dateModified
            });
        }).catch(err => {
            console.log('err => ', err);

        })

        getRecordStatusForTicket().then(res => {
            console.log('res getRecordStatusForTrades=> ', res);
            this.setState({ changeRecordStatusId: res.data.data })
        }).catch(err => {
            console.log('err => ', err);
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

        const updateTicket = () => {
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
            postTicket({ Content: JSON.stringify(data.Content) }).then(res => {
                console.log('res => ', res);
                if (res.data.status === true) {
                    notification.open({
                        message: 'Success',
                        description: 'Ticket type successfully updated!'
                    });
                }
            }).catch(err => {
                console.log('err => ', err);
                notification.open({
                    message: 'Error',
                    description: 'There was an error while updating ticket type!'
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
                                <h1 className="h3 text-gray-800">Edit Ticket Type</h1>
                                <Link to="/ticket-list" className="btn btn-orange-search">View Ticket Type List</Link>
                            </div>
                            <div className="trade-form-wrap">
                                <div className="row mt-5">
                                    <div className="col-lg-6">
                                        <div className="bg-white p-5 form-border">
                                            <Form onFinish={updateTicket}>
                                                <div className="form-group">
                                                    <label>Name</label>
                                                    <Form.Item>
                                                        <Input name="Name" value={this.state.Name} onChange={(e) => this.changeHandler(e)} />
                                                    </Form.Item>
                                                </div>
                                                <div className="form-group">
                                                    <label className="formlabel">Record Status </label>
                                                    <Select className="form-ant-control w-100 inputstyle" value={this.state.RecordStatusId} onChange={(e) => this.handleChange(e)}>
                                                        {
                                                            this.state.changeRecordStatusId.map(roleDetails => (
                                                                <Select.Option value={roleDetails.id}>{roleDetails.name}</Select.Option>
                                                            ))
                                                        }
                                                    </Select>
                                                </div>
                                                <Form.Item>
                                                    <Button type="primary" htmlType="submit">Update Ticket</Button>
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
