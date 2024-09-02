import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import ImgUrl from "./image";

function Users() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const [auth, setAuth] = useState(
    JSON.parse(localStorage.getItem("userdata"))
  );

  useEffect(() => {
    fetch("http://localhost:4000/friend/users")
      .then((res) => res.json())
      .then((result) => {
        const filteredUsers = result.filter((user) => user._id !== auth._id);
        setUsers(filteredUsers);
        console.log(filteredUsers, "all users excluding authenticated user");
      });
  }, [auth]);

  const deleteUser = (id) => {
    fetch("http://localhost:4000/admin/blockuser", {
      method: "post",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if (result.error) {
          alert(result.error);
        } else {
          window.location.reload();
        }
      });
  };
  const filteredusers = users.filter((item) => {
    const propertyMatches = item.userid.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return propertyMatches;
  });
  return (
    <>
      <Sidebar />
      <div className="content">
        <div className="container-fluid pt-4 px-4">
          <div className="row g-4">
            <div className="col-sm-12 col-xl">
              <div className="bg-secondary rounded h-100 p-4">
                <h6 className="mb-4">Users</h6>
                <div className="d-flex align-items-center ms-4 mb-4xx">
                  <input
                    type="search"
                    className="form-control mb-3"
                    placeholder="Search for user name "
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">Sl.No</th>
                      <th scope="col">User</th>
                      <th scope="col">Image</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredusers.map((items, index) => (
                      <tr key={items._id}>
                        <td>{index + 1}</td>
                        <td>{items.userid.name}</td>
                        <td>
                          <img
                            src={`${ImgUrl}${items.userid.image}`}
                            alt="user"
                            width="100"
                            height="100"
                          />
                        </td>
                        <td>
                          <button
                            onClick={() => deleteUser(items._id)}
                            className="btn btn-danger m-2"
                            disabled={items.usertype === "2"}
                          >
                            {items.usertype === "2" ? "Blocked" : "Block"}
                          </button>
                          <Link
                            to="/profile"
                            state={{ id: items._id }}
                            className="btn btn-warning m-2"
                          >
                            View
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Users;
