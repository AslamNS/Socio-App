import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import ImgUrl from "./image";

function Profile() {
  const location = useLocation();
  const [profile, setProfile] = useState([]);
  const [post, setPost] = useState([]);
  const [auth, setAuth] = useState(
    JSON.parse(localStorage.getItem("userdata"))
  );

  let param = {
    id: location.state.id,
  };

  useEffect(() => {
    fetch("http://localhost:4000/admin/profile", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(param),
    })
      .then((res) => res.json())
      .then((result) => {
        setProfile(result);
        console.log(result);
      });
  }, [location.state.id]);

  useEffect(() => {
    if (profile._id) {
      let postparam = {
        id: profile._id,
      };
      console.log(postparam, "authid");

      fetch("http://localhost:4000/admin/post", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postparam),
      })
        .then((res) => res.json())
        .then((result) => {
          setPost(result);
          console.log(result, "post details");
        });
    }
  }, [profile._id]);

  return (
    <section className="h-100 gradient-custom-2">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center">
          <div className="col col-lg-9 col-xl-8">
            <div className="card">
              <div
                className="rounded-top text-white d-flex flex-row"
                style={{ backgroundColor: "#000", height: "200px" }}
              >
                <div
                  className="ms-4 mt-5 d-flex flex-column"
                  style={{ width: "150px" }}
                >
                  <img
                    src={`${ImgUrl}${profile.userid?.image}`}
                    alt="Generic placeholder image"
                    className="img-fluid img-thumbnail mt-4 mb-2"
                    style={{ width: "150px", zIndex: "1" }}
                  />
                </div>
                <div className="ms-3" style={{ marginTop: "130px" }}>
                  <h5>{profile.userid?.name}</h5>
                </div>
              </div>
              <div className="p-4 text-black bg-body-tertiary">
                <div className="d-flex justify-content-end text-center py-1 text-body"></div>
              </div>
              <div className="card-body p-4 text-black">
                <div className="d-flex justify-content-between align-items-center mb-4 text-body">
                  <p className="lead fw-normal mb-0">Posted photos</p>
                  <p className="mb-0"></p>
                </div>
                <div className="row g-2">
                  {post.map((item) => (
                    <div className="col mb-2">
                      <img
                        src={`${ImgUrl}${item.image}`}
                        alt="image 1"
                        className="w-100 rounded-3"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Profile;
