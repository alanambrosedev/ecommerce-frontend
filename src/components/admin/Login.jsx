import React from "react";
import Layout from "../common/Layout";
import { useForm } from "react-hook-form";
import { apiUrl } from "../common/Http";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await fetch(`${apiUrl}admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok && result.status === 200) {
        const adminInfo = {
          token: result.token,
          id: result.id,
          name: result.name,
        };
        // ✅ store directly
        localStorage.setItem("adminInfo", JSON.stringify(adminInfo));
        navigate("/admin/dashboard");
      } else {
        toast.error(result.message || "Invalid credentials.");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <Layout>
      <div className="container d-flex justify-content-center py-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="card shadow border-0 login">
            <div className="card-body p-4">
              <h3>Admin Login</h3>

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
                  <p className="invalid-feedback">{errors.password.message}</p>
                )}
              </div>

              <button className="btn btn-secondary" type="submit">
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
