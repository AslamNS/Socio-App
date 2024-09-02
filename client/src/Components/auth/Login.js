import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = () => {
    let param = {
      email: email,
      password: password,
    };
    fetch("http://localhost:4000/user/login", {
      method: "POST",
      body: JSON.stringify(param),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }).then((res) => {
      res.json().then((data) => {
        console.log("data", data);
        if (data !== "invalid") {
          localStorage.setItem("userdata", JSON.stringify(data));
          window.location.href = "/";
          navigate("/");
        } else {
          console.log("error occured");
        }
      });
    });
  };

  return (
    <>
      <section className="loginback vh-100 d-flex align-items-center">
        <div className="container py-5 -h-100">
          <div className="row justify-content-center align-items-center ">
            <div className="col-10 col-md-8 col-lg-10 col-xl-8">
              <div className="card card-registration logincard rounded-4 overflow-hidden shadow-lg">
                <div className="row">
                  <div className="col-12 col-md-12 col-lg-6 bg-white loginFormCol">
                    <h1 className="text-start fs-3 lh-1 text-success  fw-bold">
                      Login to your Account
                    </h1>
                    <p
                      className="text-start text-secondary m-0 "
                      style={{ fontSize: "14px" }}
                    >
                      Welcome back to{" "}
                      <span className="fw-bold animated_text">Socio App</span>
                    </p>
                    <div className="form-floating mb-2 mt-4">
                      <input
                        type="email"
                        name="email"
                        className="form-control"
                        id="floatingInput"
                        placeholder="name@example.com"
                        onChange={(event) => setEmail(event.target.value)}
                      />
                      <label for="floatingInput">Email</label>
                    </div>
                    <div className="form-floating">
                      <input
                        type="password"
                        className="form-control"
                        name="password"
                        id="floatingPassword"
                        placeholder="Password"
                        onChange={(event) => setPassword(event.target.value)}
                      />
                      <label for="floatingPassword">Password</label>
                    </div>

                    <div className="mt-3">
                      <button
                        type="button"
                        className="btn btn-success w-100"
                        onClick={() => login()}
                      >
                        Login
                      </button>
                    </div>
                    <div className="text-center">
                      <p
                        className="text-secondary mt-4"
                        style={{ fontSize: "14px" }}
                      >
                        Don't have an account?
                        <a
                          href="/register"
                          className="text-primary fw-semibold ms-2 text-decoration-none"
                        >
                          Create an account
                        </a>
                      </p>
                    </div>
                  </div>
                  <div className="col-12 col-md-12 col-lg-6 -loginimg p-0 d-none d-lg-block">
                    <img
                      src="img/login-bg-img.jpg"
                      className="-loginimg w-100 h-100 object-fit-cover"
                      alt="login bg"
                    ></img>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default Login;
