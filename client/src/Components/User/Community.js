import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ImgUrl from "../util/image";
import Header from "./Header";

function Community() {
  const [authenticated, setAuthenticated] = useState(
    JSON.parse(localStorage.getItem("userdata"))
  );
  const [groupid, setGroupid] = useState(null);
  const [viewallgroup, Setviewallgroup] = useState([]);
  const [viewmessage, setViewmessage] = useState([]);
  const [message, setMessage] = useState("");
  const [refresh, setRefresh] = useState(0);
  const [image, setImage] = useState(null);
  const [toxicityData, setToxicityData] = useState([]);
  const [selectedGroupId, setSelectedGroupId] = useState(null);

  const handleaddClick = (groupId) => {
    setSelectedGroupId(groupId === selectedGroupId ? null : groupId);
  };

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
  useEffect(() => {
    let params = {
      auth: JSON.parse(localStorage.getItem("userdata"))._id,
    };
    fetch("http://localhost:4000/community/viewcommunity", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    })
      .then((res) => res.json())
      .then((result) => {
        Setviewallgroup(result);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!groupid) {
      alert("Please select a group to chat with");
      return;
    }
    const data = {
      message: message,
      image: image,
      senderid: authenticated._id,
      groupid: groupid,
    };
    fetch("http://127.0.0.1:4000/community/sendmessage", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        setMessage("");
        setRefresh((prev) => prev + 1);
      });
  };

  useEffect(() => {
    if (groupid) {
      const param = { groupid: groupid };
      fetch("http://127.0.0.1:4000/community/viewmessage", {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(param),
      })
        .then((res) => res.json())
        .then((result) => {
          setViewmessage(result);
        });
    }
  }, [groupid, refresh]);

  const getChats = async (id) => {
    setGroupid(id);
  };

  const [groupuser, setGroupuser] = useState([]);
  console.log(groupuser, "group user");

  useEffect(() => {
    fetch("http://localhost:4000/group/viewusers")
      .then((res) => res.json())
      .then((result) => {
        setGroupuser(result);
      });
  }, []);

  const [showElements, setShowElements] = useState(false);

  const handleClick = (id) => {
    setShowElements(true);
  };

  const isAdmin = (group) => {
    if (!authenticated) return false;
    return group.admin === authenticated._id;
  };

  const handleDeletemsg = (id) => {
    fetch("http://localhost:4000/community/report", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    })
      .then((res) => res.json())
      .then((result) => {
        setRefresh((prev) => prev + 1);
        toast.error("Message reported");
      });
  };
  return (
    <>
      <Header />
      <ToastContainer />
      <section>
        <div className="container-fluid">
          <div className="row main_content">
            <div className="col-4 p-0 h-100 bg-body-secondary">
              <div className="bg-gray px-4 py-2 bg-warning-subtle">
                <p className="h5 mb-0 py-1 text-success">Community Chat</p>
              </div>
              <div className="messages-box">
                <div className="list-group rounded-0 groupchatsdes">
                  {viewallgroup.map((items, index) => (
                    <a
                      key={index}
                      className="list-group-item list-group-item-action text-dark rounded-0 py-3"
                      onClick={() => getChats(items._id)}
                    >
                      <div className="d-flex align-items-center">
                        <img
                          src={`${ImgUrl}${items.image}`}
                          alt="user"
                          width="50"
                          height="50"
                          className="rounded-circle object-fit-cover me-3 border border-dark"
                        />
                        <div className="media-body ml-4">
                          <div className="d-flex align-items-center justify-content-between mb-1">
                            <h6 className="mb-0">{items.communityname}</h6>
                          </div>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="col-8 px-0 d-flex flex-column position-relative h-100 bg-body-tertiary">
              <div className="px-4 py-5 bg-body-tertiary overflow-y-auto mb-4">
                {viewmessage.map((msg, index) => (
                  <div
                    key={index}
                    className={`media w-50 ${
                      msg.senderid._id === authenticated._id
                        ? "ml-auto"
                        : "mr-auto"
                    } mb-3 d-flex`}
                  >
                    <img
                      src={`${ImgUrl}${msg.senderid.userid.image}`}
                      alt="user"
                      width={50}
                      height={50}
                      className="rounded-circle"
                    />
                    <div className="media-body ms-3">
                      <div
                        className={`bg-${
                          msg.senderid._id === authenticated._id
                            ? "success"
                            : "light"
                        } rounded-4 py-2 px-3 mb-2`}
                      >
                        {msg.image !== null ? (
                          <img src={`${ImgUrl}${msg.image}`} width={700} />
                        ) : (
                          "no image"
                        )}

                        <p
                          className={`text-small mb-0 ${
                            msg.senderid._id === authenticated._id
                              ? "text-white"
                              : "text-muted"
                          }`}
                        >
                          {msg.message}
                          &nbsp;&nbsp;
                          <i
                            className="fa-solid fa-flag ml-3 text-end  small"
                            style={{ color: "dark" }}
                            onClick={() => handleDeletemsg(msg._id)}
                          ></i>
                        </p>
                      </div>
                      <p className="small text-muted text-capitalize fw-semibold">
                        {msg.senderid.userid.name}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {authenticated &&
                viewallgroup.some(
                  (group) => isAdmin(group) && group._id === groupid
                ) && (
                  <form
                    className="bg-white border shadow-lg mt-auto position-absolute chatContentBox rounded-4 overflow-hidden"
                    onSubmit={handleSubmit}
                  >
                    <div className="input-group">
                      <input
                        type="text"
                        name="message"
                        placeholder="Message"
                        aria-describedby="button-addon2"
                        className="form-control rounded-0 border-0 py-4 px-4 bg-light"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                      />

                      <label
                        htmlFor="file-upload"
                        className="custom-file-upload text-dark"
                      >
                        <i
                          className="fa fa-paperclip fa-2xl "
                          style={{ marginTop: "35px", marginRight: "10px" }}
                          aria-hidden="true"
                        ></i>
                      </label>
                      <input
                        id="file-upload"
                        onChange={(e) => fileUpload(e)}
                        type="file"
                        className="form-control"
                        name="image"
                        style={{ display: "none" }}
                      />

                      <div className="input-group-append">
                        <button
                          id="button-addon2"
                          type="submit"
                          className="btn btn-primary h-100 fw-bold"
                        >
                          <i className="fa fa-paper-plane me-2"></i>Send
                        </button>
                      </div>
                    </div>
                  </form>
                )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Community;
