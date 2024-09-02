import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ImgUrl from "../util/image";
import Header from "./Header";

function EditPost() {
  const [image, setImage] = useState("");
  console.log(image, "image");
  const [description, setDescription] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(location);
    const params = { id: location.state.id };

    fetch("http://localhost:4000/post/getpostdetail", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result, "result");
        setDescription(result.description);
        setImage(result.image);
      });
  }, [location.state.id]);

  const fileUpload = (e) => {
    let file = e.target.files[0];
    let formData = new FormData();
    formData.append("file", file);

    fetch("http://localhost:4000/util/fileupload", {
      method: "post",
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        setImage(result);
      });
  };

  const update = () => {
    const param = {
      id: location.state.id,
      image: image,
      description: description,
    };
    fetch("http://localhost:4000/post/updatepost", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(param),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log("Update success");
        navigate("/");
      });
  };

  return (
    <>
      <Header />
      <section className="bg_pattern main_content ">
        <div className="container h-100">
          <div className="row align-items-center justify-content-center h-100">
            <div className="col-6 col-md-8">
              <div className="card rounded-4 border-0 bg-white shadow-lg ">
                <div className="card-body p-4">
                  <img
                    src={`${ImgUrl}${image}`}
                    alt="Post cover"
                    className="w-100 h-auto rounded-4"
                  />

                  <label
                    htmlFor="file-upload"
                    className="custom-file-upload text-dark py-3"
                  >
                    <i className="fa-regular fa-image me-2"></i>
                    <span className="fs-6">Change Image</span>
                  </label>
                  <input
                    id="file-upload"
                    onChange={fileUpload}
                    type="file"
                    className="form-control "
                    name="image"
                    style={{ display: "none" }}
                  />

                  <div className="d-flex gap-2">
                    <input
                      className="form-control"
                      type="text"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />

                    <button
                      type="submit"
                      className="btn btn-success"
                      onClick={update}
                    >
                      Update
                    </button>
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

export default EditPost;
