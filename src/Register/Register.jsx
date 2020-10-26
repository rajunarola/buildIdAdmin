import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class Register extends Component {
    render() {
        return (
            <div className="bg-img-lg vh-100">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className=" col-lg-7 col-md-9">
                            <div className="card o-hidden border-0 shadow-lg my-5">
                                <div className="card-body p-0">
                                    <div>
                                        <div>
                                            <div className="p-5">
                                                <div className="text-center">
                                                    <h1 className="h4 text-gray-900 mb-4">Welcome Back!</h1>
                                                </div>
                                                <form className="user">
                                                    <div className="form-group row">
                                                        <div className="col-sm-6 mb-3 mb-sm-0">
                                                            <input type="text" className="form-control form-control-user" id="exampleFirstName" placeholder="First Name" />
                                                        </div>
                                                        <div className="col-sm-6">
                                                            <input type="text" className="form-control form-control-user" id="exampleLastName" placeholder="Last Name" />
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <input type="email" className="form-control form-control-user" id="exampleInputEmail" placeholder="Email Address" />
                                                    </div>
                                                    <div className="form-group row">
                                                        <div className="col-sm-6 mb-3 mb-sm-0">
                                                            <input type="password" className="form-control form-control-user" id="exampleInputPassword" placeholder="Password" />
                                                        </div>
                                                        <div className="col-sm-6">
                                                            <input type="password" className="form-control form-control-user" id="exampleRepeatPassword" placeholder="Repeat Password" />
                                                        </div>
                                                    </div>

                                                    <div className="d-md-flex justify-content-between">
                                                        <div className="form-group">
                                                            <div className="custom-control custom-checkbox small">
                                                                <input type="checkbox" className="custom-control-input" id="customCheck" />
                                                                <label className="custom-control-label" for="customCheck">I agree to all Tearms & Conditions</label>
                                                            </div>
                                                        </div>
                                                        <div className="text-center">
                                                            <Link className="small txt-orange" to="forgot-password">Forgot Password?</Link>
                                                        </div>
                                                    </div>
                                                    <a href="index.html" className="btn btn-login-mx btn-user btn-block">
                                                        Register
                                                    </a>
                                                </form>
                                                <p className="or"><span>Or Login With Email</span></p>
                                                <div className="btns-bx d-flex justify-content-between align-items-center flex-wrap">
                                                    <button className="btn btn-icon btn-fb">
                                                        <i className="icon fab fa-facebook-f"></i> facebook
                                                     </button>
                                                    <button className="btn btn-icon btn-twitter">
                                                        <i className="icon fab fa-twitter"></i> twitter
                                                    </button>
                                                    <button className="btn btn-icon btn-google">
                                                        <i className="icon fab fa-google-plus-g"></i> google
                                                    </button>
                                                    <button className="btn btn-icon btn-linkedin">
                                                        <i className="icon fab fa-linkedin-in"></i> linkedin
                                                    </button>
                                                </div>
                                                <div className="text-center mt-3">
                                                    <Link className="small" href="register.html"><b>Already have an account? Login!</b></Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
