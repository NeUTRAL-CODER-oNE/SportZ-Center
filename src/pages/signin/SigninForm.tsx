/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useNavigate } from "react-router-dom";
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

        localStorage.setItem("authToken", responseData.token);
        // If successful, save the user info in localStorage
        localStorage.setItem("userData", JSON.stringify(responseData.user));
        navigate("/");
      }
    } catch (error: any) {
      console.error("Sign-in failed:", error);
    }
  };

  return (
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
          className={`w-full border font-mono rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${errors.email ? "border-red-500" : ""}`}
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
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
          className={`w-full border font-mono rounded-md py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 focus:shadow-outline-blue ${errors.password ? "border-red-500" : ""}`}
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}
      </div>
      <button
        type="submit"
        className="w-full font-mono bg-gray-700 font-mono hover:bg-gray-800 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline-gray mt-4"
      >
        Sign In
      </button>
    </form>
  );
};

export default SigninForm;
