import React, { Component } from 'react'

export default class ForgotPassword extends Component {
    render() {
        return (
            <div className="bg-img-lg">
                <div className="container">

                    <div className="row justify-content-center">

                        <div className="col-lg-6 col-md-9">

                            <div className="card o-hidden border-0 shadow-lg my-5">
                                <div className="card-body p-0">
                                    <div>
                                        <div>
                                            <div className="p-5">
                                                <div className="text-center">
                                                    <h1 className="h4 text-gray-900 mb-2">Forgot Your Password?</h1>
                                                    <p className="mb-4">We get it, stuff happens. Just enter your email address below and we'll send you a link to reset your password!</p>
                                                </div>
                                                <form className="user">
                                                    <div className="form-group">
                                                        <input type="email" className="form-control form-control-user" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Enter Email Address..." />
                                                    </div>
                                                    <a href="login.html" className="btn btn-login-mx btn-user btn-block">
                                                        Reset Password
                </a>
                                                </form>
                                                <div className="text-center">
                                                    <a className="small txt-orange" href="register.html">Create an Account!</a>
                                                </div>
                                                <div className="text-center">
                                                    <a className="small txt-orange" href="login.html">Already have an account? Login!</a>
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
