import React from "react";
import Layout from "../../common/Layout";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../../common/Sidebar";
import { register } from "swiper/element";
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
      const res = await fetch(`${apiUrl}brands`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${adminToken()}`,
        },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (res.ok && res.status == 200) {
        toast.success(result.message);
        navigate("/admin/brands");
      } else {
        toast.error(result.message || "Failed to add the brand.");
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
            <h4 className="h4">Create / Brands</h4>
            <Link className="btn btn-secondary">Back</Link>
          </div>
          <Sidebar />
          <div className="col-md-9">
            <form action="" onSubmit={handleSubmit(onSubmit)}>
              <div className="card shadow">
                <div className="card-body">
                  <div className="">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      {...register("name", {
                        required: "The name field is required.",
                      })}
                      className={`form-control ${errors.name ? "is-invalid" : ""}`}
                      placeholder="Enter brand name"
                    />
                    {errors.name && (
                      <p className="invalid-feedback">{errors.name.message}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="" className="form-label">
                      Status
                    </label>
                    <select
                      name=""
                      id=""
                      {...register("status", {
                        required: "The status field is required.",
                      })}
                      className={`form-control ${errors.status ? "is-invalid" : ""}`}
                    >
                      <option value="">Select an option</option>
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
