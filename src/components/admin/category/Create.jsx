import React from "react";
import Layout from "../../common/Layout";
import Sidebar from "../../common/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { adminToken, apiUrl } from "../../common/Http";

const Create = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      const res = await fetch(`${apiUrl}categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${adminToken()}`,
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok && result.status === 200) {
        toast.success(result.message);
        navigate("/admin/categories");
      } else {
        toast.error(result.message || "Failed to add category.");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong. Please try again.");
    }
  };
  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="d-flex justify-content-between mt-5 pb-3">
            <h4 className="h4 pb-0 mb-0">Categories / Create</h4>
            <Link to="/admin/categories" className="btn btn-secondary">
              Back
            </Link>
          </div>
          <Sidebar />
          <div className="col-md-9">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="card shadow">
                <div className="card-body p-4">
                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Name
                    </label>
                    <input
                      {...register("name", {
                        required: "The name field is required.",
                      })}
                      type="name"
                      className={`form-control ${
                        errors.name ? "is-invalid" : ""
                      }`}
                      type="text"
                      className={`form-control ${errors.name ? "is-invalid" : ""}`}
                      placeholder="Enter Category name"
                    />
                    {errors.name && (
                      <p className="invalid-feedback">{errors.name.message}</p>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Status
                    </label>
                    <select
                      name=""
                      id=""
                      className="form-control"
                      {...register("status", {
                        required: "The status field is required.",
                      })}
                      className={`form-control ${
                        errors.status ? "is-invalid" : ""
                      }`}
                    >
                      <option value="">Select a Status</option>
                      <option value="1">Active</option>
                      <option value="0">Inactive</option>
                    </select>
                    {errors.status && (
                      <p className="invalid-feedback">
                        {errors.status.message}
                      </p>
                    )}
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
