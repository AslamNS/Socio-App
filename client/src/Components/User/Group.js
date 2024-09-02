import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";

function Group() {
  const navigate = useNavigate();

  const [authenticated, setAuthenticated] = useState(
    JSON.parse(localStorage.getItem("userdata"))
  );
  const [members, setMembers] = useState([]);
  const [image, setImage] = useState([]);
  const [communityimage, setCommunityimage] = useState([]);
  const [groupname, setGroupname] = useState("");
  const [communityname, setCommunityname] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/group/showusers")
      .then((res) => res.json())
      .then((result) => {
        setMembers(result);
        console.log(result, "result");
      });
  }, []);

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

  const handleMemberSelection = (e, memberId) => {
    if (e.target.checked) {
      setSelectedMembers([...selectedMembers, memberId]);
    } else {
      setSelectedMembers(selectedMembers.filter((id) => id !== memberId));
    }
  };
  const handleCommunitySelection = (e, memberId) => {
    if (e.target.checked) {
      setSelectedMembers([...selectedMembers, memberId]);
    } else {
      setSelectedMembers(selectedMembers.filter((id) => id !== memberId));
    }
  };

  const handleSubmit = () => {
    const data = {
      admin: authenticated._id,
      groupname: groupname,
      members: selectedMembers,
      image: image,
      is_admin: true,
    };
    fetch("http://127.0.0.1:4000/group/create", {
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
        setGroupname("");
        setSelectedMembers([]);
        navigate("/groupchat");
      });
  };
  const handleCommunity = () => {
    const data = {
      admin: authenticated._id,
      name: communityname,
      members: selectedMembers,
      image: communityimage,
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
        setGroupname("");
        setSelectedMembers([]);
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
                      Create new group
                    </h4>
                  </div>
                </div>
                <div className="card-body text-center">
                  <input
                    type="text"
                    name="groupname"
                    className="form-control my-2"
                    placeholder="Enter the group name"
                    value={groupname}
                    onChange={(e) => setGroupname(e.target.value)}
                  />
                  <input
                    type="file"
                    name="groupname"
                    className="form-control my-2"
                    onChange={(e) => fileUpload(e, setImage)}
                  />

                  <div
                    className="bg-secondary px-4"
                    style={{ borderRadius: "10px" }}
                  >
                    <table>
                      <tbody>
                        {members.map((item, index) => {
                          if (authenticated._id !== item._id) {
                            return (
                              <tr key={item._id}>
                                <td className="py-1 ">
                                  <input
                                    type="checkbox"
                                    value={item._id}
                                    className="form-check-input"
                                    onChange={(e) =>
                                      handleMemberSelection(e, item._id)
                                    }
                                    name="members"
                                  />
                                </td>
                                <td className="text-white d-flex align-items-center p-2">
                                  &nbsp;&nbsp;{item.userid.name}
                                  <span
                                    className="badge-number "
                                    style={{
                                      display: "inline-flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                      width: "20px",
                                      height: "20px",
                                      borderRadius: "50%",
                                      backgroundColor: "green",
                                      color: "white",
                                      fontSize: "12px",
                                    }}
                                  >
                                    {index + 1}
                                  </span>
                                </td>
                              </tr>
                            );
                          } else {
                            return null;
                          }
                        })}
                      </tbody>
                    </table>
                  </div>

                  <button
                    type="button"
                    className="btn btn-primary btn-rounded mt-2 w-100 mt-4 my-4"
                    onClick={handleSubmit}
                  >
                    Create Group
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Group;
