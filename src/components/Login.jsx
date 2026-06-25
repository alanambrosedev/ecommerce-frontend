import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import Layout from "./common/Layout";
import { apiUrl } from "./common/Http";
import { toast } from "react-toastify";
import { AuthContext } from "./context/Auth";

const Login = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const res = await fetch(`${apiUrl}authenticate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok && result.status === 200) {
        const loginInfo = {
          token: result.token,
          id: result.id,
          name: result.name,
        };
        login(loginInfo);
        navigate("/account");
      } else {
        toast.error(result.message || "Invalid credentials.");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };
  return (
    <Layout>
      <div className="container">
        <div className="container d-flex justify-content-center py-5">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="card shadow border-0 login">
              <div className="card-body p-4">
                <h3 className="border-bottom pb-2 mb-3">Login</h3>

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

                <button className="btn btn-secondary w-100" type="submit">
                  Login
                </button>
                <div className="d-flex justify-content-center pt-4 pb-2">
                  Don't have an account? &nbsp;
                  <Link to="/account/register">Register</Link>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
