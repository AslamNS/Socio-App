import React, { useEffect, useState } from "react";
import Header from "./Header";
import ImgUrl from "../util/image";

function Createcommunity() {
  const [auth, setAuth] = useState(
    JSON.parse(localStorage.getItem("userdata"))
  );
  const [name, setName] = useState("");
  const [image, setImage] = useState([]);
  const [viewCommunity, setViewCommunity] = useState([]);
  const [refresh, setRefresh] = useState(0);

  const fileUpload = (e) => {
    let file = e.target.files[0];
    let formData = new FormData();
    formData.append("file", file);

    fetch("http://localhost:4000/util/fileUpload", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        setImage(result);
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
      });
  };
  const handleCommunity = () => {
    const data = {
      admin: auth._id,
      name: name,
      image: image,
      is_admin: true,
    };
    fetch("http://127.0.0.1:4000/community/create", {
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
        setRefresh((prev) => prev + 1);
      });
  };

  useEffect(() => {
    let param = {
      id: auth._id,
    };
    fetch("http://localhost:4000/community/viewallcommunity", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(param),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setViewCommunity(result);
      });
  }, [refresh]);

  const handlemember = (id) => {
    let param = {
      id: id,
      userid: auth._id,
    };
    fetch("http://localhost:4000/community/join", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(param),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setRefresh((prev) => prev + 1);
      });
  };

  return (
    <>
      <Header />
      <section className="groupback bg-light">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-12 col-xl-4">
              <div className="card rounded-4 border-0 shadow-lg">
                <div className="card-header rounded-4 bg-success">
                  <div className="mt-3 mb-4 d-flex align-items-center gap-3 justify-content-center">
                    <img
                      src="./img/groups.avif"
                      className="rounded-circle object-fit-cover"
                      style={{ width: "80px", height: "80px" }}
                      alt="User Avatar"
                    />
                    <h4 className="m-0 text-white text-capitalize">
                      Create new community
                    </h4>
                  </div>
                </div>
                <div className="card-body text-center">
                  <input
                    type="text"
                    name="communityname"
                    className="form-control my-2"
                    placeholder="Enter the comuunity name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <input
                    type="file"
                    name="groupname"
                    className="form-control my-2"
                    onChange={(e) => fileUpload(e)}
                  />

                  <div
                    className="bg-secondary px-4"
                    style={{ borderRadius: "10px" }}
                  ></div>

                  <button
                    type="button"
                    className="btn btn-primary btn-rounded mt-2 w-100 mt-4 my-4"
                    onClick={handleCommunity}
                  >
                    Create Comuunity
                  </button>
                </div>
              </div>
            </div>

            <div className="row mt-4">
              <div className="col">
                {viewCommunity.length !== 0 && (
                  <h5 className="text-success mb-3">Community List</h5>
                )}
                {viewCommunity.map(
                  (item, index) =>
                    auth._id !== item.admin && (
                      <div
                        className="card border-0 p-3 bg-white shadow-lg"
                        key={index}
                      >
                        <div className="d-flex align-items-center gap-2">
                          <img
                            height={40}
                            width={40}
                            src={`${ImgUrl}${item.image}`}
                            className="rounded-circle"
                            alt={`User ${index + 1}`}
                          />
                          <h4 className="my-2 text-dark text-capitalize">
                            {item.communityname}
                          </h4>
                          <div className="my-2 mt-1">
                            Total Members: {item.members.length}
                          </div>
                          <button
                            className="btn btn-primary btn-lg my-2 ms-auto"
                            onClick={() => handlemember(item._id)}
                            style={{ marginRight: "12px" }}
                          >
                            Join community
                          </button>
                        </div>
                      </div>
                    )
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Createcommunity;
