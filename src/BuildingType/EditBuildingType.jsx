import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input, Select, notification, } from 'antd';
import { getBuildTypeById, recordStatusForManufacturers, postBuildingType } from '../Services/BuildingType';
export default class EditBuildingType extends Component {

  state = {
    Id: '',
    Name: '',
    RecordStatusId: '',
    CreatedBy: '',
    ModifiedBy: '',
    changeRecordStatusId: []
  }

  componentDidMount() {
    const tradeId = this.props.match.params.id;
    getBuildTypeById(tradeId).then(res => {
      this.setState({
        Id: res.data.data.id,
        Name: res.data.data.name,
        RecordStatusId: res.data.data.recordStatusId,
        CreatedBy: res.data.data.createdBy,
        ModifiedBy: res.data.data.modifiedBy,
      });
    }).catch(err => {
      notification.error({
        message: 'Error',
        description: 'There was an error while fetching manufacturer data!'
      });
    });

    recordStatusForManufacturers().then(res => {
      this.setState({ changeRecordStatusId: res.data.data })
    }).catch(err => {
      notification.error({
        message: 'Error',
        description: 'There was an error while fetching manufacturer data!'
      });
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

    const updateBuildType = () => {
      const data = {
        Content: [
          {
            Id: this.state.Id,
            Name: this.state.Name,
            RecordStatusId: this.state.RecordStatusId,
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
        }
      }).catch(err => {
        notification.error({
          message: 'Error',
          description: 'There was an error while updating building type!'
        });
      });
    }

    return (
      <div>
        <div className="container-fluid">
          <div className="main-title-lg mb-5 d-flex justify-content-between">
            <h1 className="h3 text-gray-800">Edit Building Type</h1>
            <Link to="/building-type-list" className="btn btn-orange-search">View Building List</Link>
          </div>
          <div className="trade-form-wrap">
            <div className="row mt-5">
              <div className="col-lg-6">
                <div className="bg-white p-5 form-border">
                  <Form onFinish={updateBuildType}>
                    <div className="form-group">
                      <label>Building Type Name</label>
                      <Form.Item>
                        <Input name="Name" value={this.state.Name} onChange={(e) => this.changeHandler(e)} />
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
      </div>
    )
  }
}
