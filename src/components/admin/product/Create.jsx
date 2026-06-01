import React, { useEffect, useState, useRef, useMemo } from "react";
import Layout from "../../common/Layout";
import Sidebar from "../../common/Sidebar";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { adminToken, apiUrl } from "../../common/Http";
import JoditEditor from "jodit-react";

const Create = ({ placeholder }) => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: placeholder || "",
    }),
    [placeholder],
  );

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    const formData = { ...data, description: content, gallery: gallery };

    const res = await fetch(`${apiUrl}products`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${adminToken()}`,
      },
      body: JSON.stringify(formData),
    });
    const result = await res.json();
    if (res.ok && res.status == 200) {
      toast.success(result.message);
      navigate("/admin/products");
    } else {
      const formErrors = result.errors;
      Object.keys(formErrors).forEach((field) => {
        setError(field, { message: formErrors[field][0] });
      });
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
  const fetchBrands = async () => {
    const res = await fetch(`${apiUrl}brands`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${adminToken()}`,
      },
    });
    if (!res.ok) {
      throw new Error("Failed to fetch brands");
    }
    const result = await res.json();
    setBrands(result.data);
  };
  const handleFile = async (e) => {
    const formData = new FormData();
    const file = e.target.files[0];

    if (!file) return;

    formData.append("image", file);
    try {
      const res = await fetch(`${apiUrl}temp-images`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${adminToken()}`,
        },
        body: formData,
      });
      if (!res.ok) {
        throw new Error("Failed to upload image");
      }
      const result = await res.json();
      console.log("Upload response:", result);
      if (result.image && result.image.image_url) {
        setGallery([...gallery, result.image.id]);
        setGalleryImages([...galleryImages, result.image.image_url]);
        toast.success("Image uploaded successfully");
      } else {
        console.error("Unexpected response structure:", result);
        toast.error("Invalid response structure from server");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error uploading image");
    }
  };
  const handleImageDelete = (image) => {
    const newGallery = galleryImages.filter((gallery) => gallery != image);
    setGalleryImages(newGallery);
  };
  useEffect(() => {
    fetchCategories();
    fetchBrands();
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
                  <div className="mb-3">
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
                        <select
                          name=""
                          id=""
                          {...register("category", {
                            required: "The category field is required.",
                          })}
                          className={`form-control ${errors.category ? "is-invalid" : ""}`}
                        >
                          <option value="">Select a Category</option>
                          {categories &&
                            categories.map((category) => {
                              return (
                                <option key={category.id} value={category.id}>
                                  {category.name}
                                </option>
                              );
                            })}
                        </select>
                        {errors.category && (
                          <p className="invalid-feedback">
                            {errors.category.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label" htmlFor="">
                          Brands
                        </label>
                        <select
                          name=""
                          id=""
                          {...register("brand")}
                          className="form-control"
                        >
                          <option value="">Select a Brand</option>
                          {brands &&
                            brands.map((brand) => {
                              return (
                                <option key={brand.id} value={brand.id}>
                                  {brand.name}
                                </option>
                              );
                            })}
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Short Description
                    </label>
                    <textarea
                      {...register("short_description")}
                      className="form-control"
                      placeholder="Short Description"
                    ></textarea>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Description
                    </label>
                    <JoditEditor
                      ref={editor}
                      value={content}
                      config={config}
                      tabIndex={1}
                      onBlur={(newContent) => setContent(newContent)}
                      onChange={(newContent) => setContent(newContent)}
                    />
                  </div>
                  <h3 className="py-3 border-bottom mb-3">Pricing</h3>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="" className="form-label">
                          Price
                        </label>
                        <input
                          type="text"
                          {...register("price", {
                            required: "The price field is required.",
                          })}
                          className={`form-control ${errors.price ? "is-invalid" : ""}`}
                          placeholder="Price"
                        />
                        {errors.price && (
                          <p className="invalid-feedback">
                            {errors.price.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="" className="form-label">
                          Discounted Price
                        </label>
                        <input
                          type="text"
                          placeholder="Discounted Price"
                          className="form-control"
                          {...register("compare_price")}
                        />
                      </div>
                    </div>
                  </div>
                  <h3 className="py-3 border-bottom mb-3">Inventory</h3>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="" className="form-label">
                          SKU
                        </label>
                        <input
                          type="text"
                          {...register("sku", {
                            required: "The sku field is required.",
                          })}
                          className={`form-control ${errors.sku ? "is-invalid" : ""}`}
                          placeholder="Sku"
                        />
                        {errors.sku && (
                          <p className="invalid-feedback">
                            {errors.sku.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="" className="form-label">
                          Bar Code
                        </label>
                        <input
                          type="text"
                          placeholder="Bar Code"
                          className="form-control"
                          {...register("bar_code")}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="" className="form-label">
                          QTY
                        </label>
                        <input
                          type="text"
                          placeholder="Quantity"
                          className="form-control"
                          {...register("qty")}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
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
                    <div className="mb-3">
                      <label htmlFor="" className="form-label">
                        Featured
                      </label>
                      <select
                        name=""
                        id=""
                        {...register("is_featured", {
                          required: "The featured field is required.",
                        })}
                        className={`form-control ${errors.is_featured ? "is-invalid" : ""}`}
                      >
                        <option value="">Select an option</option>
                        <option value="1">Active</option>
                        <option value="0">Inactive</option>
                      </select>
                      {errors.is_featured && (
                        <p className="invalid-feedback">
                          {errors.is_featured.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <h3 className="py-3 border-bottom mb-3">Gallery</h3>
                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Image
                    </label>
                    <input
                      type="file"
                      {...register("image")}
                      onChange={handleFile}
                      className="form-control"
                    />
                    <div className="mb-3">
                      <div className="row">
                        {galleryImages &&
                          galleryImages.map((image, index) => {
                            return image ? (
                              <div className="col-md-3" key={index}>
                                <div className="card shadow">
                                  <img
                                    src={image}
                                    alt="preview"
                                    className="w-100"
                                  />
                                </div>
                                <button
                                  className="btn btn-danger mt-3 w-100"
                                  onClick={() => handleImageDelete(image)}
                                >
                                  Delete
                                </button>
                              </div>
                            ) : null;
                          })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <button className="btn btn-primary mt-3 mb-5">Create</button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Create;
