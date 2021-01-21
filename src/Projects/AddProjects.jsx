import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import * as moment from "moment";
import { postProject } from '../Services/ProjectAPI';
import { notification, Form, Input } from 'antd';
export default class AddProjects extends Component {

  render() {

    const formRef = React.createRef();

    const onFinishFailed = errorInfo => {
      console.log('Failed:', errorInfo);
    }

    const sendProjectData = values => {
      const data = {
        Content: [
          {
            Id: 0,
            Name: values.projectName,
            RecordStatusId: 1,
            CreatedBy: parseInt(localStorage.getItem('userID')),
            Address: values.address,
            City: values.city,
            Country: values.country,
            Province: values.province,
            PostalCode: values.postalCode,
            ModifiedBy: parseInt(localStorage.getItem('userID')),
            Active: 1,
            StartDate: moment(new Date()).format('YYYY-MM-DD'),
            EndDate: moment(new Date()).format('YYYY-MM-DD'),
            BuildingTypeId: 1,
            ContractorId: 1,
          }
        ]
      }
      postProject({ Content: JSON.stringify(data.Content) }).then(res => {
        if (res.data.status === true) {
          formRef.current.resetFields();
          notification.success({
            message: 'Success',
            description: 'Project has been successfully added!'
          });
        }
      }).catch(err => {
        notification.error({
          message: 'Error',
          description: 'There was an error while adding project data!'
        });
      })
    }

    return (
      <div>
        <div class="container-fluid">
          <div class="d-sm-flex align-items-center justify-content-between mb-4 main-title-lg">
            <h1 class="h3 mb-0 text-gray-800">Add Project</h1>
            <Link to="/project-list" class="btn btn-orange-search">View Project List</Link>
          </div>

          <div class="trade-form-wrap">
            <div class="row mt-5">
              <div class="col-lg-6">
                <div class="bg-white p-5 form-border">
                  <Form onFinish={sendProjectData} onFinishFailed={onFinishFailed} ref={formRef}>
                    <div class="form-group">
                      <label>Project Name</label>
                      <Form.Item name="projectName" rules={[{ required: true, message: 'Project Name is required!' }]}>
                        <Input />
                      </Form.Item>
                    </div>
                    <div>
                      <label>Address</label>
                      <Form.Item name='address' rules={[{ required: true, message: 'Address is required' }]}>
                        <Input />
                      </Form.Item>
                    </div>
                    <div>
                      <label>City</label>
                      <Form.Item name='city' rules={[{ required: true, message: 'City is required' }]}>
                        <Input />
                      </Form.Item>
                    </div>
                    <div>
                      <label>Postal Code</label>
                      <Form.Item name='postalCode' rules={[{ required: true, message: 'Postal Code is required' }]}>
                        <Input />
                      </Form.Item>
                    </div>
                    <div>
                      <label>Province</label>
                      <Form.Item name='province' rules={[{ required: true, message: 'Province is required' }]}>
                        <Input />
                      </Form.Item>
                    </div>
                    <div>
                      <label>Country</label>
                      <Form.Item name='country' rules={[{ required: true, message: 'Country is required' }]}>
                        <Input />
                      </Form.Item>
                    </div>
                    <div class="text-left">
                      <button type="submit" className="btn btn-orange-search">Add Project</button>
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
