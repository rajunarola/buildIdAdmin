import React, { Component } from 'react'
import Footer from '../_layout/Footer/Footer'
import Header from '../_layout/Header/Header'
import SideNav from '../_layout/SideNav/SideNav'

export default class Dashboard extends Component {
    render() {
        return (
            <div>
                <div className="d-flex">
                    <SideNav />
                    <div id="content-wrapper" className="d-flex flex-column w-100 content-relative">
                        <div className="content">
                            <Header />
                        </div>
                    </div>
                </div>
                {/* <Footer /> */}
            </div>
        )
    }
}
