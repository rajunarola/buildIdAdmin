import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { postTicket } from '../Services/TicketAPI';
import { notification, Form, Input } from 'antd';
export default class AddTickets extends Component {

  state = {
    Id: 0,
    Name: '',
    RecordStatusId: 1,
    CreatedBy: 1,
    ModifiedBy: 1
  }

  changeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleChange = (event) => {
    this.setState({ RecordStatusId: event })
  }

  render() {

    const formRef = React.createRef();

    const onFinishFailed = errorInfo => {
      console.log('Failed:', errorInfo);
    }

    const sendTicketData = values => {
      const data = {
        Content: [
          {
            Id: this.state.Id,
            Name: values.ticketName,
            RecordStatusId: this.state.RecordStatusId,
            CreatedBy: 1,
            ModifiedBy: 1
          }
        ]
      }
      postTicket({ Content: JSON.stringify(data.Content) }).then(res => {
        if (res.data.status === true) {
          formRef.current.resetFields();
          notification.success({
            message: 'Success',
            description: 'Ticket has been successfully added!'
          });
        }
      }).catch(err => {
        notification.error({
          message: 'Error',
          description: 'There was an error while adding Trade Data!'
        });
      })
    }

    return (
      <div>
        <div className="container-fluid">
          <div className="d-sm-flex align-items-center justify-content-between mb-4 main-title-lg">
            <h1 className="h3 mb-0 text-gray-800">Add Ticket</h1>
            <Link to="/ticket-list" className="btn btn-orange-search">View Ticket List</Link>
          </div>

          <div className="trade-form-wrap">
            <div className="row mt-5">
              <div className="col-lg-6">
                <div className="bg-white p-5 form-border">
                  <Form onFinish={sendTicketData} onFinishFailed={onFinishFailed} ref={formRef}>
                    <div className="form-group">
                      <label>Ticket Name</label>
                      <Form.Item name="ticketName" rules={[{ required: true, message: 'Please enter Ticket Name!' }]}>
                        <Input onChange={(event) => this.changeHandler(event)} />
                      </Form.Item>
                    </div>
                    <div className="mt-4">
                      <button type="submit" className="btn btn-orange-search">Add Ticket</button>
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
