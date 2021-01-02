import React from 'react';
import {
  getOnlyOneCompanyAddress,
  getCompanyById,
  getRecordStatusForCompanies,
  postCompany,
  deleteCompanyAddress,
  postCompanyAddress
} from '../Services/CompanyAPI';
import { Form, Input, notification, Button, Checkbox, Select, Table } from 'antd';
import Loader from '../Loader/Loader';
import { Link } from 'react-router-dom';
import moment from 'moment';
export default class Products extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
    this.state.filterText = "";
    this.state.params = parseInt(this.props.match.params.id);
    this.state.columns = this.state.fullAddress
  }

  state = {
    Id: '',
    Name: '',
    RecordStatusId: '',
    WebSite: '',
    CreatedBy: '',
    DateCreated: '',
    ModifiedBy: '',
    DateModified: '',
    Active: false,
    changeRecordStatusId: [],
    companyAddress: [],
    companyData: [],
    fullAddress: []
  }

  async componentDidMount() {
    await getOnlyOneCompanyAddress(this.props.match.params.id).then(Res => {
      this.setState({ fullAddress: Res.data.data })
      if (Res.status === 200) {
        const changedValue =
          Res.data.data.map(({
            address, type, city, country, postalCode, province, contactPerson, companyId, id, createdBy, modifiedBy, email, phone }) => ({
              Address: address,
              Type: type,
              Id: JSON.stringify(id),
              CompanyId: companyId,
              City: city,
              Country: country,
              PostalCode: postalCode,
              Province: province,
              ContactPerson: contactPerson,
              CreatedBy: createdBy,
              ModifiedBy: modifiedBy,
              Email: email,
              Phone: phone
            }));
        this.setState({ companyAddress: changedValue });
      }
    }).catch(err => {
      notification.error({
        message: 'Error',
        description: 'There was an error while fetching company address!'
      });
    })
  }

  handleUserInput(filterText) {
    this.setState({ filterText: filterText });
  };

  handleRowDel(product) {
    var index = this.state.companyAddress.indexOf(product);
    this.state.companyAddress.splice(index, 1);
    this.setState(this.state.companyAddress);
  };

  handleAddEvent(evt) {
    var id = (+ new Date() + Math.floor(Math.random() * 999999)).toString(36);
    var product = {
      Id: id,
      Address: "",
      City: "",
      Country: "",
      PostalCode: "",
      Province: "",
      ContactPerson: "",
      Email: "",
      Phone: "",
      Type: "",
      CreatedBy: parseInt(localStorage.getItem('userID')),
      ModifiedBy: parseInt(localStorage.getItem('userID')),
      CompanyId: parseInt(this.props.match.params.id)
    }
    this.state.companyAddress.push(product);
    this.setState(this.state.companyAddress);
  }

  handleProductTable(evt) {
    var item = {
      id: evt.target.id,
      name: evt.target.name,
      value: evt.target.value
    }; var products = this.state.companyAddress.slice();

    let newProducts = products.map(product => {
      for (var key in product) {
        if (key === item.name && product.Id === item.id) {
          console.log('companyAddresstrue');
          product[key] = item.value;
        }
      }
      return product;
    })
    this.setState({ companyAddress: newProducts });

  };

  render() {

    return (
      <div>
        <ProductTable onProductTableUpdate={this.handleProductTable.bind(this)} onRowAdd={this.handleAddEvent.bind(this)} products={this.state.companyAddress} filterText={this.state.filterText} params={this.state.params} fullCompany={this.state.fullAddress} />
      </div>
    );
  }
}
class ProductTable extends React.Component {

  state = {
    Id: '',
    Name: '',
    RecordStatusId: '',
    WebSite: '',
    CreatedBy: '',
    DateCreated: '',
    ModifiedBy: '',
    DateModified: '',
    Active: false,
    changeRecordStatusId: [],
    companyAddress: [],
    companyData: [],
    loading: false,
    gridEdit: false
  }

  componentDidMount() {
    this.setState({ loading: true })
    getCompanyById(this.props.params).then(res => {
      if (res.status === 200) {
        this.setState({
          companyData: res.data.data,
          Id: res.data.data.id,
          Name: res.data.data.name,
          RecordStatusId: res.data.data.recordStatusId,
          WebSite: res.data.data.webSite,
          Phone: res.data.data.phone,
          CreatedBy: res.data.data.createdBy,
          DateCreated: res.data.data.dateCreated,
          Active: res.data.data.active,
          ModifiedBy: res.data.data.modifiedBy,
          DateModified: res.data.data.dateModified,
          loading: false
        });
      }
    }).catch(err => {
      this.setState({ loadig: false })
      notification.error({
        message: 'Error',
        description: 'There was an error while fetching company data!'
      });
    });

    getRecordStatusForCompanies().then(res => {
      if (res.status === 200) {
        this.setState({ changeRecordStatusId: res.data.data })
      }
    }).catch(err => {
      notification.error({
        message: 'Error',
        description: 'There was an error while fetching record status for company data!'
      });
    });
  }

