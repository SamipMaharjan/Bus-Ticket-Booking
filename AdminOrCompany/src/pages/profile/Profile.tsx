import { baseUrl } from "@/app/api/apiSlice";
import Breadcrumb from "../../components/Breadcrumb";
import CoverOne from "@/images/icon/Bus_Yatri.webp";
import CookieHelper from "@/helpers/CookieHelper";
import toast from "react-hot-toast";
import { useGetCurrentUserQuery } from "@/app/users/usersApiSlice";
import { useContext, useEffect, useState } from "react";
import {
  Editable,
  EditableInput,
  EditablePreview,
  EditableTextarea,
} from "@chakra-ui/react";
import { GlobalContext } from "@/Context/GlobalContext";
// import userSix from "../images/user/user-06.png";
import profileImg from "../../../public/profile.png";

const Profile = () => {
  const [username, setUsername] = useState<any>();
  const { profileData } = useContext(GlobalContext);
  const { data: currentUser } = useGetCurrentUserQuery(null);
  const profileImgUrl =
    "http://localhost:5500/api" + currentUser?.profilePicture;
  // console.log("current", profileImgUrl, currentUser);

  useEffect(() => {
    console.log("current.fusernsmae", profileData);
    setUsername(profileData?.name);
  }, [profileData]);

  const handleImageChange = async (e: any) => {
    try {
      if (e.target.files) {
        const formData = new FormData();
        formData.append("image", e.target.files[0]);

        console.log("e.target.value", e.target.value);
        console.log("formdata", formData);
        const res1 = await fetch(`${baseUrl}/file`, {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${CookieHelper.getCookie("token")}`,
          },
        });
        const jsonRes1 = await res1.json();
        console.log("res2", jsonRes1);
        if (!jsonRes1.url) return toast.error("Something went wrong.");

        const payload = {
          username: currentUser?.username,
          profilePicture: jsonRes1.url,
        };

        const res2 = await fetch(`${baseUrl}/profile`, {
          method: "PATCH",
          body: JSON.stringify(payload),
          headers: {
            Authorization: `Bearer ${CookieHelper.getCookie("token")}`,
            "Content-Type": "application/json",
          },
        });
        if (res2.ok) {
          console.log("window.location", window.location);
          toast.success("Profile picture updated.");
          window.location.reload();
        } else {
          toast.success("Something went wrong.");
        }
      }
    } catch (err) {
      console.error("err", err);
    }
  };
  return (
    <>
      <Breadcrumb pageName="Profile" />
      <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
          <div className="z-30 mx-auto  h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
            <div className="relative drop-shadow-2">
              {currentUser?.profilePicture && (
                <img src={profileImg} alt="profile" />
              )}
              <label
                htmlFor="profile"
                className="absolute bottom-0 right-0 flex h-8.5 w-8.5 cursor-pointer items-center justify-center rounded-full bg-primary text-white hover:bg-opacity-90 sm:bottom-2 sm:right-2"
              >
                <svg
                  className="fill-current"
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M4.76464 1.42638C4.87283 1.2641 5.05496 1.16663 5.25 1.16663H8.75C8.94504 1.16663 9.12717 1.2641 9.23536 1.42638L10.2289 2.91663H12.25C12.7141 2.91663 13.1592 3.101 13.4874 3.42919C13.8156 3.75738 14 4.2025 14 4.66663V11.0833C14 11.5474 13.8156 11.9925 13.4874 12.3207C13.1592 12.6489 12.7141 12.8333 12.25 12.8333H1.75C1.28587 12.8333 0.840752 12.6489 0.512563 12.3207C0.184375 11.9925 0 11.5474 0 11.0833V4.66663C0 4.2025 0.184374 3.75738 0.512563 3.42919C0.840752 3.101 1.28587 2.91663 1.75 2.91663H3.77114L4.76464 1.42638ZM5.56219 2.33329L4.5687 3.82353C4.46051 3.98582 4.27837 4.08329 4.08333 4.08329H1.75C1.59529 4.08329 1.44692 4.14475 1.33752 4.25415C1.22812 4.36354 1.16667 4.51192 1.16667 4.66663V11.0833C1.16667 11.238 1.22812 11.3864 1.33752 11.4958C1.44692 11.6052 1.59529 11.6666 1.75 11.6666H12.25C12.4047 11.6666 12.5531 11.6052 12.6625 11.4958C12.7719 11.3864 12.8333 11.238 12.8333 11.0833V4.66663C12.8333 4.51192 12.7719 4.36354 12.6625 4.25415C12.5531 4.14475 12.4047 4.08329 12.25 4.08329H9.91667C9.72163 4.08329 9.53949 3.98582 9.4313 3.82353L8.43781 2.33329H5.56219Z"
                    fill=""
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.00004 5.83329C6.03354 5.83329 5.25004 6.61679 5.25004 7.58329C5.25004 8.54979 6.03354 9.33329 7.00004 9.33329C7.96654 9.33329 8.75004 8.54979 8.75004 7.58329C8.75004 6.61679 7.96654 5.83329 7.00004 5.83329ZM4.08337 7.58329C4.08337 5.97246 5.38921 4.66663 7.00004 4.66663C8.61087 4.66663 9.91671 5.97246 9.91671 7.58329C9.91671 9.19412 8.61087 10.5 7.00004 10.5C5.38921 10.5 4.08337 9.19412 4.08337 7.58329Z"
                    fill=""
                  />
                </svg>
                <input
                  type="file"
                  name="profile"
                  id="profile"
                  className="sr-only"
                  onChange={handleImageChange}
                />
              </label>
            </div>
          </div>
          <div className="mt-4">
            {/* {username?.username && ( */}
            <Editable
              className="mb-1.5 text-2xl font-semibold text-black dark:text-white"
              // defaultValue={"sadf"}
              width={"fit-content"}
              marginX={"auto"}
              submitOnBlur={true}
              onSubmit={async (value) => {
                const payload = {
                  name: value,
                  // profilePicture: currentUser?.profilePicture,
                };
                console.log("payload", payload);
                const res2 = await fetch(
                  `${baseUrl}/company/${profileData._id}`,
                  {
                    method: "PUT",
                    body: JSON.stringify(payload),
                    headers: {
                      Authorization: `Bearer ${CookieHelper.getCookie("token")}`,
                      "Content-Type": "application/json",
                    },
                  }
                );
                if (res2.ok) {
                  const json = await res2.json();
                  console.log("window.location", window.location);
                  toast.success(
                    "Username updated to " + json?.updateduser?.username
                  );
                } else {
                  toast.success("Something went wrong.");
                }
              }}
              value={username || "username unavailable"}
              onChange={(e) => setUsername(e)}
            >
              <EditablePreview />
              <EditableInput />
            </Editable>
            {/* )} */}
            <p className="font-medium">
              {profileData?.email || "N/A@gmail.com"}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
