import FormItem from "antd/lib/form/FormItem";
import Spin from "antd/lib/spin";
import React, { useState } from "react";
import { useLocation } from "react-router";
import "./Login.scss";
import { useLogin } from "./LoginHook";
// import ChangePassword from "./ChangePassword";
// import ForgotPassword from "./ForgotPassword";
// import GetOtp from "./GetOtp";

const qs = require("qs");

interface LoginFields {
  username: string;
  password: string;
  deviceName: string;
}

function Login() {
  const location = useLocation();
  const [appUser, setAppUser] = useState<LoginFields>({
    username: "",
    password: "",
    deviceName: "",
  });
  const [errorMessageUsername, setErrorMessageUsername] = useState<string>(
    null
  );
  const [errorMessagePass, setErrorMessagePass] = useState<string>(null);
  const [errorMessageOtp, setErrorMessageOtp] = useState<string>(null);

  const redirect = qs.parse(location.search, { ignoreQueryPrefix: true })
    .redirect;

  const {
    loginVisible,
    // forgotPasswordVisible,
    // getOtpVisible,
    // changePassVisible,
    loading,
    // checkPass,
    // confirmPass,
    showForgotPassword,
    // handleChangeEmail,
    // handleChangeOtp,
    // handleSendOtp,
    // handleSendMail,
    // handleChangeNewPass,
    // handleChangeConfirmPassword,
    // handleChangePass,
    // showLogin,
    handleLogin,
    handleEnter,
    // otp,
  } = useLogin(
    appUser,
    setErrorMessageUsername,
    setErrorMessagePass,
    setErrorMessageOtp,
    redirect || process.env.PUBLIC_URL
  );

  return (
    <>
      <div className="login-page">
        {/* <BackGround /> */}
        <div className="login-box">
          <div className="flex-container flex-container-row mt-5">
            <div className="flex-item mr-3 mt-5">
              <div className="login-frame mt-4">
                <Spin spinning={loading}>
                  {loginVisible === true && (
                    <div className="login-content">
                      {/* errors */}

                      <div className="user-name">
                        <FormItem>
                          <label htmlFor="username">
                            Tên đăng nhập{" "}
                            <span className="text-danger"> *</span>
                          </label>

                          <div className="right-inner-addon input-container">
                            <input
                              type="text"
                              value={appUser.username}
                              className="ant-input ant-input-sm mb-3 input-login"
                              placeholder="Nhập tên đăng nhập"
                              onChange={(e) => {
                                setAppUser({
                                  ...appUser,
                                  username: e.target.value,
                                });
                              }}
                              onKeyDown={handleEnter}
                              autoComplete={"off"}
                            />
                          </div>
                          {errorMessageUsername !== null && (
                            <div className="login-error mt-1 p-1">
                              {errorMessageUsername}
                            </div>
                          )}
                        </FormItem>
                      </div>
                      <div className="password mt-4">
                        <FormItem>
                          <label htmlFor="username">
                            Mật khẩu <span className="text-danger"> *</span>
                          </label>
                          <div className="right-inner-addon input-container">
                            <input
                              type="password"
                              value={appUser.password}
                              className="ant-input ant-input-sm  mb-3 input-login"
                              placeholder="Nhập mật khẩu"
                              onChange={(e) => {
                                setAppUser({
                                  ...appUser,
                                  password: e.target.value,
                                });
                              }}
                              onKeyDown={handleEnter}
                            />
                          </div>
                          {errorMessagePass !== null && (
                            <div className="login-error mt-1 p-1">
                              {errorMessagePass}
                            </div>
                          )}
                        </FormItem>
                      </div>
                      <div className="justify-content-end">
                        <div className="forgot-password pointer">
                          <span
                            className="mt-2 "
                            onClick={() => showForgotPassword()}
                          >
                            Quên mật khẩu
                          </span>
                        </div>
                      </div>
                      <div className="action-login">
                        <div className="login d-flex float-right ml-5">
                          <button
                            className="btn btn-primary btn-sm btn-login"
                            onClick={handleLogin}
                            disabled={false}
                          >
                            Đăng nhập
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                  {/* {forgotPasswordVisible === true && (
                    <ForgotPassword
                      onChangeEmail={handleChangeEmail}
                      onSendMail={handleSendMail}
                      showLogin={showLogin}
                    />
                  )} */}

                  {/* {getOtpVisible === true && (
                    <GetOtp
                      onChangeOtp={handleChangeOtp}
                      showLogin={showLogin}
                      onSendOtp={handleSendOtp}
                      otp={otp}
                      errorMessageOtp={errorMessageOtp}
                    />
                  )} */}
                  {/* {changePassVisible === true && (
                    <ChangePassword
                      onChangeNewPass={handleChangeNewPass}
                      onChangeConfirmPassword={handleChangeConfirmPassword}
                      onChangePass={handleChangePass}
                      checkPass={checkPass}
                      confirmPass={confirmPass}
                      showLogin={showLogin}
                    />
                  )} */}
                </Spin>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
