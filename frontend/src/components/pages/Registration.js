import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Form from "../pages/Forms";
import axios from "axios";
import "./Page.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const [fullname, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validate, setValidate] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  // const handleOnSubmit = (e) => {
  //   e.preventDefault();
  // };

  const validateRegister = () => {
    let isValid = true;

    let validator = Form.validator({
      fullname: {
        value: fullname,
        isRequired: true,
      },
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
  const register = (e) => {
    e.preventDefault();
    const data = {
      fullname: fullname,
      email: email,
      password: password,

      // other fields...
    };

    axios
      .post("http://localhost:1313/regi", data)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });

    const validate = validateRegister();

    if (validate) {
      setValidate({});
      setName("");
      setEmail("");
      setPassword("");
      alert("Successfully Register User");
      Navigate("/login");
    }
  };

  const togglePassword = (e) => {
    if (showPassword) {
      setShowPassword(false);
    } else {
      setShowPassword(true);
    }
  };

  return (
    <div className="d-flex flex-column align-content-end bg">
      <div className="auth-body mx-auto">
        <div className="auth-form-container text-start">
          <form
            className="auth-form"
            method="POST"
            onSubmit={register}
            autoComplete={"off"}
          >
            <h2 className="text-center">Registration</h2>

            <div className="name mb-3">
              <input
                type="text"
                className={`form-control ${
                  validate.validate && validate.validate.name
                    ? "is-invalid "
                    : ""
                }`}
                id="name"
                name="fullname"
                value={fullname}
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
              />

              <div
                className={`invalid-feedback text-start ${
                  validate.validate && validate.validate.name
                    ? "d-block"
                    : "d-none"
                }`}
              >
                {validate.validate && validate.validate.name
                  ? validate.validate.name[0]
                  : ""}
              </div>
            </div>

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
                <button
                  type="button"
                  className="btn bg-white btn-sm border-0"
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
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="btn btn-primary w-100 theme-btn mx-auto"
                onClick={register}
              >
                Sign Up
              </button>
            </div>
          </form>

          <hr />
          <div className="auth-option text-center pt-2">
            Have an account?{" "}
            <Link className="text-link" to="/login">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
