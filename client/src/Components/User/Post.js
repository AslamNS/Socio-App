import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "reactjs-popup/dist/index.css";
import ImgUrl from "../util/image";
import Popup from "reactjs-popup";
import Header from "./Header";

function Post() {
  const navigate = useNavigate();

  const [authenticated, setAuthenticated] = useState(
    JSON.parse(localStorage.getItem("userdata")) || null
  );
  const [image, setImage] = useState("");
  const [dp, setDp] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [description, setDescription] = useState("");
  const [viewpost, setViewpost] = useState([]);
  const [viewauthuser, setViewauthuser] = useState([]);
  const [comment, setComment] = useState("");
  const [commentId, setCommentId] = useState("");
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [user, setUser] = useState([]);
  const [friends, setFriends] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
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
        setDp(result);
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
      });
  };

  const addPost = () => {
    if (!authenticated) {
      console.error("User not authenticated");
      return;
    }

    let params = {
      userid: authenticated._id,
      image: image,
      description: description,
    };

    fetch("http://localhost:4000/post/post", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    })
      .then((res) => res.json())
      .then(() => {
        fetchPosts();
        toast.success("Post Uploaded");
      });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    fetch("http://localhost:4000/post/viewpost")
      .then((res) => res.json())
      .then((result) => {
        setViewpost(result);
      });
  };

  const handleIconClick = (postId) => {
    setCommentId(postId);
    setIsInputVisible(!isInputVisible);
  };

  const addComment = () => {
    let params = {
      id: commentId,
      comment: comment,
      userid: authenticated._id,
    };
    fetch("http://localhost:4000/post/addcomment", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    })
      .then((res) => res.json())
      .then(() => {
        fetchPosts();
        setComment("");
        setIsInputVisible(false);
      });
  };

  const handleLike = (postId) => {
    fetch("http://localhost:4000/post/like", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ postId, userId: authenticated._id }),
    })
      .then((res) => res.json())
      .then(() => {
        fetchPosts();
      });
  };

  const handleUnlike = (postId) => {
    fetch("http://localhost:4000/post/unlike", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ postId, userId: authenticated._id }),
    })
      .then((res) => res.json())
      .then(() => {
        fetchPosts();
      });
  };

  const toggleDropdown = (postId) => {
    setDropdownVisible(dropdownVisible === postId ? null : postId);
  };

  useEffect(() => {
    fetch("http://localhost:4000/friend/users")
      .then((res) => res.json())
      .then((result) => {
        setUser(result);
      });
  }, []);

  const handleFollow = (iD) => {
    let ids = {
      follower: iD,
      following: authenticated._id,
    };
    fetch("http://127.0.0.1:4000/friend/follow", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ids),
    })
      .then((res) => res.json())
      .then((result) => {
        toast(result);
        setRefresh((prev) => prev + 1);
      })
      .catch((error) => {
        console.error("Error deleting concession data:", error);
      });
  };

  useEffect(() => {
    let param = {
      Userid: authenticated._id,
    };
    fetch("http://localhost:4000/friend/friends", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(param),
    })
      .then((res) => res.json())
      .then((result) => {
        setFriends(result);
      });
  }, [refresh]);

  const handleUnfollow = (iD) => {
    let ids = {
      id: iD,
    };
    fetch("http://localhost:4000/friend/unfollow", {
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
        setRefresh((prev) => prev + 1);
      });
  };

  const handleDeletepost = (iD) => {
    let ids = {
      id: iD,
    };
    fetch("http://localhost:4000/post/deletepost", {
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
        window.location.reload();
      });
  };

  const handleReport = (iD) => {
    let param = {
      id: iD,
      status: 1,
    };
    fetch("http://localhost:4000/post/reportpost", {
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
        window.location.reload();
      });
  };

  useEffect(() => {
    fetch("http://localhost:4000/post/user", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: authenticated._id }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log("Result:", result);
        setViewauthuser(result);
        if (result) {
          setName(result.userid?.name || "");
          setEmail(result.email || "");
          setPassword(result.password || "");
          setDob(result.userid?.dob || "");
          setGender(result.userid?.gender || "");
          setDp(result.userid?.image || "");
        }
      });
  }, [authenticated]);

  const handleprofileupdate = () => {
    const param = {
      id: authenticated._id,
      image: dp,
      name: name,
      dob: dob,
      email: email,
      password: password,
      gender: gender,
    };

    fetch("http://localhost:4000/post/updateprofile", {
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
        localStorage.setItem("userdata", JSON.stringify(result));
        setAuthenticated(result);
        window.location.reload();
      });
  };

  const filteredUsers = user.filter((item) =>
    item.userid.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Header />
      <ToastContainer />
      <div className="container-fluid">
        <div className="row">
          <div className="col border-end py-4 px-4 bg-white">
            <div className="card-body">
              <div>
                <input
                  type="search"
                  className="form-control primary mb-3"
                  placeholder="search user"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <h5 className="text-success mb-3">Recommended List</h5>
                {filteredUsers
                  .filter((item) => item._id !== authenticated._id)
                  .map((item, index) => (
                    <div className="card mb-2 bg-white shadow-lg rounded border-0 p-3">
                      <div className="d-flex gap-2 align-items-center mb-3  ">
                        <div>
                          <img
                            src={`${ImgUrl}${item.userid.image}`}
                            className="card-img-top border"
                            alt={`User ${index + 1}`}
                            style={{
                              width: "40px",
                              height: "40px",
                              borderRadius: "50%",
                            }}
                          />
                        </div>
                        <div>
                          <h6 className="text-capitalize m-0">
                            {item.userid.name}
                          </h6>
                        </div>
                        <div>
                          <img
                            className="object-fit-contain"
                            src="./img/log.png"
                            style={{
                              width: "40px",
                              height: "40px",
                            }}
                          ></img>
                        </div>
                      </div>
                      <div className="">
                        <p className="card-text">
                          Stay connected and grow your community! Visit our
                          Follow Request Viewing page to see who's interested in
                          your content.
                        </p>
                        <button
                          className="btn btn-outline-primary btn-sm w-100"
                          onClick={() => handleFollow(item._id)}
                        >
                          Follow
                        </button>
                      </div>
                    </div>
                  ))}

                <div className="row mt-4">
                  <div className="col">
                    <h5 className="text-success mb-3">Friend List</h5>
                    {friends.map((item, index) => (
                      <div className="card border-0 p-3 bg-white shadow-lg">
                        <div className="d-flex align-items-center gap-2 ">
                          <img
                            height={40}
                            width={40}
                            src={`${ImgUrl}${item.follower?.userid?.image}`}
                            className="rounded-circle"
                            alt={`User ${index + 1}`}
                          />
                          <h6 className="my-2 text-dark">
                            {item.follower?.userid?.name}
                          </h6>
                          <button
                            className="btn btn-danger btn-sm my-2 ms-auto"
                            onClick={() => handleUnfollow(item._id)}
                            style={{ marginRight: "12px" }}
                          >
                            Unfollow
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-12 col-md-6 bg_pattern p-0">
            <div className="container px-5 py-4 main_content overflow-y-auto">
              {viewpost.map((item) => (
                <div className="row" key={item._id}>
                  <div className="col">
                    <div className="card mb-3 rounded-4 border-0 bg-white shadow-lg">
                      <div className="card-body p-4">
                        <div className="d-flex gap-2 justify-content-between mb-3">
                          <div className="d-flex gap-2 align-items-center">
                            {item.userid && item.userid.image && (
                              <img
                                src={`${ImgUrl}${item.userid.image}`}
                                alt="User avatar"
                                style={{
                                  width: "40px",
                                  height: "40px",
                                  borderRadius: "50%",
                                }}
                              />
                            )}
                            {item.userid && (
                              <p className="card-title m-0 text-capitalize fw-semibold">
                                {item.userid.name}
                              </p>
                            )}
                          </div>
                          <div className="position-relative">
                            <i
                              className="btn fa-solid fa-ellipsis fa-sm"
                              onClick={() => toggleDropdown(item._id)}
                            ></i>
                            {dropdownVisible === item._id && (
                              <div className="dropdown-menu show end-0 p-3 shadow-lg border-0">
                                <Link
                                  state={{ id: item._id }}
                                  to="/editpost"
                                  className="text-secondary text-decoration-none d-block"
                                >
                                  <i className="fa-solid fa-edit fa-sm icon-spacing"></i>
                                  Edit Post
                                </Link>

                                <Link
                                  href=""
                                  onClick={() => handleDeletepost(item._id)}
                                  className="text-secondary text-decoration-none d-block mt-2"
                                >
                                  <i className="fa-solid fa-trash fa-sm icon-spacing fa-danger "></i>
                                  Delete Post
                                </Link>
                                <Link
                                  href=""
                                  onClick={() => handleReport(item._id)}
                                  className="text-secondary text-decoration-none d-block mt-2"
                                >
                                  <i class="fa-solid fa-circle-exclamation"></i>{" "}
                                  &nbsp;Report Post
                                </Link>
                              </div>
                            )}
                          </div>
                        </div>
                        {item.image.endsWith(".mp4") ||
                        item.image.endsWith(".webm") ? (
                          <video
                            src={`${ImgUrl}${item.image}`}
                            controls
                            className="h-auto w-100 rounded"
                            style={{ height: "300px", width: "400px" }}
                          />
                        ) : (
                          <img
                            src={`${ImgUrl}${item.image}`}
                            alt="Post cover"
                            className="h-auto w-100 rounded"
                            style={{ height: "300px", width: "400px" }}
                          />
                        )}
                        <p className="card-text py-3">{item.description}</p>

                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            {item.likes.includes(authenticated._id) ? (
                              <i
                                className="fa-regular fa-heart me-1"
                                style={{ color: "#FF0000" }}
                                onClick={() => handleUnlike(item._id)}
                              ></i>
                            ) : (
                              <i
                                className="fa-regular fa-heart me-1 fs-5"
                                style={{ color: "#000000" }}
                                onClick={() => handleLike(item._id)}
                              ></i>
                            )}

                            <span className="me-2 fs-5">
                              {item.likes.length}
                            </span>
                            <i
                              className="fa-regular fa-comment fs-5"
                              onClick={() => handleIconClick(item._id)}
                            ></i>
                          </div>
                          <div className="time-ago fs-6">
                            {new Date(item.createdAt).toLocaleString()}
                          </div>
                        </div>
                        {isInputVisible && commentId === item._id && (
                          <div className="d-flex w-100 my-3 gap-2">
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Comment..."
                              value={comment}
                              onChange={(e) => setComment(e.target.value)}
                            />
                            <button
                              onClick={addComment}
                              className="btn btn-secondary btn-sm"
                            >
                              Post
                            </button>
                          </div>
                        )}
                        {item.comments && item.comments.length > 0 && (
                          <div className="my-3">
                            <h5>Comments</h5>
                            {item.comments.map((comment, index) => {
                              const truncateComment = (comment) => {
                                const maxLength = 15;
                                return comment.length > maxLength
                                  ? comment.substring(0, maxLength) + "..."
                                  : comment;
                              };
                              return (
                                <p key={index} className="mb-1">
                                  {truncateComment(comment.comment)} :{" "}
                                  {comment.userid.name}
                                </p>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="col border-start py-4 px-4 bg-light">
            <div className="row">
              <div className="col">
                <div className="card p-3 -h-100 overflow-hidden text-white bg-white rounded-4 shadow-lg">
                  <div className="mb-2">
                    <div className="d-flex gap-2">
                      <img
                        src={`${ImgUrl}${authenticated.userid.image}`}
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                        }}
                        alt=""
                      />
                      <Popup
                        trigger={
                          <input
                            type="submit"
                            className="form-control rounded-pill px-4 btn btn-primary"
                            name="description"
                            value="Manage your profile"
                          />
                        }
                        modal
                        nested
                      >
                        {(close) => (
                          <div className="" style={{ borderRadius: "50%" }}>
                            <input
                              type="text"
                              className="form-control"
                              value={name}
                              placeholder="name"
                              onChange={(e) => setName(e.target.value)}
                            />
                            <input
                              type="email"
                              className="form-control"
                              value={email}
                              placeholder="email"
                              onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                              type="password"
                              className="form-control"
                              value={password}
                              placeholder="password"
                              onChange={(e) => setPassword(e.target.value)}
                            />
                            <input
                              type="text"
                              className="form-control"
                              value={dob}
                              placeholder="dob"
                              onChange={(e) => setDob(e.target.value)}
                            />
                            <input
                              type="text"
                              className="form-control"
                              value={gender}
                              placeholder="gender"
                              onChange={(e) => setGender(e.target.value)}
                            />
                            <input
                              type="file"
                              className="form-control"
                              placeholder="gender"
                              onChange={fileUpload}
                            />

                            <input
                              type="submit"
                              onClick={() =>
                                handleprofileupdate(
                                  name,
                                  email,
                                  password,
                                  dob,
                                  gender,
                                  dp
                                )
                              }
                              className="btn btn-success"
                            />
                            <div>
                              <button onClick={() => close()}>
                                <i className="fa-solid fa-x fa-danger"></i>
                              </button>
                            </div>
                          </div>
                        )}
                      </Popup>
                    </div>
                  </div>
                </div>
                <h5 className="mb-4 lh-1 fw-semibold mt-5">
                  <i className="fa-regular fa-pen-to-square me-2"></i>
                  Craft Your Perfect Post!
                </h5>
                <div className="card p-3 -h-100 overflow-hidden text-white bg-white rounded-4 shadow-lg">
                  <div className="mb-2">
                    <div className="d-flex gap-2">
                      <img
                        src={`${ImgUrl}${authenticated.userid.image}`}
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                        }}
                        alt=""
                      />
                      <input
                        onChange={(e) => setDescription(e.target.value)}
                        type="text"
                        className="form-control rounded-pill px-4"
                        name="description"
                        placeholder="What's on your mind"
                      />
                    </div>
                    <div className="d-flex mt-3 align-items-center justify-content-between">
                      <label
                        htmlFor="file-upload"
                        className="custom-file-upload text-dark"
                      >
                        <i className="fa-regular fa-image me-2"></i>
                        <span className="fs-6">Upload Image</span>
                      </label>
                      <input
                        id="file-upload"
                        onChange={(e) => fileUpload(e)}
                        type="file"
                        className="form-control"
                        name="image"
                        style={{ display: "none" }}
                      />
                      <button
                        type="button"
                        className="btn btn-primary -btn-sm px-4 rounded-pill"
                        onClick={addPost}
                      >
                        Post
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Post;
