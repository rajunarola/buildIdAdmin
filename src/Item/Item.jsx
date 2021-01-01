import React, { Component } from 'react';
import { Form, notification, Input, Button } from 'antd';
import { Link } from 'react-router-dom';
import { postItem } from '../Services/ItemAPI';
export default class Item extends Component {

  render() {

    const formRef = React.createRef();

    const onFinishFailed = errorInfo => {
      console.log('Failed:', errorInfo);
    }

    const sendItemData = values => {
      const data = {
        Content: [
          {
            Id: 0,
            Name: values.itemName,
            RecordStatusId: 1,
            CreatedBy: 1,
            ModifiedBy: 1
          }
        ]
      }
      postItem({ Content: JSON.stringify(data.Content) }).then(res => {
        if (res.data.status === true) {
          formRef.current.resetFields();
          notification.success({
            message: 'Success',
            description: 'An item data has been successfully added!'
          });
        }
      }).catch(err => {
        notification.error({
          message: 'Error',
          description: 'There was an error while adding an item Data!'
        });
      });
    }

    return (
      <div>
        <div className="container-fluid">
          <div className="d-sm-flex align-items-center justify-content-between mb-4 main-title-lg">
            <h1 className="h3 mb-0 text-gray-800">Add Items</h1>
            <Link to="/item-list" className="btn btn-orange-search">View Item List</Link>
          </div>
          <div className="trade-form-wrap mt-5 mb-5">
            <div className="row">
              <div className="col-lg-6">
                <div className="bg-white p-5 form-border">
                  <Form onFinish={sendItemData} onFinishFailed={onFinishFailed} ref={formRef}>
                    <div className="form-group">
                      <label>Item Name</label>
                      <Form.Item name="itemName" rules={[{ required: true, message: 'Please enter Item Name!' }]}>
                        <Input />
                      </Form.Item>
                    </div>
                    <div className="mt-4">
                      <button className="btn btn-orange-search">Add Item</button>
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
