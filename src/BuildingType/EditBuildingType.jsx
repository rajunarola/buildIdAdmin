import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Select, notification, } from 'antd';
import { getBuildTypeById, recordStatusForManufacturers, postBuildingType } from '../Services/BuildingType';
import Loader from '../Loader/Loader';
export default class EditBuildingType extends Component {

  formRef = React.createRef()

  state = {
    changeRecordStatusId: [],
    RecordStatusId: '',
    loading: false
  }

  componentDidMount() {
    this.setState({ loading: true }, () => {
      Promise.all([getBuildTypeById(parseInt(this.props.match.params.id)), recordStatusForManufacturers()]).then(values => {
        console.log('values => ', values);
        if (values[0] && values[1] && values[0].status === 200 && values[1].status) {
          this.setState({
            RecordStatusId: values[0].data.data.recordStatusId,
            changeRecordStatusId: values[1].data.data,
            loading: false
          }, () => {
            this.formRef.current.setFieldsValue({
              Name: values[0].data.data.name
            });
          });
        } else {
          this.setState({ loading: false }, () => {
            notification.error({
              message: 'Error',
              description: 'There was an error while fetching manufacturer data!'
            });
          });
        }
      }).catch(err => {
        this.setState({ loading: false }, () => {
          notification.error({
            message: 'Error',
            description: 'There was an error while fetching manufacturer data!'
          });
        });
      });
    })
  }

  handleChange = (value) => {
    this.setState({ RecordStatusId: value })
  }

  render() {

    const updateBuildType = (values) => {
      this.setState({ loading: true }, () => {
        console.log('this.state.changeRecordStatusId => ', this.state.RecordStatusId);
        const data = {
          Content: [
            {
              Id: parseInt(this.props.match.params.id),
              Name: values.Name,
              RecordStatusId: this.state.RecordStatusId ? this.state.RecordStatusId : this.state.changeRecordStatusId,
              CreatedBy: parseInt(localStorage.getItem('userID')),
              ModifiedBy: parseInt(localStorage.getItem('userID')),
            }
          ]
        }
        postBuildingType({ Content: JSON.stringify(data.Content) }).then(res => {
          if (res.data.status === true) {
            notification.success({
              message: 'Success',
              description: 'Building Type successfully updated!'
            });
            Promise.all([getBuildTypeById(parseInt(this.props.match.params.id)), recordStatusForManufacturers()]).then(values => {
              if (values[0] && values[1] && values[0].status === 200 && values[1].status) {
                this.setState({
                  RecordStatusId: values[0].data.data.recordStatusId,
                  changeRecordStatusId: values[1].data.data,
                  loading: false
                }, () => {
                  this.formRef.current.setFieldsValue({
                    Name: values[0].data.data.name
                  });
                });
              } else {
                this.setState({ loading: false });
              }
            }).catch(err => {
              this.setState({ loading: false });
            });
          }
        }).catch(err => {
          this.setState({ loading: false }, () => {
            notification.error({
              message: 'Error',
              description: 'There was an error while updating building type!'
            });
          });
        });
      })
    }

    return (
      <>
        {
          this.state.loading ? <Loader /> :
            <div className="container-fluid">
              <div className="main-title-lg mb-5 d-flex justify-content-between">
                <h1 className="h3 text-gray-800">Edit Building Type</h1>
                <Link to="/building-type-list" className="btn btn-orange-search">View Building List</Link>
              </div>
              <div className="trade-form-wrap">
                <div className="row mt-5">
                  <div className="col-lg-6">
                    <div className="bg-white p-5 form-border">
                      <Form onFinish={updateBuildType} ref={this.formRef}>
                        <div className="form-group">
                          <label>Building Type Name</label>
                          <Form.Item name="Name">
                            <Input />
                          </Form.Item>
                        </div>
                        <div className="form-group">
                          <label className="formlabel">Record Status </label>
                          <Select className="form-ant-control w-100 inputstyle" value={this.state.RecordStatusId} onChange={(e) => this.handleChange(e)}>
                            {this.state.changeRecordStatusId.map(tradeDetails => (
                              <Select.Option value={tradeDetails.id}>{tradeDetails.name}</Select.Option>
                            ))}
                          </Select>
                        </div>
                        <button className="btn btn-orange-search">Update Building Type</button>
                      </Form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        }
      </>
    )
  }
}
