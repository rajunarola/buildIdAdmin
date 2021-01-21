import React, { Component } from 'react';
import { postRole } from '../Services/Roles';
import { Link } from 'react-router-dom'
import { Form, Input, notification } from 'antd';
import moment from 'moment';
export default class AddRoles extends Component {

  render() {

    const formRef = React.createRef();

    const sendRoleData = values => {
      const data = {
        Id: 0,
        Name: values.Name,
        RecordStatusId: 1,
        CreatedBy: parseInt(localStorage.getItem('userID')),
        ModifiedBy: parseInt(localStorage.getItem('userID')),
        DateCreated: moment(new Date()).format('YYYY-MM-DD'),
        DateModified: moment(new Date()).format('YYYY-MM-DD')
      }
      postRole(data).then(res => {
        if (res.data.message === "OK") {
          formRef.current.resetFields();
          notification.success({
            message: 'Success',
            description: 'Role has been successfully added!'
          });
        } else if (res.data.message !== "OK") {
          notification.info({
            message: 'Error',
            description: 'A record with the name already exists in database. The save for this record will not be finalized!'
          });
        }
      }).catch(err => {
        notification.error({
          message: 'Error',
          description: 'There was an error while adding Roles Data!'
        });
      });
    }

    return (
      <>
        <div className="container-fluid">
          <div className="d-sm-flex align-items-center justify-content-between mb-4 main-title-lg">
            <h1 className="h3 mb-0 text-gray-800">Add Roles</h1>
            <Link to="/roles-list" className="btn btn-orange-search">View Role List</Link>
          </div>
          <div className="trade-form-wrap mt-5 mb-5">
            <div className="row">
              <div className="col-lg-6">
                <div className="bg-white p-5 form-border">
                  <Form onFinish={sendRoleData} ref={formRef}>
                    <div className="form-group">
                      <label for="roleName">Role Name</label>
                      <Form.Item name="Name" rules={[{ required: true, message: 'Please enter Role Name!' }]}>
                        <Input />
                      </Form.Item>
                    </div>
                    <div className="mt-4">
                      <button type="submit" className="btn btn-orange-search">Add Role</button>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}
