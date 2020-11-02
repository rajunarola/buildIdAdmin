import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../_layout/Footer/Footer';
import Header from '../_layout/Header/Header';
import SideNav from '../_layout/SideNav/SideNav';
import * as moment from "moment";
import { postTrades } from '../Services/TradeAPI';
import { notification, Input, Form, Button } from 'antd';

export default class Trades extends Component {

    changeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {

        const formRef = React.createRef();

        const sendTradeData = values => {
            const data = {
                Id: 0,
                Name: values.Name,
                RecordStatusId: 1,
                CreatedBy: 1,
                DateCreated: moment(new Date()).format('YYYY-MM-DD'),
                ModifiedBy: 1,
                DateModified: moment(new Date()).format('YYYY-MM-DD')
            }
            postTrades(data).then(res => {
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
                <div className="d-flex">
                    <SideNav />
                    <div id="content-wrapper" className="d-flex flex-column w-100 content-relative">
                        <div className="content">
                            <Header />
                        </div>

                        <div className="container-fluid">
                            <div className="d-sm-flex align-items-center justify-content-between mb-4 main-title-lg">
                                <h1 className="h3 mb-0 text-gray-800">Add Trades</h1>
                                <Link to="/trade-list" className="btn btn-orange-search">View Trades List</Link>
                            </div>

                            <div className="trade-form-wrap">
                                <div className="row mt-5">
                                    <div className="col-lg-6">
                                        <div className="bg-white p-5 form-border">
                                            <Form onFinish={sendTradeData} ref={formRef}>
                                                <div className="form-group">
                                                    <label>Trade Name</label>
                                                    <Form.Item name="Name" rules={[{
                                                        required: true, message: "Please enter your Trade Name!"
                                                    }]}>
                                                        <Input onChange={(event) => this.changeHandler(event)} />
                                                    </Form.Item>
                                                </div>
                                                <div className="text-left">
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
            </div>
        )
    }
}
