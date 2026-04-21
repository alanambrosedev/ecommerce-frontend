import React from "react";
import Layout from "../../common/Layout";
import Sidebar from "../../common/Sidebar";
import { Link } from "react-router-dom";

const Create = () => {
  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="d-flex justify-content-between mt-5 pb-3">
            <h4 className="h4 pb-0 mb-0">Categories / Create</h4>
            <Link to="/admin/categories">Back</Link>
          </div>
          <Sidebar />
          <div className="col-md-9">
            <form action="">
              <div className="card shadow">
                <div className="card-body p-4">
                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Name"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Status
                    </label>
                    <select name="" id="" className="form-control">
                      <option value="">Select a Status</option>
                      <option value="1">Active</option>
                      <option value="0">InActive</option>
                    </select>
                  </div>
                </div>
              </div>
              <button className="btn btn-primary mt-3">Create</button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Create;
