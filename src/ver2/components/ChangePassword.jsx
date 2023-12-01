import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router";
const ChangePassword = () => {
  const userInfo = JSON.parse(window.localStorage.getItem("user-info"));
  const token = userInfo && userInfo.token;
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();
  const user = JSON.parse(window.localStorage.getItem("user-info"));
  const server = "https://metatechvn.store";
  const onSubmit = async (data) => {
    if (data.newpassword == data.oldpassword)
      return toast.error(
        "The new password cannot be the same as the old password"
      );
    try {
      const res = await fetchChangePassword(
        data.oldpassword,
        data.newpassword,
        user.user_name,
        server,
        user.id_user
      );
      console.log(res);
      if (res.data.ketqua) return toast.error(res.data.ketqua);
      await toast.success("Change password was successful");
      // window.location.reload();
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  const fetchChangePassword = async (
    oldPassword,
    newPassword,
    email_or_username,
    server,
    userId,
    token
  ) => {
    let data = new FormData();
    data.append("oldPassword", oldPassword);
    data.append("newPassword", newPassword);
    data.append("email_or_username", email_or_username);
    const changePassword = async (server, userId, data, token) => {
      try {
        const res = await axios.post(
          `${server}/changepassword/${userId}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );
        return res;
      } catch (error) {
        console.error(error);
        return error;
      }
    };
    try {
      const res = await changePassword(server, userId, data, token);
      console.log(res);
      // Xử lý kết quả response ở đây
    } catch (error) {
      console.error(error);
      // Xử lý lỗi ở đây
    }
  }
    

  return (
    <div>
      <h1 className="text-4xl text-center py-4">Change Password</h1>
      <div className="flex items-center justify-center p-12 max-lg:py-4">
        <div className="mx-auto w-full max-w-[550px]">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-5">
              <label
                htmlFor="name"
                className="mb-3 block text-3xl font-medium text-[#07074D]"
              >
                New Password
              </label>
              <Controller
                name="newpassword"
                control={control}
                defaultValue=""
                rules={{
                  required: "New password is required",
                  minLength: {
                    value: 8,
                    message: "New password must be at least 8 characters long",
                  },
                  pattern: {
                    value: /^(?!\s*$).+/,
                    message: "New password cannot contain whitespace",
                  },
                }}
                render={({ field }) => (
                  <div>
                    <input
                      type="password"
                      {...field}
                      placeholder="New Password"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-3xl font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                    {errors.newpassword && (
                      <span className="text-red-600 text-2xl">
                        {errors.newpassword.message}
                      </span>
                    )}
                  </div>
                )}
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="name"
                className="mb-3 block text-3xl font-medium text-[#07074D]"
              >
                Confirm New Password
              </label>
              <Controller
                name="confirmnewpassword"
                control={control}
                defaultValue=""
                rules={{
                  required: "Confirm new password is required",
                  minLength: {
                    value: 8,
                    message:
                      "Confirm new password must be at least 8 characters long",
                  },
                  pattern: {
                    value: /^(?!\s*$).+/,
                    message: "Confirm new password cannot contain whitespace",
                  },
                  validate: (value) => {
                    const newpassword = control._formValues.newpassword;
                    return value === newpassword || "Passwords do not match";
                  },
                }}
                render={({ field }) => (
                  <div>
                    <input
                      type="password"
                      {...field}
                      placeholder="Confirm New Password"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-3xl font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                    {errors.confirmnewpassword && (
                      <span className="text-red-600 text-2xl">
                        {errors.confirmnewpassword.message}
                      </span>
                    )}
                  </div>
                )}
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="name"
                className="mb-3 block text-3xl font-medium text-[#07074D]"
              >
                Old Password
              </label>
              <Controller
                name="oldpassword"
                control={control}
                defaultValue=""
                rules={{
                  required: "Old password is required",
                  minLength: {
                    value: 8,
                    message: "Old password must be at least 8 characters long",
                  },
                }}
                render={({ field }) => (
                  <div>
                    <input
                      type="password"
                      {...field}
                      placeholder="Old Password"
                      className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-3xl font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    />
                    {errors.oldpassword && (
                      <span className="text-red-600 text-2xl">
                        {errors.oldpassword.message}
                      </span>
                    )}
                  </div>
                )}
              />
            </div>
            <div>
              <button className="hover:shadow-form rounded-md hover:bg-pink-600 bg-pink-500 py-3 px-8 text-3xl font-medium text-white outline-none">
                Change Password
              </button>
            </div>
          </form>
          {/* <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label>Old Password</label>
              <Controller
                name="oldpassword"
                control={control}
                rules={{
                  required: "Old password is required",
                  minLength: {
                    value: 8,
                    message: "Old password must be at least 8 characters long",
                  },
                }}
                render={({ field }) => (
                  <div>
                    <input type="password" {...field} />
                    {errors.oldpassword && (
                      <span>{errors.oldpassword.message}</span>
                    )}
                  </div>
                )}
              />
            </div>
            <div>
              <label>New Password</label>
              <Controller
                name="newpassword"
                control={control}
                rules={{
                  required: "New password is required",
                  minLength: {
                    value: 8,
                    message: "New password must be at least 8 characters long",
                  },
                  pattern: {
                    value: /^(?!\s*$).+/,
                    message: "New password cannot contain whitespace",
                  },
                }}
                render={({ field }) => (
                  <div>
                    <input type="password" {...field} />
                    {errors.newpassword && (
                      <span>{errors.newpassword.message}</span>
                    )}
                  </div>
                )}
              />
            </div>
            <div>
              <label>Confirm New Password</label>
              <Controller
                name="confirmnewpassword"
                control={control}
                rules={{
                  required: "Confirm new password is required",
                  minLength: {
                    value: 8,
                    message:
                      "Confirm new password must be at least 8 characters long",
                  },
                  pattern: {
                    value: /^(?!\s*$).+/,
                    message: "Confirm new password cannot contain whitespace",
                  },
                  validate: (value) => {
                    const newpassword = control.getValues("newpassword");
                    return value === newpassword || "Passwords do not match";
                  },
                }}
                render={({ field }) => (
                  <div>
                    <input type="password" {...field} />
                    {errors.confirmnewpassword && (
                      <span>{errors.confirmnewpassword.message}</span>
                    )}
                  </div>
                )}
              />
            </div>
            <button type="submit">Submit</button>
          </form> */}
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
