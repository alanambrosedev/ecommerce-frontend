import React from "react";
import Layout from "./common/Layout";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { adminToken, apiUrl } from "./common/Http";

const Register = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await fetch(`${apiUrl}register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (res.status === 201) {
        toast.success(result.message);
        navigate("/account/login");
        return;
      }
      if (res.status === 422 && result.errors) {
        console.log(result.errors);
        Object.entries(result.errors).forEach(([field, messages]) => {
          setError(field, { message: messages[0] });
        });
        return;
      }
      toast.error(
        result.message || "An unexpected error occurred. Please try again.",
      );
    } catch (err) {
      toast.error("Network error. Could not connect to the server.");
    }
  };
  return (
    <Layout>
      <div className="container">
        <div className="container d-flex justify-content-center py-5">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="card shadow border-0 login">
              <div className="card-body p-4">
                <h3 className="border-bottom pb-2 mb-3">Register</h3>

                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    {...register("name", {
                      required: "The name field is required.",
                    })}
                    type="text"
                    className={`form-control ${errors.name ? "is-invalid" : ""}`}
                    placeholder="Enter your name"
                  />
                  {errors.name && (
                    <p className="invalid-feedback">{errors.name.message}</p>
                  )}
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    {...register("email", {
                      required: "The email field is required.",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    type="text"
                    className={`form-control ${errors.email ? "is-invalid" : ""}`}
                    placeholder="Enter your email"
                  />
                  {errors.email && (
                    <p className="invalid-feedback">{errors.email.message}</p>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    {...register("password", {
                      required: "The password field is required.",
                    })}
                    type="password"
                    className={`form-control ${
                      errors.password ? "is-invalid" : ""
                    }`}
                    placeholder="Enter your password"
                  />
                  {errors.password && (
                    <p className="invalid-feedback">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <button
                  className="btn btn-secondary w-100"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creating Account..." : "Register"}
                </button>
                <div className="d-flex justify-content-center pt-4 pb-2">
                  Already have an account? &nbsp;
                  <Link to="/account/login">Login</Link>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
