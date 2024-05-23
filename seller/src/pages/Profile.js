import { useEffect, useRef, useState } from "react";
import axiosClient from "../api";
import { useAuth } from "../context/AuthContext";

const Profile = () => {
  const name = useRef(null);
  const bio = useRef(null);
  const phone = useRef(null);
  const [data, setData] = useState({});
  const {user} = useAuth();
  useEffect(() => {
    axiosClient.get(`/user/${user}`).then((res) => {
      console.log(user);
      setData(res);
    });
  }, []);

  const handleSubmit = () => {
    const payload = {
      name: name.current.value,
      bio: bio.current.value,
      phone: phone.current.value,
    };
    axiosClient.patch(`/user/${user}`, payload).then((res) => {
      console.log(res);
      setData(res);
    });
  }

  return (
    <div className="p-2 md:p-4 flex justify-center">
      <div className="w-full pb-8 mt-8 sm:max-w-xl sm:rounded-lg">
        <h2 className="text-2xl font-bold sm:text-xl">Public Profile</h2>
        <div className="grid max-w-2xl mx-auto mt-8">
          <div className="flex flex-col items-center space-y-5 sm:flex-row sm:space-y-0">
            <img
              className="object-cover w-40 h-40 rounded-full ring-2 ring-indigo-300"
              src="https://upload.wikimedia.org/wikipedia/commons/a/af/Default_avatar_profile.jpg"
              alt="Bordered avatar"
            />
            <div className="flex flex-col space-y-5 sm:ml-8">
              <button
                type="button"
                className="py-3 px-6 text-base font-medium text-indigo-100 focus:outline-none bg-indigo-800 rounded-lg border border-indigo-200 hover:bg-indigo-900 focus:z-10 focus:ring-4 focus:ring-indigo-200 "
              >
                Change picture
              </button>
              <button
                type="button"
                className="py-3 px-6 text-base font-medium text-indigo-900 focus:outline-none bg-white rounded-lg border border-indigo-200 hover:bg-indigo-100 hover:text-[#202142] focus:z-10 focus:ring-4 focus:ring-indigo-200 "
              >
                Delete picture
              </button>
            </div>
          </div>
          <div className="items-center mt-8 sm:mt-14 text-[#202142]">
            <div className="flex flex-col items-center w-full mb-2 space-x-0 space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0 sm:mb-6">
              <div className="w-full">
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-indigo-900"
                >
                  Your name
                </label>
                <input
                  type="text"
                  id="name"
                  ref={name}
                  className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2 "
                  placeholder="Your first name"
                  defaultValue={data.name || ""}
                  required={true}
                />
              </div>
            </div>
            <div className="mb-2 sm:mb-6">
              <label
                htmlFor="phone"
                className="block mb-2 text-sm font-medium text-indigo-900 "
              >
                Your phone number
              </label>
              <input
                type="phone"
                id="phone"
                ref={phone}
                className="bg-indigo-50 border border-indigo-300 text-indigo-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2 "
                placeholder="xxxxxxxxxxx"
                required={true}
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="message"
                ref={bio}
                className="block mb-2 text-sm font-medium text-indigo-900 "
              >
                Bio
              </label>
              <textarea
                id="message"
                rows={4}
                className="block p-2 w-full text-sm text-indigo-900 bg-indigo-50 rounded-lg border border-indigo-300 focus:ring-indigo-500 focus:border-indigo-500 "
                placeholder="Write your bio here..."
                defaultValue={data.bio || ""}
              />
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleSubmit}
                type="submit"
                className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
