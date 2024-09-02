import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import ImgUrl from "./image";

function Reports() {
  const [community, setCommunity] = useState([]);
  useEffect(() => {
    fetch("http://localhost:4000/community/reportedcontent")
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "datafdgsvfdvu ");
        setCommunity(data);
      });
  }, []);

  const handleDelete = (id) => {
    let param = {
      id: id,
      status: 0,
    };
    fetch("http://localhost:4000/community/deletechat", {
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
  return (
    <>
      <Sidebar />
      <div className="content">
        <div className="container-fluid pt-4 px-4">
          <div className="row g-4">
            <div className="col-sm-12 col-xl">
              <div className="bg-secondary rounded h-100 p-4">
                <h6 className="mb-4">Reported Communities Content</h6>
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">Sl.No</th>
                      <th scope="col">Text</th>
                      <th scope="col">Image</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {community.map((items, index) => (
                      <tr key={items._id}>
                        <td>{index + 1}</td>
                        <td class>
                          {items.message.length == 0
                            ? "No Text"
                            : items.message}
                        </td>
                        <td>
                          <img
                            src={`${ImgUrl}${items.image}`}
                            style={{ width: "100px", height: "100px" }}
                          />
                        </td>

                        <td>
                          <button
                            onClick={() => handleDelete(items._id)}
                            className="btn btn-danger m-2"
                          >
                            delete
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

export default Reports;
