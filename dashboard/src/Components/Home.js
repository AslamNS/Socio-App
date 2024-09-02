import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import ImgUrl from "./image";

function Home() {
  const [viewpost, setViewpost] = useState([]);
  console.log(viewpost, "viewpost");

  useEffect(() => {
    fetch("http://localhost:4000/admin/viewreportedpost")
      .then((res) => res.json())
      .then((result) => {
        setViewpost(result);
        console.log(result, "result");
      });
  }, []);

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
  return (
    <>
      <Sidebar />
      <div className="content">
        <div className="container-fluid pt-4 px-4">
          <div className="row g-4">
            <div className="col-sm-12 col-xl">
              <div className="bg-secondary rounded h-100 p-4">
                <h6 className="mb-4">Reported Posts </h6>
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">Sl.No</th>
                      <th scope="col">User</th>
                      <th scope="col">Post description</th>
                      <th scope="col">Post image</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {viewpost.map((items, index) => (
                      <tr key={items._id}>
                        <td>{index + 1}</td>
                        <td>{items.userid.userid.name}</td>
                        <td>{items.description}</td>
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
                            onClick={() => handleDeletepost(items._id)}
                            className="btn btn-danger m-2"
                          >
                            Delete post
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

export default Home;
