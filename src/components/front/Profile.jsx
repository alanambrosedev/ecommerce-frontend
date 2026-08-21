import React, { useContext } from "react";
import Layout from "../common/Layout";
import UserSidebar from "../common/UserSidebar";
import { AuthContext } from "../context/Auth";

const Profile = () => {
  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="d-flex justify-content-between mt-5 pb-3">
            <h4 className="h4 pb-0 mb-0"> My Account</h4>
          </div>
          <UserSidebar />
          <div className="col-md-9">
            <div className="card shadow">
              <div className="card-body p-4">
                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter name"
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter email"
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">
                    Address
                  </label>
                  <textarea
                    type="text"
                    className="form-control"
                    placeholder="Enter address"
                  />
                </div>
                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label htmlFor="phone" className="form-label">
                      Phone
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter phone"
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label htmlFor="city" className="form-label">
                      City
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter city"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="mb-3 col-md-6">
                    <label htmlFor="state" className="form-label">
                      State
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter state"
                    />
                  </div>
                  <div className="mb-3 col-md-6">
                    <label htmlFor="zip" className="form-label">
                      Zip
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter zip"
                    />
                  </div>
                </div>
              </div>
            </div>
            <button className="btn btn-primary my-4 mb-5">Update</button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
