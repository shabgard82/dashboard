import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    setApiError("");

    try {
      const response = await fetch("https://mock.arianalabs.io/api/auth/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: data.username,
          password: data.password,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Login failed");
      }

      console.log("Login successful:", result);

      localStorage.setItem("token", result.token);
      navigate("/dashboard");
    } catch (error) {
      setApiError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm bg-white h-[504px] rounded-lg shadow p-6 border border-[#E2E8F0]">
        <div className="flex justify-center mb-4">
          <img
            alt="ariana-logo"
            width="248px"
            height="64px"
            src={"../../public/assets/ariana-logo.png"}
          />
        </div>
        <h2 className="text-2xl font-bold text-black my-2">Login</h2>
        <p className="text-sm  text-[#64748B] mt-1 mb-6">
          Enter your username and password to login to your account.
        </p>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label
              className={`block text-sm font-medium ${
                errors.username ? "text-[#DC2626]" : "text-black"
              }`}
            >
              Username
            </label>
            <input
              {...register("username", { required: "Username is required" })}
              type="text"
              placeholder="Please enter your username"
              className="mt-1 w-full px-3 py-2 border border-[#E2E8F0] rounded-md shadow-sm focus:outline-none "
            />
            {errors.username && (
              <p className="text-sm text-[#DC2626] mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          <div>
            <label
              className={`block text-sm font-medium ${
                errors.password ? "text-[#DC2626]" : "text-black"
              }`}
            >
              Password
            </label>
            <input
              {...register("password", { required: "Password is required" })}
              type="password"
              placeholder="Please enter your password"
              className="mt-1 w-full px-3 py-2 border border-[#E2E8F0] rounded-md shadow-sm focus:outline-none"
            />
            {errors.password && (
              <p className="text-sm  text-[#DC2626]  mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          {apiError && (
            <p className="text-sm text-red-600 text-center">{apiError}</p>
          )}

          <button
            type="submit"
            className="w-full bg-[#0F172A] text-white py-2 rounded-md hover:bg-gray-900 transition"
          >
            Login
          </button>
        </form>

        <p className="text-sm text-center text-black mt-4">
          Don’t have an account? {""}
          <a href="/register" className="text-black underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
