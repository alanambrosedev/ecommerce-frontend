import React, { useContext, useEffect, useState } from "react";
import Layout from "../common/Layout";
import UserSidebar from "../common/UserSidebar";
import { AuthContext } from "../context/Auth";
import { useForm } from "react-hook-form";
import { apiUrl, userToken } from "../common/Http";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loader from "../common/Loader";

const Profile = () => {
  const [profile, setProfile] = useState([]);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: async () => {
      try {
        setLoading(true);
        const res = await fetch(`${apiUrl}get-profile-details`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${userToken()}`,
          },
        });

        const result = await res.json();
        if (res.ok && result.status == 200) {
          setProfile(res.data);
          reset({
            name: result.data.name,
            email: result.data.email,
            address: result.data.address,
            mobile: result.data.mobile,
            city: result.data.city,
            zip: result.data.zip,
            state: result.data.state,
          });
          setLoading(false);
        } else {
          toast.error(result.message || "Failed to load user details.");
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong. Please try again.");
      }
    },
  });

  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      const res = await fetch(`${apiUrl}user-details`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${userToken()}`,
        },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (res.ok && result.status === 200) {
        toast.success(result.message);
        navigate("/account");
      } else {
        toast.error(result.message || "Failed to update account.");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    }
  };

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="d-flex justify-content-between mt-5 pb-3">
            <h4 className="h4 pb-0 mb-0"> My Account</h4>
          </div>
          <UserSidebar />
          <div className="col-md-9">
            {loading === true && <Loader />}
            {loading === false && (
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="card shadow">
                  <div className="card-body p-4">
                    <div className="row">
                      <div className="mb-3 col-md-6">
                        <label htmlFor="name" className="form-label">
                          Name
                        </label>
                        <input
                          {...register("name", {
                            required: "The name is required.",
                          })}
                          type="text"
                          className={`form-control ${errors.name ? "is-invalid" : ""}`}
                          placeholder="Enter name"
                        />
                        {errors.name && (
                          <p className="invalid-feedback">
                            {errors.name.message}
                          </p>
                        )}
                      </div>
                      <div className="mb-3 col-md-6">
                        <label htmlFor="email" className="form-label">
                          Email
                        </label>
                        <input
                          {...register("email", {
                            required: "The email is required.",
                          })}
                          type="text"
                          className={`form-control ${errors.email ? "is-invalid" : ""}`}
                          placeholder="Enter email"
                        />
                        {errors.email && (
                          <p className="invalid-feedback">
                            {errors.email.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="address" className="form-label">
                        Address
                      </label>
                      <textarea
                        {...register("address", {
                          required: "The address is required.",
                        })}
                        type="text"
                        className={`form-control ${errors.address ? "is-invalid" : ""}`}
                        placeholder="Enter address"
                      />
                      {errors.address && (
                        <p className="invalid-feedback">
                          {errors.address.message}
                        </p>
                      )}
                    </div>
                    <div className="row">
                      <div className="mb-3 col-md-6">
                        <label htmlFor="phone" className="form-label">
                          Phone
                        </label>
                        <input
                          {...register("mobile", {
                            required: "The phone is required.",
                          })}
                          type="text"
                          id="mobile"
                          className={`form-control ${errors.mobile ? "is-invalid" : ""}`}
                          placeholder="Enter phone"
                        />
                        {errors.mobile && (
                          <p className="invalid-feedback">
                            {errors.mobile.message}
                          </p>
                        )}
                      </div>
                      <div className="mb-3 col-md-6">
                        <label htmlFor="city" className="form-label">
                          City
                        </label>
                        <input
                          {...register("city", {
                            required: "The city is required.",
                          })}
                          type="text"
                          className={`form-control ${errors.city ? "is-invalid" : ""}`}
                          placeholder="Enter city"
                        />
                        {errors.city && (
                          <p className="invalid-feedback">
                            {errors.city.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="row">
                      <div className="mb-3 col-md-6">
                        <label htmlFor="state" className="form-label">
                          State
                        </label>
                        <input
                          {...register("state", {
                            required: "The state is required.",
                          })}
                          type="text"
                          className={`form-control ${errors.state ? "is-invalid" : ""}`}
                          placeholder="Enter state"
                        />
                        {errors.state && (
                          <p className="invalid-feedback">
                            {errors.state.message}
                          </p>
                        )}
                      </div>
                      <div className="mb-3 col-md-6">
                        <label htmlFor="zip" className="form-label">
                          Zip
                        </label>
                        <input
                          {...register("zip", {
                            required: "The zip is required.",
                          })}
                          type="text"
                          className={`form-control ${errors.zip ? "is-invalid" : ""}`}
                          placeholder="Enter zip"
                        />
                        {errors.zip && (
                          <p className="invalid-feedback">
                            {errors.zip.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <button className="btn btn-primary my-4 mb-5">Update</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