  updateCompanyAddress = () => {
    postCompanyAddress({ Content: JSON.stringify(this.props.products) }).then(res => {
      if (res.data.message === "OK") {
        notification.success({
          message: 'Success',
          description: 'Company Address successfully updated!'
        })
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else if (res.data.message !== "OK") {
        notification.error({
          message: 'Error',
          description: 'A record with the same data already exists!'
        })
      }
    }).catch(Err => {
      notification.error({
        message: 'Error',
        description: 'There was an error while updating a company address!'
      })
    })
  }

  changeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  columns = [
    {
      title: "Address",
      dataIndex: "address",
      sorter: (a, b) => a.Address.localeCompare(b.Address),
    },
    {
      title: "City",
      dataIndex: "city"
    },
    {
      title: "Country",
      dataIndex: "country"
    },
    {
      title: "Postal Code",
      dataIndex: "postalCode"
    },
    {
      title: "Province",
      dataIndex: "province"
    },
    {
      title: "Contact Person",
      dataIndex: "contactPerson"
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => a.Email.localeCompare(b.Email)
    },
    {
      title: "Phone Number",
      dataIndex: "phone"
    },
    {
      title: "Type",
      dataIndex: "type"
    }
  ]

  gridEdit() {
    this.setState({ gridEdit: !this.state.gridEdit })
  }

  render() {

    var onProductTableUpdate = this.props.onProductTableUpdate;
    var filterText = this.props.filterText;
    let product = this.props.products && this.props.products.map(function (product) {
      if (product.Address.indexOf(filterText) === -1) {
        return;
      }
      return (<ProductRow onProductTableUpdate={onProductTableUpdate} product={product} key={product.Id} />)
    });

    const updateCompany = () => {
      const data = {
        Content: [
          {
            Id: this.state.Id,
            Name: this.state.Name,
            RecordStatusId: this.state.RecordStatusId,
            CreatedBy: parseInt(localStorage.getItem('userID')),
            WebSite: this.state.WebSite,
            Phone: this.state.Phone,
            DateCreated: moment(new Date()).format('YYYY-MM-DD'),
            ModifiedBy: parseInt(localStorage.getItem('userID')),
            DateModified: moment(new Date()).format('YYYY-MM-DD'),
            Active: this.state.Active
          }
        ]
      }
      postCompany({ Content: JSON.stringify(data.Content) }).then(res => {
        if (res.data.status === true) {
          notification.success({
            message: 'Success',
            description: 'Company data successfully updated!'
          });
        }
      }).catch(err => {
        notification.error({
          message: 'Error',
          description: 'There was an error while updating company!'
        });
      });
    }

    return (

      <>
        {this.state.loading ? <Loader /> :
          <div className="container-fluid">
            <div class="main-title-lg mb-5 d-flex justify-content-between">
              <h1 class="h3 text-gray-800">Edit Company</h1>
              <Link to="/company-list" class="btn btn-orange-search">View Company List</Link>
            </div>
            <div className="trade-form-wrap">
              <div className="row mt-5">
                <div className="col-lg-6">
                  <div className="bg-white p-5 form-border">
                    <Form onFinish={updateCompany}>
                      <div className="form-group">
                        <label>Company Name</label>
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
                      <div className="form-group">
                        <label>Website</label>
                        <Form.Item rules={[{ type: "email", message: "The input is not valid E-mail!" }]}>
                          <Input name="WebSite" value={this.state.WebSite} onChange={(event) => this.changeHandler(event)} />
                        </Form.Item>
                      </div>
                      <div className="form-group">
                        <label>Phone Number</label>
                        <Form.Item>
                          <Input name="Phone" value={this.state.Phone} onChange={(event) => this.changeHandler(event)} />
                        </Form.Item>
                      </div>
                      <div className="form-check mb-3 check_custom">
                        <Form.Item className="m-0">
                          <Checkbox name="Active" checked={this.state.Active ? true : false} onChange={(e) => this.getCheckBoxValue(e.target.checked)} />
                        </Form.Item>
                        <label className="form-check-label ml-2">Active</label>
                      </div>
                      <Form.Item>
                        <Button type="primary" htmlType="submit" className="btn btn-orange-search">Update Company</Button>
                      </Form.Item>
                    </Form>
                  </div>
                </div>
                <div className="mt-3 col-md-12 d-flex mb-3">
                  <button type="primay" className="btn btn-orange-search" disabled={!this.state.gridEdit} onClick={this.props.onRowAdd}>Add</button>
                  <button type="primay" className="btn btn-orange-search ml-3" onClick={() => this.gridEdit()}>Edit</button>
                </div>

                {this.state.gridEdit ?
                  <div className="col-md-12 custom_table">
                    <table className="table table-bordered table-responsive">
                      <thead>
                        <tr>
                          <th>Address</th>
                          <th>City</th>
                          <th>Country</th>
                          <th>Postal Code</th>
                          <th>Province</th>
                          <th>Contact Person</th>
                          <th>Email</th>
                          <th>Phone</th>
                          <th>Type</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {product}
                      </tbody>
                    </table>
                  </div> :
                  <div className="col-md-12 custom_table">
                    <Table dataSource={this.props.fullCompany} columns={this.columns} />
                  </div>
                }
                <div className="mt-3 col-md-12 d-flex">
                  <Button className="btn btn-orange-search" onClick={() => this.updateCompanyAddress()}>Save</Button>
                </div>
              </div>
            </div>
          </div>
        }
      </>
    );
  }
}
class ProductRow extends React.Component {

