import React from 'react'
import './assets/css/sb-admin-2.css';
import './assets/css/sb-admin-2.min.css';
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Login from './Login/Login';
import Register from './Register/Register';
import Dashboard from './Dashboard/Dashboard';
import Company from './Company/Company';
import Trades from './Trades/Trades';
import ForgotPassword from './_layout/ForgotPassword/ForgotPassword';
import CompanyList from './Company/CompanyList';
import TradesList from './Trades/TradesList';
import ItemList from './Item/ItemList';
import Item from './Item/Item';
import ManufacturesList from './Manufactures/ManufacturesList';
import AddManufactures from './Manufactures/AddManufactures';
import AddBuildingType from './BuildingType/AddBuildingType';
import BuildingTypeList from './BuildingType/BuildingTypeList';
import AddRoles from './Roles/AddRoles';
import RolesList from './Roles/RolesList';
import AddTickets from './Tickets/AddTickets';
import TicketsList from './Tickets/TicketsList';
import ProjectsList from './Projects/ProjectsList';
import AddProjects from './Projects/AddProjects';
import EditManufacturers from './Manufactures/EditManufacturers';
import SaveCompanyAddress from './Company/SaveCompanyAddress';
import CompanyAddressList from './Company/CompanyAddressList';
class App extends React.Component {

    render() {
        return (
            <>
                <BrowserRouter>
                    <Switch>
                        <Route path="/(login)?" exact component={Login} />
                        <Route path="/dashboard" exact component={Dashboard} />
                        <Route path="/register" exact component={Register} />
                        <Route path="/add-company" exact component={Company} />
                        <Route path="/company-list" exact component={CompanyList} />
                        <Route path="/add-trade" exact component={Trades} />
                        <Route path="/trade-list" exact component={TradesList} />
                        <Route path="/add-item" exact component={Item} />
                        <Route path="/item-list" exact component={ItemList} />
                        <Route path="/manufacturers-list" exact component={ManufacturesList} />
                        <Route path="/add-manufacturer" exact component={AddManufactures} />
                        <Route path="/edit-manufacturer/:id" exact component={EditManufacturers} />
                        <Route path="/add-building-type" exact component={AddBuildingType} />
                        <Route path="/building-type-list" exact component={BuildingTypeList} />
                        <Route path="/add-roles" exact component={AddRoles} />
                        <Route path="/roles-list" exact component={RolesList} />
                        <Route path="/add-ticket" exact component={AddTickets} />
                        <Route path="/ticket-list" exact component={TicketsList} />
                        <Route path="/add-project" exact component={AddProjects} />
                        <Route path="/project-list" exact component={ProjectsList} />
                        <Route path="/add-company-address" exact component={SaveCompanyAddress} />
                        <Route path="/company-address-list" exact component={CompanyAddressList} />
                        <Route path="/forgot-password" exact component={ForgotPassword} />
                    </Switch>
                </BrowserRouter>
            </>
        )
    }
}

export default App;