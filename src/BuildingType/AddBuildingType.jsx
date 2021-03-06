import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { postBuildingType } from '../Services/BuildingType'
import { notification, Form, Input } from 'antd';
import Loader from '../Loader/Loader';
export default class AddBuildingType extends Component {

  state = {
    loading: false
  }

  render() {

    const onFinishFailed = () => { }

    const sendBuildingTypeData = (values) => {
      this.setState({ loading: true }, () => {
        const data = {
          Content: [
            {
              Id: 0,
              Name: values.buildingTypeName,
              RecordStatusId: 1,
              CreatedBy: parseInt(localStorage.getItem('userID')),
              ModifiedBy: parseInt(localStorage.getItem('userID'))
            }
          ]
        }
        postBuildingType({ Content: JSON.stringify(data.Content) }).then(res => {
          if (res.data.message === "OK") {
            this.setState({ loading: false }, () => {
              notification.success({
                message: 'Success',
                description: 'Building Type has been successfully added!'
              });
            });
          } else if (res.data.message !== "OK") {
            this.setState({ loading: false }, () => {
              notification.info({
                message: 'Error',
                description: 'A record with the name already exists in database. The save for this record will not be finalized!'
              });
            });
          }
        }).catch(err => {
          this.setState({ loading: false }, () => {
            notification.error({
              message: 'Error',
              description: 'There was an error while adding Building Type Data!'
            });
          });
        });
      })
    }

    return (
      <>
        {this.state.loading ? <Loader /> :
          <div className="container-fluid">
            <div className="d-sm-flex align-items-center justify-content-between mb-4 main-title-lg">
              <h1 className="h3 mb-0 text-gray-800">Add Building Type</h1>
              <Link to="/building-type-list" className="btn btn-orange-search">View Building Type List</Link>
            </div>
            <div className="trade-form-wrap mt-5 mb-5">
              <div className="row">
                <div className="col-lg-6">
                  <div className="bg-white p-5 form-border">
                    <Form onFinish={sendBuildingTypeData} onFinishFailed={onFinishFailed}>
                      <div className="form-group">
                        <label>Building Type Name</label>
                        <Form.Item name="buildingTypeName" rules={[{ required: true, message: 'Please enter Building Type Name!' }]}>
                          <Input />
                        </Form.Item>
                      </div>
                      <div className="mt-4">
                        <button type="submit" className="btn btn-orange-search">Add Building Type</button>
                      </div>
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
