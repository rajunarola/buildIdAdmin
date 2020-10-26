import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class SideNav extends Component {

    state = {
        toggle: false
    };

    toggledSideNav = () => {
        this.setState({ toggle: true })
        if (this.state.toggle) {
            this.setState({ toggle: false })
        } else {
            this.setState({ toggle: true })
        }
    }

    render() {
        return (
            <div>
                <ul
                    className={!this.state.toggle ? "navbar-nav navbar-bg-orange sidebar sidebar-dark accordion h-100" : "navbar-nav navbar-bg-orange sidebar sidebar-dark accordion toggled h-100"} id="accordionSidebar">

                    <Link className="sidebar-brand d-flex align-items-center justify-content-center" to="">
                        <div className="sidebar-brand-icon rotate-n-15">
                            <i className="fas fa-laugh-wink"></i>
                        </div>
                        <div className="sidebar-brand-text mx-3">SB Admin <sup>2</sup></div>
                    </Link>

                    <hr className="sidebar-divider my-0" />

                    <li className="nav-item active">
                        <Link className="nav-link" to="/dashboard">
                            <i className="fas fa-fw fa-tachometer-alt"></i>
                            <span>Dashboard</span>
                        </Link>
                    </li>

                    <li className="nav-item">
                        <Link className="nav-link" to="/add-building-type">
                            <i className="fas fa-fw fa-building"></i>
                            <span>Building Types</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/add-company">
                            <i className="fas fa-fw fa-cog"></i>
                            <span>Companies</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/add-item">
                            <i className="fas fa-fw fa-list"></i>
                            <span>Items</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/add-manufacturer">
                            <i className="fas fa-fw fa-wrench"></i>
                            <span>Manufacturers</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/add-project">
                            <i className="fas fa-fw fa-chart-area"></i>
                            <span>Projects</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/add-ticket">
                            <i className="fas fa-fw fa-ticket-alt"></i>
                            <span>TicketTypes</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/add-trade">
                            <i className="fas fa-fw fa-suitcase"></i>
                            <span>Trades</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/add-roles">
                            <i className="fas fa-fw fa-globe"></i>
                            <span>Roles</span>
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link className="nav-link" to="/add-company-address">
                            <i className="fas fa-fw fa-building"></i>
                            <span>Company Address</span>
                        </Link>
                    </li>
                    <hr className="sidebar-divider d-none d-md-block" />
                    <div className="text-center d-none d-md-inline" onClick={() => this.toggledSideNav()}>
                        <button className="rounded-circle border-0 arrow-btn"></button>
                    </div>

                </ul>

            </div>
        )
    }
}
