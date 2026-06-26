import React, { useContext } from "react";
import Layout from "./common/Layout";
import UserSidebar from "./common/UserSidebar";
import { AuthContext } from "./context/Auth";

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
              <div className="card-body p-4"></div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
