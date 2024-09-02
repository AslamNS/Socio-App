import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import ImgUrl from "./image";

function Post() {
  const [viewpost, setViewpost] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/post/viewpost")
      .then((res) => res.json())
      .then((result) => {
        setViewpost(result);
      });
  }, []);

  return (
    <>
      <div className="content">
        <div className="container-fluid pt-4 px-4">
          <div className="row g-4">
            <div className="col-sm-12 col-xl">
              <div className="bg-secondary rounded h-100 p-4">
                <h6 className="mb-4">Agent</h6>
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">Sl.No</th>
                      <th scope="col">User</th>
                      <th scope="col">Post description</th>
                      <th scope="col">Post image</th>
                      <th scope="col">Post report</th>
                    </tr>
                  </thead>
                  <tbody>
                    {viewpost.map((items, index) => (
                      <tr key={items._id}>
                        <td>{index + 1}</td>
                        <td>{items.userid.name}</td>
                        <td>
                          <img
                            src={`${ImgUrl}${items.image}`}
                            alt="user"
                            width="100"
                            height="100"
                          />
                        </td>
                        <td>{items.description}</td>
                        <td>{items.status}</td>
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

export default Post;
