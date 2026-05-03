import React, { useState } from "react";
import Layout from "../../common/Layout";
import Sidebar from "../../common/Sidebar";
import { useForm } from "react-hook-form";
import { adminToken, apiUrl } from "../../common/Http";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const Edit = () => {
  const params = useParams();
  const [brand, setBrand] = useState();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: async () => {
      try {
        const res = await fetch(`${apiUrl}brands/${params.id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: `Bearer ${adminToken()}`,
          },
        });
        const result = await res.json();
        if (res.ok && result.status == 200) {
          setBrand(result.data);
          reset({
            name: result.data.name,
            status: result.data.status,
          });
        }
      } catch (error) {
        toast.error(error.message || "Failed to load brand.");
      }
    },
  });
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      const res = await fetch(`${apiUrl}brands/${params.id}`, {
        method: "PUT",
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
        navigate("/admin/brands");
      } else {
        toast.error(result.message || "Failed to update brand.");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.", error);
    }
  };
  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="d-flex justify-content-between mt-5 pb-3">
            <h4 className="h4 pb-0 mb-0">Categories / Edit</h4>
            <Link to="/admin/brands">Back</Link>
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
              <button className="btn btn-primary mt-3">Update</button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Edit;
