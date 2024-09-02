import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { format } from "date-fns";
import ImgUrl from "../util/image";
import Header from "./Header";

function Chats() {
  const [authenticated, setAuthenticated] = useState(
    JSON.parse(localStorage.getItem("userdata"))
  );
  const [user, setUser] = useState([]);
  const [recieverUser, setRecieverUser] = useState();
  const [message, setMessage] = useState("");
  const [refresh, setRefresh] = useState(0);
  const [getmessage, setGetmessage] = useState([]);

  const [userChats, setUserChats] = useState([]);

  console.log(userChats, "userchat");

  useEffect(() => {
    fetch("http://localhost:4000/chat/viewusers")
      .then((res) => res.json())
      .then((result) => {
        setUser(result);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!recieverUser) {
      alert("Please select a user to chat with.");
      return;
    }
    const data = {
      message: message,
      senderid: authenticated._id,
      recieverid: recieverUser,
    };
    fetch("http://127.0.0.1:4000/chat/sendmessage", {
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

  const [view, setView] = useState([]);

  useEffect(() => {
    let param = {
      senderid: authenticated._id,
    };
    fetch("http://127.0.0.1:4000/chat/getmessage", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(param),
    })
      .then((res) => res.json())
      .then(async (result) => {
        await setView(result);

        if (recieverUser != null) {
          await getChats(recieverUser, result);
        }
      });
  }, [authenticated, refresh]);

  const getChats = async (id, result = null) => {
    setRecieverUser(id);

    if (result) {
      let usermsg = await result.filter((m) => {
        return m.senderid._id == id || m.recieverid._id == id;
      });
      await setUserChats(usermsg);
    } else {
      let usermsg = await view.filter((m) => {
        return m.senderid._id == id || m.recieverid._id == id;
      });
      await setUserChats(usermsg);
    }
  };

  const handleDeletemsg = (iD) => {
    let ids = {
      id: iD,
    };
    fetch("http://localhost:4000/chat/deletemessage", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ids),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        toast.error("Message Deleted");
        setRefresh((prev) => prev + 1);
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
                <p className="h5 mb-0 py-1 text-success"> Chats</p>
              </div>
              <div className="messages-box">
                <div className="list-group rounded-0 groupchatsdes">
                  {user.map((item, index) => {
                    if (authenticated._id !== item._id) {
                      return (
                        <a
                          key={index}
                          className="list-group-item list-group-item-action text-dark rounded-0"
                          onClick={() => getChats(item._id)}
                        >
                          <div className="media">
                            <img
                              src={`${ImgUrl}${item.userid.image}`}
                              alt="user"
                              width="30"
                              height="30"
                              className="rounded-circle"
                            />
                            <div className="media-body ml-4">
                              <div className="d-flex align-items-center justify-content-between mb-1">
                                <h6 className="mb-0">{item.userid.name}</h6>
                              </div>
                            </div>
                          </div>
                        </a>
                      );
                    } else {
                      return null;
                    }
                  })}
                </div>
              </div>
            </div>

            <div className="col-8 px-0 d-flex flex-column position-relative h-100 bg-body-tertiary">
              <div className="px-4 py-5 -bg-body-tertiary overflow-y-auto mb-4">
                {userChats.map((msg, index) => (
                  <div
                    className={`media w-50 ${
                      msg.senderid._id === authenticated._id
                        ? "ml-auto"
                        : "mr-auto"
                    } mb-3`}
                    key={index}
                  >
                    <img
                      src={`${ImgUrl}${msg.senderid.userid.image}`}
                      alt="user"
                      width="50"
                      className="rounded-circle"
                    />
                    <div className="media-body ml-3">
                      <div
                        className={`bg-${
                          msg.senderid._id === authenticated._id
                            ? "primary"
                            : "light"
                        } rounded py-2 px-3 mb-2`}
                      >
                        <p
                          className={`text-small mb-0 ${
                            msg.senderid._id === authenticated._id
                              ? "text-white"
                              : "text-muted"
                          }`}
                        >
                          {msg.message}
                        </p>
                        {msg.senderid._id === authenticated._id && (
                          <i
                            className="fa-solid fa-trash"
                            style={{ color: "dark" }}
                            onClick={() => handleDeletemsg(msg._id)}
                          ></i>
                        )}
                      </div>
                      <p className="small text-muted text-right">
                        {msg.senderid.userid.name}
                      </p>
                      <p className="small text-muted text-right">
                        {msg.createdAt
                          ? format(new Date(msg.createdAt), "hh:mm a")
                          : ""}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
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
                  <div className="input-group-append">
                    <button
                      id="button-addon2"
                      type="submit"
                      className="btn btn-success h-100 fw-bold"
                    >
                      <i className="fa fa-paper-plane me-2"></i>Send
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Chats;
