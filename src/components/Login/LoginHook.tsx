import { AppUser } from "models/AppUser";
import { useCallback, useState } from "react";
import authenticationService from "services/authentication-service";
import * as Cookie from "js-cookie";
import { useHistory } from "react-router";
import { notification } from "antd";
import { translate } from "@react3l/react3l/helpers";

export function useLogin(
  appUser: AppUser,
  setErrorMessageUsername: React.Dispatch<React.SetStateAction<string>>,
  setErrorMessagePass: React.Dispatch<React.SetStateAction<string>>,
  setErrorMessageOtp: React.Dispatch<React.SetStateAction<string>>,
  from: any
): any {
  const history = useHistory();
  const [loginVisible, setLoginVisible] = useState(true);
  const [forgotPasswordVisible, setForgotPasswordVisible] = useState(false);
  const [getOtpVisible, setGetOtpVisible] = useState(false);
  const [changePassVisible, setChangePassVisible] = useState(false);
  const [email, setEmail] = useState<string>(null);
  const [otp, setOtp] = useState<string>(null);
  const [newPass, setNewPass] = useState<string>(null);
  const [confirmPass, setConfirmPass] = useState<string>(null);
  const [checkPass, setCheckPass] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const showForgotPassword = () => {
    setLoginVisible(false);
    setForgotPasswordVisible(true);
  };
  const showLogin = () => {
    setLoginVisible(true);
    setForgotPasswordVisible(false);
    setChangePassVisible(false);
    setGetOtpVisible(false);
  };

  const handleLogin = useCallback(() => {
    setLoading(true);
    authenticationService.login(appUser).subscribe(
      (response) => {
        Cookie.set("Token", response.token);
        history.push(from);
      },
      (error) => {
        const data = error.response.data;
        if (data.errors) {
          if (
            data.errors.username &&
            data.errors.username === "UsernameNotExisted"
          )
            setErrorMessageUsername("Tên đăng nhập không tồn tại");
          if (
            data.errors.password &&
            data.errors.password === "PasswordNotMatch"
          )
            setErrorMessagePass("Mật khẩu không chính xác");
        }
      }
    );
    setLoading(false);
  }, [appUser, from, history, setErrorMessagePass, setErrorMessageUsername]);

  // handle change email
  const handleChangeEmail = useCallback((event) => {
    setEmail(event.target.value);
  }, []);

  // handle change otp
  const handleChangeOtp = useCallback(
    (event) => {
      setOtp(event.target.value);
      setErrorMessageOtp(null);
    },
    [setErrorMessageOtp]
  );

  // SendOtp

  const handleSendOtp = useCallback(() => {
    const obj = {
      email,
      otpCode: otp,
    };
    authenticationService.verifyOtpCode(obj).subscribe(
      (response) => {
        setGetOtpVisible(false);
        setChangePassVisible(true);
      },
      (error) => {
        if (error.response && error.response.status === 400) {
          const { otpCode } = error.response.data?.errors;
          if (typeof otpCode !== "undefined") setErrorMessageOtp(otpCode);
        }
        setChangePassVisible(false);
      }
    );
  }, [email, otp, setErrorMessageOtp]);

  // Send mail to get otp
  const handleSendMail = useCallback(() => {
    authenticationService.forgotPassword(email).subscribe((response) => {
      setForgotPasswordVisible(false);
      setGetOtpVisible(true);
    });
  }, [email]);

  // Get new pass word
  const handleChangeNewPass = useCallback((event) => {
    setNewPass(event.target.value);
    setCheckPass(false);
  }, []);

  const handleChangeConfirmPassword = useCallback(
    (event) => {
      const confirmPass: string = event.target.value;
      setConfirmPass(event.target.value);
      if (confirmPass === newPass) {
        setCheckPass(true);
      } else {
        setCheckPass(false);
      }
    },
    [newPass]
  );

  const handleChangePass = useCallback(() => {
    setLoading(true);
    authenticationService.changePassword(confirmPass).subscribe(
      (response) => {
        setLoading(false);
        setLoginVisible(true);
        setChangePassVisible(false);
        setGetOtpVisible(false);
        notification.info({
          message: translate("auth.changePasswordSuccess"),
          // description: error.response.statusText,
          placement: "topRight",
        });
      },
      (error) => setLoading(false)
    );
  }, [confirmPass]);

  const handleEnter = useCallback(
    (ev: React.KeyboardEvent<HTMLInputElement>) => {
      if (ev.key === "Enter") {
        handleLogin();
      }
    },
    [handleLogin]
  );

  return {
    loginVisible,
    forgotPasswordVisible,
    getOtpVisible,
    changePassVisible,
    loading,
    checkPass,
    confirmPass,
    showForgotPassword,
    handleChangeEmail,
    handleChangeOtp,
    handleSendOtp,
    handleSendMail,
    handleChangeNewPass,
    handleChangeConfirmPassword,
    handleChangePass,
    showLogin,
    handleLogin,
    handleEnter,
    otp,
  };
}
