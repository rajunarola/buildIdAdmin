import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { postManufacturers } from '../Services/ManufacturersAPI'
import { notification, Form, Input } from 'antd';
export default class AddManufactures extends Component {

  render() {

    const formRef = React.createRef();

    const sendMenufacturerData = values => {
      const data = {
        Content: [
          {
            Id: 0,
            Name: values.manufacturerName,
            RecordStatusId: 1,
            CreatedBy: 1,
            ModifiedBy: 1
          }
        ]
      }
      postManufacturers({ Content: JSON.stringify(data.Content) }).then(res => {
        if (res.data.status === true) {
          formRef.current.resetFields();
          notification.success({
            message: 'Success',
            description: 'Manufacturer data has been successfully added!'
          });
        }
      }).catch(err => {
        notification.error({
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
        <div className="container-fluid">
          <div className="d-sm-flex align-items-center justify-content-between mb-4 main-title-lg">
            <h1 className="h3 mb-0 text-gray-800">Add Manufacturer</h1>
            <Link to="/manufacturers-list" className="btn btn-orange-search">View Manufacturers List</Link>
          </div>
          <div className="trade-form-wrap mt-5 mb-5">
            <div className="row">
              <div className="col-lg-6">
                <div className="bg-white p-5 form-border">
                  <Form onFinish={sendMenufacturerData} onFinishFailed={onFinishFailed} ref={formRef}>
                    <div className="form-group">
                      <label >Manufacturer Name</label>
                      <Form.Item name="manufacturerName" rules={[{ required: true, message: 'Please enter Manufacturer Name!' }]}>
                        <Input />
                      </Form.Item>
                    </div>
                    <div className="mt-4">
                      <button type="submit" className="btn btn-orange-search">Add Manufacturer</button>
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
