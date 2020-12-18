import React, { Component } from 'react';
import Footer from '../_layout/Footer/Footer'
import Header from '../_layout/Header/Header'
import SideNav from '../_layout/SideNav/SideNav'
import { Link } from 'react-router-dom';
import { Form, Input, Select, notification, Button, Image } from 'antd';
import { getItemById, getItemPicture, getRecordStatusListForItems, postItem, saveItemPicture, getItemPictureById } from '../Services/ItemAPI';
import Loader from '../Loader/Loader';

export default class EditItem extends Component {

    state = {
        Id: '',
        Name: '',
        RecordStatusId: '',
        changeRecordStatusId: [],
        imgSrc: '',
        Main: '',
        itemId: '',
        imageId: '',
        loading: false
    }

    componentDidMount() {
        this.setState({ loading: true })
        const itemId = this.props.match.params.id;
        console.log('this.props.match.params.id => ', this.props.match.params.id);
        getItemById(itemId).then(res => {
            console.log('res => ', res.data.data);
            this.setState({
                Id: res.data.data.id,
                Name: res.data.data.name,
                RecordStatusId: res.data.data.recordStatusId,
                imgSrc: res.data.data.imageUrl,
                loading: false
            });
        }).catch(err => {
            console.log('err => ', err);
            notification.open({
                message: 'Error',
                description: 'There was an error while fetching all Item data!'
            });
        });

        getItemPicture(itemId).then(res => {
            console.log('res getItemPicture=> ', res);
            this.setState({
                itemId: res.data.data[0].itemId,
                Main: res.data.data[0].main,
                imageId: res.data.data[0].id
            })
        }).catch(err => {
            console.log('err => ', err);
            notification.open({
                message: 'Error',
                description: 'There was an error while fetching Item picture data!'
            });
        })

        getRecordStatusListForItems().then(res => {
            console.log('res getRecordStatusForTrades=> ', res);
            this.setState({ changeRecordStatusId: res.data.data })
        }).catch(err => {
            notification.open({
                message: 'Error',
                description: 'There was an error while fetching Item record status list data!'
            });
        });
    }

    changeHandler = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleChange = (value) => {
        this.setState({ RecordStatusId: value })
    }

    changeImage = (e) => {
        this.setState({ loading: true })
        const files = Array.from(e.target.files);
        console.log('files => ', files);

        console.log('e => ', e, e.target.files[0]);
        const formData = new FormData();
        formData.append('Id', this.state.imageId)
        formData.append('ItemId', this.state.itemId)
        formData.append('FileUrl', files[0])
        formData.append('Main', true)
        formData.append('CreatedBy', parseInt(localStorage.getItem('userID')))
        formData.append('ModifiedBy', parseInt(localStorage.getItem('userID')))
        saveItemPicture(formData).then(res => {
            console.log('response => ', res);
            if (res.data.status === true) {
                this.setState({ loading: false });
                // getItemPictureById(this.state.itemId).then(res => {
                //     console.log('res getItemPicture=> ', res);
                //     this.setState({
                //         imageId: res.data.data.imageUrl
                //     })
                // }).catch(err => {
                //     console.log('err => ', err);
                //     notification.open({
                //         message: 'Error',
                //         description: 'There was an error while fetching Item picture data!'
                //     });
                // })
                notification.open({
                    message: 'Success',
                    description: 'Image Changed Successfully!'
                });
            } else {
                this.setState({ loading: false });
                notification.open({
                    message: 'Error',
                    description: 'There was an error while uploading an image! Please try again!'
                });
            }
        }).catch(err => {
            this.setState({ loading: false });
            notification.open({
                message: 'Error',
                description: 'There was an error while uploading an image! Please try again!'
            });
            console.log('error => ', err);
        });
    }

    render() {

        const updateItem = () => {
            const data = {
                Content: [
                    {
                        Id: this.state.Id,
                        Name: this.state.Name,
                        RecordStatusId: this.state.RecordStatusId,
                        CreatedBy: parseInt(localStorage.getItem('userID')),
                        ModifiedBy: parseInt(localStorage.getItem('userID'))
                    }
                ]
            }
            postItem({ Content: JSON.stringify(data.Content) }).then(res => {
                console.log('res => ', res);
                if (res.data.status === true) {
                    notification.open({
                        message: 'Success',
                        description: 'Item successfully updated!'
                    });
                }
            }).catch(err => {
                notification.open({
                    message: 'Error',
                    description: 'There was an error while updating Item data!'
                });
            });
        }

        return (
            <div>
                {this.state.loading ? <Loader /> :
                    <div className="d-flex">
                        <SideNav />
                        <div id="content-wrapper" className="d-flex flex-column w-100 content-relative">
                            <div className="content">
                                <Header />
                            </div>
                            <div className="container-fluid">
                                <div className="main-title-lg mb-5 d-flex justify-content-between">
                                    <h1 className="h3 text-gray-800">Edit Item</h1>
                                    <Link to="/item-list" className="btn btn-orange-search">View Item List</Link>
                                </div>
                                <div className="trade-form-wrap">
                                    <div className="row mt-5">
                                        <div className="col-lg-6">
                                            <div className="bg-white p-5 form-border">
                                                <Form onFinish={updateItem}>
                                                    <div className="form-group">
                                                        <label>Item Image</label>
                                                        <Form.Item>
                                                            <Image width={200} src={this.state.imgSrc} />
                                                            <input type="file" onChange={(e) => this.changeImage(e)} />
                                                        </Form.Item>
                                                    </div>
                                                    <div className="form-group">
                                                        <label>Item Name</label>
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
                                                        <Button type="primary" htmlType="submit">Update Item</Button>
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
                }
            </div>
        )
    }
}