  handleDelete = (key) => {
    deleteCompanyAddress(key).then(res => {
      if (res.status === 200) {
        notification.success({
          message: 'Success',
          description: 'The company address has been successfully deleted!'
        })
        getOnlyOneCompanyAddress(this.props.product.CompanyId).then(Res => {
          if (Res.status === 200) {
            const changedValue =
              Res.data.data.map(({
                address, type, city, country, postalCode, province, contactPerson, companyId, id, createdBy, modifiedBy, email, phone }) => ({
                  Address: address,
                  Type: type,
                  Id: id,
                  CompanyId: this.props.product.CompanyId,
                  City: city,
                  Country: country,
                  PostalCode: postalCode,
                  Province: province,
                  ContactPerson: contactPerson,
                  RecordStatusId: 1,
                  CreatedBy: createdBy,
                  ModifiedBy: modifiedBy,
                  Email: email,
                  Phone: phone
                }));
            this.setState({ companyAddress: changedValue }, () => {
              window.location.reload()
            });
          }
        }).catch(err => { })
      }
    }).catch(err => {
      notification.error({
        message: 'Error',
        description: 'There was an error while deleting a company address!'
      })
    })
  };

  render() {

    return (
      <tr className="eachRow">
        <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
          "type": "Address",
          value: this.props.product.Address,
          id: this.props.product.Id
        }} />
        <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
          type: "City",
          value: this.props.product.City,
          id: this.props.product.Id
        }} />
        <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
          type: "Country",
          value: this.props.product.Country,
          id: this.props.product.Id
        }} />
        <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
          type: "PostalCode",
          value: this.props.product.PostalCode,
          id: this.props.product.Id
        }} />
        <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
          type: "Province",
          value: this.props.product.Province,
          id: this.props.product.Id
        }} />
        <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
          type: "ContactPerson",
          value: this.props.product.ContactPerson,
          id: this.props.product.Id
        }} />
        <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
          type: "Email",
          value: this.props.product.Email,
          id: this.props.product.Id
        }} />
        <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
          type: "Phone",
          value: this.props.product.Phone,
          id: this.props.product.Id
        }} />
        <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
          type: "Type",
          value: this.props.product.Type,
          id: this.props.product.Id
        }} />
        <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
          type: "dropdown",
          value: this.props.product.Type,
          id: this.props.product.Id
        }} />
        <div className="d-none">
          <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
            type: "CreatedBy",
            value: this.props.product.CreatedBy,
            id: this.props.product.Id
          }} />
          <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
            type: "ModifiedBy",
            value: this.props.product.ModifiedBy,
            id: this.props.product.Id
          }} />
          <EditableCell onProductTableUpdate={this.props.onProductTableUpdate} cellData={{
            type: "CompanyId",
            value: this.props.product.CompanyId,
            id: this.props.product.Id
          }} />
        </div>
        <td className="del-cell">
          <Button className="btn btn-danger" onClick={(e) => this.handleDelete(this.props.product.Id)} >Delete</Button>
        </td>
      </tr>
    );
  }
}
class EditableCell extends React.Component {

  render() {
    return (
      <td>
        {
          this.props.cellData.type === "dropdown" ?
            <select>
              <option>1</option>
              <option>2</option>
              <option>3</option>
            </select>
            :
            <input type='text' name={this.props.cellData.type} id={this.props.cellData.id} value={this.props.cellData.value} onChange={this.props.onProductTableUpdate} />
        }
      </td>
    );
  }

}