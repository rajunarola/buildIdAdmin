import React, { Component } from 'react'
import Footer from '../_layout/Footer/Footer'
import Header from '../_layout/Header/Header'
import SideNav from '../_layout/SideNav/SideNav'

export default class Dashboard extends Component {
    render() {
        return (
            <div>
                {/* <Header /> */}
                <SideNav />
                {/* <Footer /> */}
            </div>
        )
    }
}
