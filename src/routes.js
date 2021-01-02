import React, { lazy } from "react";
import { Route, Switch } from "react-router-dom";
import Footer from "./_layout/Footer/Footer";
import Header from "./_layout/Header/Header";
import SideNav from "./_layout/SideNav/SideNav";
import Login from './Login/Login';
// const Login = lazy(() => import("./Login/Login"));
const Dashboard = lazy(() => import("./Dashboard/Dashboard"));
const Register = lazy(() => import("./Register/Register"));
const Company = lazy(() => import("./Company/Company"));
const EditCompany = lazy(() => import("./Company/EditCompany"));
const CompanyList = lazy(() => import("./Company/CompanyList"));
const Trades = lazy(() => import("./Trades/Trades"));
const EdittTrades = lazy(() => import("./Trades/EdittTrades"));
const TradesList = lazy(() => import("./Trades/TradesList"));
const Item = lazy(() => import("./Item/Item"));
const EditItem = lazy(() => import("./Item/EditItem"));
const ItemList = lazy(() => import("./Item/ItemList"));
const ManufacturesList = lazy(() => import("./Manufactures/ManufacturesList"));
const AddManufactures = lazy(() => import("./Manufactures/AddManufactures"));
const AddRoles = lazy(() => import("./Roles/AddRoles"));
const AddBuildingType = lazy(() => import("./BuildingType/AddBuildingType"));
const BuildingTypeList = lazy(() => import("./BuildingType/BuildingTypeList"));
const EditBuildingType = lazy(() => import("./BuildingType/EditBuildingType"));
const ProjectsList = lazy(() => import("./Projects/ProjectsList"));
const RolesList = lazy(() => import("./Roles/RolesList"));
const EditManufacturers = lazy(() => import("./Manufactures/EditManufacturers"));
const AddTickets = lazy(() => import("./Tickets/AddTickets"));
const TicketsList = lazy(() => import("./Tickets/TicketsList"));
const EditTickets = lazy(() => import("./Tickets/EditTickets"));
const AddProjects = lazy(() => import("./Projects/AddProjects"));
const EditRoles = lazy(() => import("./Roles/EditRoles"));
const ForgotPassword = lazy(() => import("./_layout/ForgotPassword/ForgotPassword"));

export const routesCode = [
    { path: "/dashboard", exact: true, component: Dashboard },
    { path: "/register", exact: true, component: Register },
    { path: "/add-company", exact: true, component: Company },
    { path: "/edit-company/:id", exact: true, component: EditCompany },
    { path: "/company-list", exact: true, component: CompanyList },
    { path: "/add-trade", exact: true, component: Trades },
    { path: "/edit-trade/:id", exact: true, component: EdittTrades },
    { path: "/trade-list", exact: true, component: TradesList },
    { path: "/add-item", exact: true, component: Item },
    { path: "/edit-item/:id", exact: true, component: EditItem },
    { path: "/item-list", exact: true, component: ItemList },
    { path: "/manufacturers-list", exact: true, component: ManufacturesList },
    { path: "/add-manufacturer", exact: true, component: AddManufactures },
    { path: "/edit-manufacturer/:id", exact: true, component: EditManufacturers },
    { path: "/add-building-type", exact: true, component: AddBuildingType },
    { path: "/building-type-list", exact: true, component: BuildingTypeList },
    { path: "/edit-building-type/:id", exact: true, component: EditBuildingType },
    { path: "/add-roles", exact: true, component: AddRoles },
    { path: "/roles-list", exact: true, component: RolesList },
    { path: "/edit-role/:id", exact: true, component: EditRoles },
    { path: "/add-ticket", exact: true, component: AddTickets },
    { path: "/ticket-list", exact: true, component: TicketsList },
    { path: "/edit-ticket-list/:id", exact: true, component: EditTickets },
    { path: "/add-project", exact: true, component: AddProjects },
    { path: "/project-list", exact: true, component: ProjectsList },
    { path: "/forgot-password", exact: true, component: ForgotPassword }
];

class Routes extends React.PureComponent {
    render() {
        return (
            <Switch>
                <Route path="(login)?" exact component={Login} />
                <section className="website_main_section">
                    <div className="part_one">
                        <SideNav />
                    </div>
                    <div className="part_two">
                        <Header />
                        <div className="main_section_add">
                            {routesCode.map((route, i) =>
                                <Route {...route} key={i} />
                            )}
                        </div>
                        <Footer />
                    </div>
                </section>
            </Switch>
        );
    }
}

export default Routes;
