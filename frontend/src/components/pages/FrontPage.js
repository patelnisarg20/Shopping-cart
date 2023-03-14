import React from "react";
import { useNavigate } from "react-router-dom";
import "./Page.css";

export default function FrontPage() {
  const Navigate = useNavigate();
  const login = () => {
    Navigate("/login");
  };
  const Register = () => {
    Navigate("/regi");
  };

  return (
    <div className="bg">
      <div className="d-flex flex-column align-content-end">
        <div className="auth-body mx-auto d-flex ">
          <div className="front-container text-start">
            <h1>online shopping</h1>
          </div>
        </div>
        <div className="auth-body mx-auto d-flex ">
          <div className="front-container">
            <div className="d-flex">
              <div className="p-4">
                <button class="btn btn-secondary" onClick={login}>Login</button>
              </div>
              <div className="p-4">
                <button className="btn btn-danger" onClick={Register}>Register</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
