import React, { Component } from 'react';
import { Link } from 'react-router-dom';
export default class SideNav extends Component {

  state = {
    toggle: false
  };

  toggledSideNav = () => {
    this.setState({ toggle: !this.state.toggle })
  }

  render() {
    return (
      <ul id="accordionSidebar" className={!this.state.toggle ?
        "navbar-nav navbar-bg-orange sidebar sidebar-dark accordion" :
        "navbar-nav navbar-bg-orange sidebar sidebar-dark accordion toggled h-100"}>
        <Link className="sidebar-brand d-flex align-items-center justify-content-center" to="">
          <div className="sidebar-brand-icon rotate-n-15">
            <i className="fas fa-laugh-wink"></i>
          </div>
          <div className="sidebar-brand-text mx-3">Build ID <sup>Admin</sup></div>
        </Link>
        <hr className="sidebar-divider my-0" />
        <li className="nav-item">
          <Link className="nav-link" to="/dashboard" activeClassName="active">
            <i className="fas fa-fw fa-tachometer-alt"></i>
            <span>Dashboard</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/building-type-list" activeClassName="active">
            <i className="fas fa-fw fa-building"></i>
            <span>Building Types</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/company-list" activeClassName="active">
            <i className="fas fa-fw fa-cog"></i>
            <span>Companies</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/item-list" activeClassName="active">
            <i className="fas fa-fw fa-list"></i>
            <span>Items</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/manufacturers-list" activeClassName="active">
            <i className="fas fa-fw fa-wrench"></i>
            <span>Manufacturers</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/project-list" activeClassName="active">
            <i className="fas fa-fw fa-chart-area"></i>
            <span>Projects</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/ticket-list" activeClassName="active">
            <i className="fas fa-fw fa-ticket-alt"></i>
            <span>Ticket Types</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/trade-list" activeClassName="active">
            <i className="fas fa-fw fa-suitcase"></i>
            <span>Trades</span>
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/roles-list" activeClassName="active">
            <i className="fas fa-fw fa-globe"></i>
            <span>Roles</span>
          </Link>
        </li>
        {/* <hr className="sidebar-divider d-none d-md-block" />
        <div className="text-center d-none d-md-inline" onClick={() => this.toggledSideNav()}>
          <button className="rounded-circle border-0 arrow-btn"></button>
        </div> */}
      </ul>
    )
  }
}
