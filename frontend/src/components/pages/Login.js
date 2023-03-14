import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Form from "../pages/Forms";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [validate, setValidate] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessages, setErrorMessages] = useState({});
  // const [isSubmitted, setIsSubmitted] = useState(false);
  // const pathname = window.location.pathname;

  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  const data = {
    email: email,
    password: password,
  };

  const validateLogin = () => {
    let isValid = true;
    let validator = Form.validator({
      email: {
        value: email,
        isRequired: true,
        isEmail: true,
      },
      password: {
        value: password,
        isRequired: true,
        minLength: 6,
      },
    });

    if (validator !== null) {
      setValidate({
        validate: validator.errors,
      });

      isValid = false;
    }
    return isValid;
  };

  const Navigate = useNavigate();
  const authenticate = async (e) => {
    const validate = validateLogin();
    e.preventDefault();
    if (validate) {
      setValidate({});
      setEmail("");
      setPassword("");
      Navigate("/home");
    }

    axios
      .post("http://localhost:1313/login", data)
      .then((res) => {
        console.log(JSON.stringify(res));
        var res = res.data;
        if (res.success === false) {
          alert(res.message);
          console.log("invalid", res.message);
        } else {
          console.log(res.data);
          //router and store the user data in session or local

          sessionStorage.setItem("UserInfo", res.data[0].fullname);
          sessionStorage.setItem("UserInfo1", res.data[0].email);
          sessionStorage.setItem("UserInfoID", res.data[0].id);

          // var store = localStorage.getItem("UserInfo");
          // console.log(store);
          // Navigate("/home");
        }

        console.log(res.data);
        return false;
      })
      .catch((error) => {
        console.log(error);
      });
    return false;
  };

  const togglePassword = (e) => {
    if (showPassword) {
      setShowPassword(false);
    } else {
      setShowPassword(true);
    }
  };

  return (
    // <div className="col-12 col-md-7 col-lg-6 auth-main-col text-center">
    <div className="bg">
      <div className="d-flex flex-column align-content-end">
        <div className="auth-body mx-auto">
          <div className="auth-form-container text-start">
            <form
              className="auth-form"
              method="POST"
              // onSubmit={onSubmit}
              autoComplete={"off"}
            >
              <h2 className="text-center">LogIn</h2>

              <div className="email mb-3">
                <input
                  type="email"
                  className={`form-control ${
                    validate.validate && validate.validate.email
                      ? "is-invalid "
                      : ""
                  }`}
                  id="email"
                  name="email"
                  value={email}
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                {renderErrorMessage("email")}

                <div
                  className={`invalid-feedback text-start ${
                    validate.validate && validate.validate.email
                      ? "d-block"
                      : "d-none"
                  }`}
                >
                  {validate.validate && validate.validate.email
                    ? validate.validate.email[0]
                    : ""}
                </div>
              </div>

              <div className="password mb-3">
                <div className="input-group">
                  <input
                    type={showPassword ? "text" : "password"}
                    className={`form-control ${
                      validate.validate && validate.validate.password
                        ? "is-invalid "
                        : ""
                    }`}
                    name="password"
                    id="password"
                    value={password}
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  {renderErrorMessage("password")}
                  <button
                    type="button"
                    className="btn bg-white btn-sm"
                    onClick={(e) => togglePassword(e)}
                  >
                    <i>{showPassword ? <FaEye /> : <FaEyeSlash />}</i>{" "}
                  </button>
                  <div
                    className={`invalid-feedback text-start ${
                      validate.validate && validate.validate.password
                        ? "d-block"
                        : "d-none"
                    }`}
                  >
                    {validate.validate && validate.validate.password
                      ? validate.validate.password[0]
                      : ""}
                  </div>
                </div>

                <div className="extra mt-3 row justify-content-between">
                  <div className="col-6">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="remember"
                        checked={remember}
                        onChange={(e) => setRemember(e.currentTarget.checked)}
                      />
                      <label className="form-check-label" htmlFor="remember">
                        Remember me
                      </label>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="forgot-password text-end">
                      <Link to="/forgot">Forgot password?</Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <button
                  type="button"
                  className="btn btn-primary w-100 theme-btn mx-auto"
                  onClick={authenticate}
                >
                  Log In
                </button>
              </div>
            </form>

            <hr />
            <div className="auth-option text-center pt-2">
              Create a new Account?{" "}
              <Link className="text-link" to="/regi">
                Sign up{" "}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
