import React, { useEffect, useState } from "react";
import Layout from "../../common/Layout";
import Sidebar from "../../common/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import { register } from "swiper/element";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { adminToken, apiUrl } from "../../common/Http";
const Create = () => {
  const [categories, setCategories] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      const res = await fetch(`${apiUrl}products`, {
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
        navigate("/admin/products");
      } else {
        toast.error(result.message || "Failed to add the brand.");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong.");
    }
  };
  const fetchCategories = async () => {
    const res = await fetch(`${apiUrl}categories`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${adminToken()}`,
      },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch categories");
    }
    const result = await res.json();
    setCategories(result.data);
  };
  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="d-flex justify-content-between mt-5 pb-3">
            <h4 className="h4 pb-0 mb-0">Products / Create</h4>
            <Link to="/admin/products" className="btn btn-primary">
              Back
            </Link>
          </div>
          <Sidebar />
          <div className="col-md-9">
            <form action="" onSubmit={handleSubmit(onSubmit)}>
              <div className="card shadow">
                <div className="card-body">
                  <div className="">
                    <label className="form-label">Title</label>
                    <input
                      type="text"
                      {...register("title", {
                        required: "The title field is required.",
                      })}
                      className={`form-control ${errors.title ? "is-invalid" : ""}`}
                      placeholder="Enter product name"
                    />
                    {errors.title && (
                      <p className="invalid-feedback">{errors.title.message}</p>
                    )}
                  </div>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label" htmlFor="">
                          Category
                        </label>
                        <select name="" id="" className="form-control">
                          <option value="">Select a Category</option>
                          {categories &&
                            categories.map((category) => {
                              return (
                                <option
                                  key={category - `${category.id}`}
                                  value={category.id}
                                >
                                  {category.name}
                                </option>
                              );
                            })}
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label" htmlFor="">
                          Brands
                        </label>
                        <select name="" id="" className="form-control">
                          <option value="">Select a Brand</option>
                        </select>
                      </div>
                    </div>
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
