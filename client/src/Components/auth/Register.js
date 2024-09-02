import React, { useState } from "react";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [image, setImage] = useState("");

  const fileUpload = (e, setFile) => {
    let file = e.target.files[0];
    let formData = new FormData();
    formData.append("file", file);

    fetch("http://localhost:4000/util/fileUpload", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        setFile(result);
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
      });
  };

  const handleRegister = () => {
    const data = {
      name: name,
      email: email,
      password: password,
      gender: gender,
      dob: dob,
      image: image,
      usertype: 0,
    };
    fetch("http://127.0.0.1:4000/user/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setName("");
        setEmail("");
        setPassword("");
        setGender("");
        setDob("");
        setImage("");
      });
  };

  return (
    <section className="loginback vh-md-100 p-4 d-flex align-items-center">
      <div className="container">
        <div className="row justify-content-center align-items-center h-100">
          <div className="col-12 col-lg-10 col-xl-8">
            <div className="card shadow-lg bg-success card-registrations rounded-4 overflow-hidden">
              <div className="card-header p-4 text-center">
                <h1 className="fs-2 text-white text-center">
                  Create your Account
                </h1>
                <p className="text-secondary m-0 " style={{ fontSize: "18px" }}>
                  <span className="fw-bold animated_text">Socio App</span>
                </p>
              </div>
              <div className="card-body p-5 bg-white rounded-5 rounded-bottom-0">
                <div className="row g-3">
                  <div className="col-md-6">
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter your name"
                      name="name"
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="userEmail" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="form-control "
                      name="userEmail"
                      id="userEmail"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="userPassword" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      placeholder="Enter your password"
                      name="userPassword"
                      id="userPassword"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="inputEmail4" className="form-label d-block">
                      Gender
                    </label>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="gender"
                        id="female"
                        value="female"
                        checked={gender === "female"}
                        onChange={(e) => setGender(e.target.value)}
                      />
                      <label className="form-check-label" htmlFor="female">
                        Female
                      </label>
                    </div>
                    <div className="form-check form-check-inline">
                      <input
                        className="form-check-input"
                        type="radio"
                        name="gender"
                        value="male"
                        id="male"
                        checked={gender === "male"}
                        onChange={(e) => setGender(e.target.value)}
                      />
                      <label className="form-check-label" htmlFor="male">
                        Male
                      </label>
                    </div>
                  </div>
                  <div className="col-md-6 pb-2">
                    <div className="form-outline">
                      <label className="form-label">Date of Birth</label>
                      <input
                        type="date"
                        className="form-control"
                        name="dob"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-outline">
                      <label className="form-label">Upload your image</label>
                      <input
                        onChange={(e) => fileUpload(e, setImage)}
                        type="file"
                        className="form-control"
                        name="image"
                      />
                    </div>
                  </div>

                  <div className="col-12 text-center">
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={handleRegister}
                    >
                      Create account
                    </button>
                  </div>
                </div>
                <div className="text-center">
                  <p
                    className="text-secondary mt-4"
                    style={{ fontSize: "14px" }}
                  >
                    Already have an account?
                    <a
                      href="/"
                      className="text-primary fw-semibold ms-2 text-decoration-none"
                    >
                      Login
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;
