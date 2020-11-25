import { notification } from "antd";
import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import Loader from "../Loader/Loader";
import { userLogin } from "../Services/CommonAPI";

export default class Login extends Component {

  state = {
    email: "",
    password: "",
    loading: false
  };

  changeHandler = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  userLogin = (e) => {
    this.setState({ loading: true });
    e.preventDefault();
    const data = {
      user: this.state.email,
      password: this.state.password,
    };
    userLogin(data).then((response) => {
      if (response.data.status === true) {
        this.setState({ loading: false });
        localStorage.setItem("userID", response.data.data);
        this.props.history.push("/dashboard");
      }
    }).catch((err) => {
      this.setState({ loading: false });
      notification.open({
        message: 'Error',
        description: 'Invalid username or password!'
      });
    });
  };

  render() {
    return (
      <>
        {this.state.loading ? <Loader /> :
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
                              <h1 className="h4 color_text_c mb-4"> Welcome Back! </h1>
                            </div>
                            <form className="user" onSubmit={(e) => this.userLogin(e)}>
                              <div className="form-group">
                                <input
                                  type="email"
                                  name="email"
                                  className="form-control form-control-user"
                                  id="exampleInputEmail"
                                  aria-describedby="emailHelp"
                                  placeholder="Enter Email Address..."
                                  onChange={(event) => this.changeHandler(event)} />
                              </div>
                              <div className="form-group">
                                <input type="password" name="password"
                                  className="form-control form-control-user"
                                  id="exampleInputPassword"
                                  placeholder="Password"
                                  onChange={(event) => this.changeHandler(event)} />
                              </div>
                              <div className="d-md-flex justify-content-between">
                                <div className="form-group">
                                  <div className="custom-control custom-checkbox">
                                    <input type="checkbox" className="custom-control-input" id="customCheck" />
                                    <label className="custom-control-label" for="customCheck"> Remember Me  </label>
                                  </div>
                                </div>
                                <div className="text-center">
                                  <Link className="txt-orange" to="/forgot-password">Forgot Password?</Link>
                                </div>
                              </div>
                              <button type="submit" className="btn btn-login-mx btn-user btn-block"> Login</button>
                            </form>
                            <p className="or">
                              <span>Or Login With Email</span>
                            </p>
                            <div className="btns-bx d-flex justify-content-between align-items-center flex-wrap">
                              <button className="btn btn-icon btn-fb">
                                <i className="icon fab fa-facebook-f"></i>facebook
                              </button>
                              <button className="btn btn-icon btn-twitter">
                                <i className="icon fab fa-twitter"></i>twitter
                              </button>
                              <button className="btn btn-icon btn-google">
                                <i className="icon fab fa-google-plus-g"></i>google
                              </button>
                              <button className="btn btn-icon btn-linkedin">
                                <i className="icon fab fa-linkedin-in"></i>linkedin
                              </button>
                            </div>
                            <div className="text-center mt-3">
                              <NavLink to="/register" className="color_text_c">
                                <b>Create an Account!</b>
                              </NavLink>
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
        }
      </>
    );
  }
}
