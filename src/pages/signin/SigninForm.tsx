/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { API_ENDPOINT } from "../../config/constants";

type Inputs = {
  email: string;
  password: string;
};

const SigninForm: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await fetch(`${API_ENDPOINT}/users/sign_in`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Sign-in failed");
      } else {
        console.log("Sign-in successful");
        const responseData = await response.json();
        console.log(responseData);
        localStorage.setItem("authToken", responseData.auth_token);
        localStorage.setItem("userData", JSON.stringify(responseData.user));
        navigate("/");
        window.location.reload();
      }
    } catch (error: any) {
      console.error("Sign-in failed:", error);
      setErrorMessage("Sign-in failed. Please try again.");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="block text-gray-700 font-semibold mb-2 font-mono">
            Email:
          </label>
          <input
            {...register("email", {
              required: "Email is required",
            })}
            type="email"
            name="email"
            id="email"
            autoComplete="email"
            placeholder="Enter your email"
            className={`w-full border font-mono rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${
              errors.email ? "border-red-500" : ""
            }`}
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div>
          <label className="block text-gray-700 font-semibold mb-2 font-mono">
            Password:
          </label>
          <input
            {...register("password", { required: "Password is required" })}
            type="password"
            name="password"
            id="password"
            autoComplete="password"
            placeholder="Enter your password"
            className={`w-full border font-mono rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${
              errors.password ? "border-red-500" : ""
            }`}
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>
        <button
          type="submit"
          className="w-full font-mono bg-gray-700  hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-gray mt-4"
        >
          Sign In
        </button>
      </form>
      <p className="mt-8 font-mono text-black">
        Need an account?{" "}
        <Link
          to="/sign-up"
          className="text-blue-500 hover:text-blue-700 font-semibold"
        >
          Create an account
        </Link>
      </p>
      <p className="mt-5 font-mono mb-2">
        <Link
          to="/"
          className="text-blue-500 hover:text-blue-700 font-semibold"
        >
          Back to Home
        </Link>
      </p>

      {errorMessage && (
        <p className="text-red-500 font-semibold font-mono">{errorMessage}</p>
      )}
    </>
  );
};

export default SigninForm;
