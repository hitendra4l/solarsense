import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import ProfilePageLayout from "../../components/ProfilePageLayout";
import { images } from "../../constants";
import {
  useUpdateProfilePicture,
  useUpdateUser,
} from "../../services/mutations/users";
import toast from "react-hot-toast";
import { useProfileData } from "../../services/queries/users";

const ProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo: user } = useSelector((state) => state.user);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [navigate, user]);

  const getUserQuery = useProfileData({ token: user?.token });
  const updateUserMutation = useUpdateUser(dispatch, getUserQuery);
  console.log("getUserQuery", getUserQuery.data);

  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors, dirtyFields, isDirty },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      name: getUserQuery.data?.name,
      email: getUserQuery.data?.email,
    },
  });

  // console.log(isDirty);

  const onSubmit = (data) => {
    console.log("form submitted");
    setEditMode(false);
    const changedData = {};

    for (const field in dirtyFields) {
      changedData[field] = data[field];
    }

    updateUserMutation.mutate({
      data: changedData,
      token: user?.token,
    });
  };

  const updateAvatarMutation = useUpdateProfilePicture(dispatch);

  const handleFileChange = (e) => {
    console.log("handle file change called");
    const file = e.target.files[0];
    if (file && file.size && file.size > 1 * 1024 * 1024) {
      toast.error("Max file size should be 1MB");
      return;
    }
    // setSelectedAvatar(file);
    const formData = new FormData();
    formData.append("profilePicture", file);
    const token = user?.token;
    updateAvatarMutation.mutate({ formData, token });
  };

  const deletePhoto = () => {
    const formData = new FormData();
    formData.append("profilePicture", null);
    const token = user?.token;

    updateAvatarMutation.mutate({ formData, token });
  };

  return (
    <ProfilePageLayout>
      <div className="container mx-auto">
        <div className="mt-16 mb-16 flex items-center gap-40">
          <label htmlFor="profilePicture" className="cursor-pointer grow">
            <img
              src={
                getUserQuery.data?.avatar
                  ? import.meta.env.VITE_UPLOAD_FOLDER_BASE_URL +
                    getUserQuery.data.avatar
                  : images.DefaultAvatar
              }
              className="rounded-full h-64 w-64 object-cover"
              alt=""
            />
            <input
              type="file"
              id="profilePicture"
              className="sr-only"
              onChange={handleFileChange}
            />
          </label>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-7"
          >
            <div className="flex flex-col gap-2 w-[900px]">
              <div className="flex gap-14">
                <label
                  className="text-xl w-[100px] font-semibold"
                  htmlFor="name"
                >
                  Name
                </label>
                {editMode ? (
                  <>
                    <input
                      className="text-lg w-[300px] px-2 border-2 border-dark-hard rounded-md"
                      type="text"
                      {...register("name", {
                        required: {
                          value: true,
                          message: "Name is required",
                        },
                      })}
                      id="name"
                      defaultValue={user?.name}
                    />
                    {errors.name?.message && (
                      <span className="text-red-800 text-xs">
                        {errors.name?.message}e
                      </span>
                    )}
                  </>
                ) : (
                  <p className="text-xl font-semibold">
                    {getUserQuery.isFetching
                      ? "Loading..."
                      : getUserQuery.data?.name}
                  </p>
                )}
              </div>
              <div className="flex gap-14">
                <label
                  className="text-xl w-[100px] font-semibold"
                  htmlFor="email"
                >
                  Email
                </label>
                {editMode ? (
                  <>
                    <input
                      className="text-lg w-[300px] px-2 border-2 border-dark-hard rounded-md"
                      type="email"
                      {...register("email", {
                        pattern: {
                          value:
                            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                          message: "Enter a valid email",
                        },
                        required: {
                          value: true,
                          message: "Email is required",
                        },
                      })}
                      id="email"
                      defaultValue={user?.email}
                    />
                    {errors.email?.message && (
                      <span className="text-red-800 text-xs">
                        {errors.email?.message}
                      </span>
                    )}
                  </>
                ) : (
                  <p className="text-xl font-semibold">
                    {getUserQuery.isFetching
                      ? "Loading..."
                      : getUserQuery.data?.email}
                  </p>
                )}
              </div>
              <div className="flex gap-14">
                <label
                  className="text-xl w-[100px] font-semibold"
                  htmlFor="password"
                >
                  Password
                </label>
                {editMode ? (
                  <>
                    <input
                      className="text-lg w-[300px] px-2 border-2 border-dark-hard rounded-md"
                      type="password"
                      {...register("password", {
                        minLength: {
                          value: isDirty ? 8 : 0,
                          message:
                            "Password length must be at least 8 character",
                        },
                      })}
                      id="password"
                    />
                    {errors.password?.message && (
                      <span className="text-red-800 text-xs">
                        {errors.password?.message}
                      </span>
                    )}
                  </>
                ) : (
                  <p className="text-xl font-semibold">********</p>
                )}
              </div>
            </div>
            <div className="flex gap-10 text-light-hard font-semibold text-xl">
              <button
                onClick={deletePhoto}
                className="outline-none"
                type="button"
              >
                Delete Photo
              </button>
              {editMode && (
                <button
                  className="outline-none disabled:opacity-[40%] disabled:cursor-not-allowed"
                  type="submit"
                  disabled={!isDirty}
                >
                  Update Profile
                </button>
              )}
              {editMode ? (
                <button
                  onClick={() => setEditMode(!editMode)}
                  className="outline-none"
                  type="button"
                >
                  Cancel
                </button>
              ) : (
                <button
                  onClick={() => setEditMode(!editMode)}
                  className="outline-none"
                  type="button"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </ProfilePageLayout>
  );
};
export default ProfilePage;
