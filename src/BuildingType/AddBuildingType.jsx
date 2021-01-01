import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { postBuildingType } from '../Services/BuildingType'
import { notification, Form, Input } from 'antd';
export default class AddBuildingType extends Component {

  render() {

    const formRef = React.createRef();

    const onFinishFailed = errorInfo => {
      console.log('Failed:', errorInfo);
    }

    const sendBuildingTypeData = (values) => {
      const data = {
        Content: [
          {
            Id: 0,
            Name: values.buildingTypeName,
            RecordStatusId: 1,
            CreatedBy: 1,
            ModifiedBy: 1
          }
        ]
      }
      postBuildingType({ Content: JSON.stringify(data.Content) }).then(res => {
        if (res.data.status === true) {
          formRef.current.resetFields();
          notification.success({
            message: 'Success',
            description: 'Building Type has been successfully added!'
          });
        }
      }).catch(err => {
        notification.error({
          message: 'Error',
          description: 'There was an error while adding Building Type Data!'
        });
      });
    }

    return (
      <div>
        <div className="container-fluid">
          <div className="d-sm-flex align-items-center justify-content-between mb-4 main-title-lg">
            <h1 className="h3 mb-0 text-gray-800">Add Building Type</h1>
            <Link to="/building-type-list" className="btn btn-orange-search">View Building Type List</Link>
          </div>
          <div className="trade-form-wrap mt-5 mb-5">
            <div className="row">
              <div className="col-lg-6">
                <div className="bg-white p-5 form-border">
                  <Form onFinish={sendBuildingTypeData} onFinishFailed={onFinishFailed} ref={formRef}>
                    <div className="form-group">
                      <label>Building Type Name</label>
                      <Form.Item name="buildingTypeName" rules={[{ required: true, message: 'Please enter Ticket Name!' }]}>
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
      </div>
    )
  }
}
