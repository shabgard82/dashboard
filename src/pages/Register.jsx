import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password");
  const navigate = useNavigate();
  const [avatarFile, setAvatarFile] = useState(null);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("first_name", data.firstName);
    formData.append("last_name", data.lastName);
    formData.append("username", data.username);
    formData.append("password", data.password);
    formData.append("confirm_password", data.confirmPassword);
    if (avatarFile) formData.append("avatar", avatarFile);

    try {
      const res = await fetch("https://mock.arianalabs.io/api/register/", {
        method: "POST",
        body: formData,
      });

      const result = await res.json();

      if (res.ok) {
        localStorage.setItem("token", result.token);
        navigate("/dashboard");
      } else {
        alert("Registration failed");
        console.error(result);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while registering.");
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm bg-white rounded-lg shadow p-6 border border-[#E2E8F0]">
        <h2 className="text-2xl font-bold text-black mb-1">Sign Up</h2>
        <p className="text-sm text-[#64748B] mb-6">
          Enter your information to create an account.
        </p>

        <div className="flex items-center justify-between mb-4 px-2 border-2 border-[#E2E8F0] rounded-md py-2">
          <img
            src={
              avatarFile
                ? URL.createObjectURL(avatarFile)
                : "/assets/avatar.png"
            }
            alt="avatar"
            className="rounded-full object-cover w-12 h-12"
          />

          <label className="text-sm px-3 py-1 border-2 border-[#E2E8F0] rounded-md">
            Upload +
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />
          </label>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label
              className={`block text-sm font-medium ${
                errors.firstName ? "text-[#DC2626]" : "text-black"
              }`}
            >
              First name
            </label>
            <input
              type="text"
              {...register("firstName", { required: "First name is required" })}
              placeholder="Please enter your first name"
              className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm outline-none"
            />
            {errors.firstName && (
              <p className="text-sm text-[#DC2626] mt-1">
                {errors.firstName.message}
              </p>
            )}
          </div>

          <div>
            <label
              className={`block text-sm font-medium ${
                errors.lastName ? "text-[#DC2626]" : "text-black"
              }`}
            >
              Last name
            </label>
            <input
              type="text"
              {...register("lastName", { required: "Last name is required" })}
              placeholder="Please enter your last name"
              className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm outline-none"
            />
            {errors.lastName && (
              <p className="text-sm text-[#DC2626] mt-1">
                {errors.lastName.message}
              </p>
            )}
          </div>

          <div>
            <label
              className={`block text-sm font-medium ${
                errors.username ? "text-[#DC2626]" : "text-black"
              }`}
            >
              Username
            </label>
            <input
              type="text"
              {...register("username", { required: "Username is required" })}
              placeholder="Please enter username"
              className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm outline-none"
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
              type="password"
              {...register("password", { required: "Password is required" })}
              placeholder="Please enter password"
              className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm outline-none"
            />
            {errors.password && (
              <p className="text-sm text-[#DC2626] mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <label
              className={`block text-sm font-medium ${
                errors.confirmPassword ? "text-[#DC2626]" : "text-black"
              }`}
            >
              Confirm Password
            </label>
            <input
              type="password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              placeholder="Please re-enter your password"
              className="mt-1 w-full px-3 py-2 border rounded-md shadow-sm outline-none"
            />
            {errors.confirmPassword && (
              <p className="text-sm text-[#DC2626] mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-[#0F172A] text-white py-2 rounded-md hover:bg-gray-900 transition"
          >
            Register
          </button>
        </form>

        <p className="text-sm text-center text-black mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-black underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
