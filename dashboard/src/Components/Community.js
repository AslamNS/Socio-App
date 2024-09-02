import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import ImgUrl from "./image";

function Community() {
  const [community, setCommunity] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/admin/viewcommunity")
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "data community");
        setCommunity(data);
      })
      .catch((error) => {
        console.error("Error fetching community data:", error);
      });
  }, []);

  const handleApprove = (id) => {
    let param = {
      id: id,
    };
    fetch("http://localhost:4000/admin/approvecommunity", {
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
        if (result.error) {
          alert(result.error);
        } else {
          window.location.reload();
        }
      })
      .catch((error) => {
        console.error("Error approving community:", error);
      });
  };

  return (
    <>
      <Sidebar />
      <div className="content">
        <div className="container-fluid pt-4 px-4">
          <div className="row g-4">
            <div className="col-sm-12 col-xl">
              <div className="bg-secondary rounded h-100 p-4">
                <h6 className="mb-4">New Communities </h6>
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">Sl.No</th>
                      <th scope="col">Community</th>
                      <th scope="col">Image</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {community.map((items, index) => (
                      <tr key={items._id}>
                        <td>{index + 1}</td>
                        <td>{items.communityname}</td>
                        <td>
                          <img
                            src={`${ImgUrl}${items.image}`}
                            alt="user"
                            width="100"
                            height="100"
                          />
                        </td>
                        <td>
                          <button
                            onClick={() => handleApprove(items._id)}
                            className="btn btn-danger m-2"
                          >
                            Approve
                          </button>
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

export default Community;
